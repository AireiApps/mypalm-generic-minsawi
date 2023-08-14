import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";
import {
  AlertController,
  Platform,
  Animation,
  AnimationController,
  ModalController,
  IonSlides,
} from "@ionic/angular";

import { DriverServiceService } from "src/app/services/driver-service/driver-service.service";

import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;
const { Geolocation } = Plugins;

import { DriverVehicleSearchPage } from "src/app/driver-module/driver-vehicle-search/driver-vehicle-search.page";
import { DriverSupplierSearchPage } from "src/app/driver-module/driver-supplier-search/driver-supplier-search.page";

@Component({
  selector: "app-driver-home",
  templateUrl: "./driver-home.page.html",
  styleUrls: ["./driver-home.page.scss"],
})
export class DriverHomePage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  driverForm;

  count = 0;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  // Variables
  params;
  confirmDisable = false;
  pleasewaitflag = false;

  selectvehicleFlag = true;
  entervehicleFlag = false;

  vehicleid = 0;
  vehiclenumber = "";

  supplierid = 0;
  suppliername = "";

  newloadclick = 0;

  latitude = 4.2105;
  longitude = 101.9758;

  loadlistArr = [];
  drivertrackinglistArr = [];

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private alertController: AlertController,
    private zone: NgZone,
    private notifi: AuthGuardService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private platform: Platform,
    private appVersion: AppVersion,
    private market: Market,
    private animationCtrl: AnimationController,
    private driverservice: DriverServiceService,
    public vehiclemodalController: ModalController,
    public suppliermodalController: ModalController
  ) {
    this.driverForm = this.fb.group({
      txt_searchsupplier: new FormControl(""),
      txt_searchvehicle: new FormControl(""),
      txt_vehiclenumber: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(this.myElementRef.nativeElement)
      .duration(1000)
      .fromTo("opacity", "0", "1");

    animation.play();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.forceUpdated();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.forceUpdated();

    this.getRecentTracking();

    this.getCurrentPosition();
  }

  forceUpdated() {
    var app_version;

    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        app_version = versionNumber;

        console.log(app_version);

        let req = {
          user_id: this.userlist.userId,
          millcode: this.userlist.millcode,
          dept_id: this.userlist.dept_id,
          language: this.languageService.selected,
        };

        this.commonservice.getSettings(req).then((result) => {
          var resultdata: any;
          resultdata = result;
          let updateVersion = resultdata.appVersion;
          let logout = resultdata.islogOut;

          if (typeof logout !== "undefined" && logout !== null) {
            if (logout == 1) {
              this.notifi.logoutupdateNotification();
              localStorage.clear();
              this.router.navigate(["/login"], { replaceUrl: true });
            } else {
              if (updateVersion > app_version) {
                this.alertForce(updateVersion);
              }
            }
          } else {
            if (updateVersion > app_version) {
              this.alertForce(updateVersion);
            }
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async alertForce(app_version) {
    let alert = await this.alertController.create({
      header: this.translate.instant("FORCEUPDATE.header"),
      backdropDismiss: false,
      message: this.translate.instant("FORCEUPDATE.message") + app_version,
      buttons: [
        {
          text: this.translate.instant("FORCEUPDATE.button"),
          handler: () => {
            let appId;

            if (this.platform.is("android")) {
              appId = "com.airei.milltracking.mypalm.mikk";
            } else {
              appId = "id1573914314";
            }

            this.market
              .open(appId)
              .then((response) => {
                /*this.notifi.logoutupdateNotification();
                localStorage.clear();
                this.router.navigate(["/login"], { replaceUrl: true });*/
              })
              .catch((error) => {
                console.warn(error);
              });
          },
        },
      ],
    });
    alert.present();
  }

  updateNotification() {
    this.zone.run(() => {
      this.count = parseInt(localStorage.getItem("badge_count"));
    });
  }

  getLiveNotification() {
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {
        this.updateNotification();
      }
    );
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);
  }

  getRecentTracking() {
    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
    };

    this.driverservice.getDriversRecentTrackingList(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.drivertrackinglistArr = resultdata.data;

        if (this.drivertrackinglistArr.length > 0) {
          this.router.navigate([
            "/googlemap",
            { item: JSON.stringify(this.drivertrackinglistArr[0]) },
          ]);
        }
      } else {
        this.drivertrackinglistArr = [];
        //  this.commonservice.presentToast('No Record Found!')
      }
    });
  }

  async getCurrentPosition() {
    await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    }).then((coordinates) => {
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    });
  }

  btn_save() {
    var get_supplierid;
    var get_suppliername;
    var get_vehicleid;
    var get_vehiclenumber;

    if (this.supplierid != 0) {
      if (this.suppliername != "") {
        get_supplierid = this.supplierid;
        get_suppliername = this.suppliername;
      }
    } else {
      this.commonservice.presentToast(
        this.translate.instant("DRIVERHOME.suppliermandatory")
      );
      return;
    }

    if (this.vehicleid != 0) {
      if (this.vehiclenumber != "") {
        get_vehicleid = this.vehicleid;
        get_vehiclenumber = this.vehiclenumber;
      } else {
        this.commonservice.presentToast(
          this.translate.instant("DRIVERHOME.vehiclenumbermandatory")
        );
        return;
      }
    } else {
      if (
        this.driverForm.value.txt_vehiclenumber != 0 &&
        typeof this.driverForm.value.txt_vehiclenumber !== "undefined" &&
        this.driverForm.value.txt_vehiclenumber !== null
      ) {
        get_vehiclenumber = this.driverForm.value.txt_vehiclenumber;
      } else {
        this.commonservice.presentToast(
          this.translate.instant("DRIVERHOME.vehiclenumbermandatory")
        );
        return;
      }
    }

    if (this.latitude == 0.0 || this.longitude == 0.0) {
      this.commonservice.presentToast("Not a Valid GeoPoints");
      return;
    }

    this.confirmDisable = true;

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      id: 0,
      acc_id: get_supplierid,
      vehicle_id: get_vehicleid,
      vehicle_no: get_vehiclenumber,
      latitude: this.latitude,
      longitude: this.longitude,
      language: this.languageService.selected,
    };

    this.driverservice.saveNewLoad(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.confirmDisable = false;

        this.cleardata();

        this.commonservice.presentToast(
          this.translate.instant("DRIVERHOME.newloadsuccessfully")
        );

        this.drivertrackinglistArr = resultdata.data;

        if (this.drivertrackinglistArr.length > 0) {
          this.router.navigate([
            "/googlemap",
            { item: JSON.stringify(this.drivertrackinglistArr[0]) },
          ]);
        }
      } else {
        this.confirmDisable = false;

        this.cleardata();

        this.commonservice.presentToast(
          this.translate.instant("DRIVERHOME.newloadfailed")
        );
      }
    });
  }

  async callmodalcontroller(type) {
    if (type == "Vehicle") {
      const vehiclemodal = await this.vehiclemodalController.create({
        component: DriverVehicleSearchPage,
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["vehicle-modal"],
      });

      vehiclemodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          if (this.params.id != 0) {
            this.vehicleid = this.params.id;
            this.vehiclenumber = this.params.vehicle_no;

            this.driverForm.controls.txt_searchvehicle.setValue(
              this.vehiclenumber
            );
            this.driverForm.controls.txt_vehiclenumber.setValue("");
          } else {
            this.vehicleid = this.params.id;
            this.vehiclenumber = this.params.vehicle_no;

            this.driverForm.controls.txt_searchvehicle.setValue("");

            if (modeldata.data.searchtext != "") {
              this.driverForm.controls.txt_vehiclenumber.setValue(
                modeldata.data.searchtext
              );
            }

            this.selectvehicleFlag = false;
            this.entervehicleFlag = true;
          }
        } else {
          this.vehicleid = 0;
          this.vehiclenumber = "";

          this.driverForm.controls.txt_searchvehicle.setValue("");
          this.driverForm.controls.txt_vehiclenumber.setValue("");
        }
      });

      return await vehiclemodal.present();
    } else if (type == "Supplier") {
      const suppliermodal = await this.suppliermodalController.create({
        component: DriverSupplierSearchPage,
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["vehicle-modal"],
      });

      suppliermodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          if (this.params.acc_id != 0) {
            this.supplierid = this.params.acc_id;
            this.suppliername = this.params.suppler_name;

            this.driverForm.controls.txt_searchsupplier.setValue(
              this.suppliername
            );
          }
        } else {
          this.supplierid = 0;
          this.suppliername = "";

          this.driverForm.controls.txt_searchsupplier.setValue("");
        }
      });

      return await suppliermodal.present();
    }
  }

  backtoselect() {
    this.driverForm.controls.txt_searchvehicle.setValue("");
    this.driverForm.controls.txt_vehiclenumber.setValue("");

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  cleardata() {
    this.supplierid = 0;
    this.suppliername = "";

    this.vehicleid = 0;
    this.vehiclenumber = "";

    this.driverForm.controls.txt_searchsupplier.setValue("");

    this.driverForm.controls.txt_searchvehicle.setValue("");
    this.driverForm.controls.txt_vehiclenumber.setValue("");
  }

  alphanumberFilter(event: any) {
    const reg = /^[a-zA-Z0-9\s]{0,15}$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
