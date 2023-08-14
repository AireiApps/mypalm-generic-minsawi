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
import { ImageUploadService } from "src/app/services/imageupload-service/imageupload";
import { RampserviceService } from "src/app/services/ramp-service/rampservice.service";

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

import { GradingVehicleSearchPage } from "src/app/grading-module/grading-vehicle-search/grading-vehicle-search.page";
import { PressingsterilizerstationImageSliderPage } from "src/app/supervisor-module/pressingsterilizerstation-image-slider/pressingsterilizerstation-image-slider.page";

@Component({
  selector: "app-ramp-home",
  templateUrl: "./ramp-home.page.html",
  styleUrls: ["./ramp-home.page.scss"],
})
export class RampHomePage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  rampForm;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  count = 0;

  // Variables
  params;
  selectvehicleFlag = true;
  entervehicleFlag = false;
  confirmDisable = false;
  pleasewaitflag = false;

  vehicleid = 0;
  vehiclenumber = "";

  imagePaths = {
    despatchimage_path: "",
  };

  despatchimageFlag = 0;
  despatchimagesArr = [];
  imagetype = "";
  imageview = "";

  destinationArr = [];
  destinationid = "";
  destinationvalue = "";
  destinationlatitude = "";
  destinationlongitude = "";

  defaultdestination = "";

  latitude = 4.2105;
  longitude = 101.9758;

  gradinglistArr = [];

  public destinationOptions: any = {
    header: this.translate.instant("RAMPHOME.destination"),
    cssClass: "singleselect",
  };

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
    private rampservice: RampserviceService,
    public vehiclemodalController: ModalController,
    public viewimagemodalController: ModalController,
    private screenOrientation: ScreenOrientation,
    private imgUpload: ImageUploadService
  ) {
    this.rampForm = this.fb.group({
      txt_searchvehicle: new FormControl(""),
      txt_vehiclenumber: new FormControl(""),
      txt_netweight: new FormControl("", Validators.required),
      select_destination: new FormControl("", Validators.required),
    });

    this.activatedroute.params.subscribe((val) => {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      );
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

    this.rampForm.reset();

    this.imagePaths.despatchimage_path = "";
    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;

    this.getDestination();

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

  slideOpts = {
    centeredSlides: true,
    autoplay: {
      disableOnInteraction: true,
    },
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  getDestination() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.rampservice.getDestinationList(req).then((result) => {
      let resultdata: any;
      resultdata = result;

      this.despatchimageFlag = Number(resultdata.despatchimageflag);

      if (resultdata.httpcode == 200) {
        this.destinationArr = resultdata.data;

        if (this.destinationArr.length > 0) {
          for (let i = 0; i < this.destinationArr.length; i++) {
            this.defaultdestination =
              this.destinationArr[0].id +
              "~" +
              this.destinationArr[0].destination +
              "~" +
              this.destinationArr[0].destinationlatitude +
              "~" +
              this.destinationArr[0].destinationlongitude;

            break;
          }
        }
      } else {
        this.destinationArr = [];
      }
    });
  }

  imageUpload(type) {
    this.imgUpload.ImageUploadCommon(type).then(
      (result) => {
        var resultdata: any;
        resultdata = result;

        resultdata = JSON.parse(resultdata.response);

        if (resultdata.httpcode == 200) {
          if (type == "Despatch") {
            this.imagePaths.despatchimage_path = resultdata.data.uploaded_path;

            //this.despatchimagesArr.push(this.imagePaths.despatchimage_path);
          }
          //this.commonservice.presentToast(type + " Image Added Successfully!");
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imageaddedfailed"
              )
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );

    /*var dummyimagepath =
      "http://demo.mypalm.com.my/java/generic_upload/1014-generic1333-1679038204465.jpg";

    if (type == "Despatch") {
      this.imagePaths.despatchimage_path = dummyimagepath;

      this.despatchimagesArr.push(this.imagePaths.despatchimage_path);

      console.log(this.despatchimagesArr);
    }*/
  }

  btn_view(type) {
    this.imagetype = type;

    if (this.imagetype == "Despatch") {
      if (this.despatchimagesArr.length > 0) {
        this.imagetype = "Despatch Image";

        this.imageview = "";

        this.imageview = this.despatchimagesArr.join("~");

        this.ViewImages(this.imageview);
      } else {
        if (this.despatchimagesArr.length > 1) {
          this.commonservice.presentToast(
            "Despatch" +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagesnotfound"
              )
          );
        } else {
          this.commonservice.presentToast(
            "Despatch" +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagenotfound"
              )
          );
        }
      }
    }
  }

  destinationhandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      var splitdata = value.split("~");

      /*var params = JSON.parse(value);*/
      this.destinationid = splitdata[0];
      this.destinationvalue = splitdata[1];
      this.destinationlatitude = splitdata[2];
      this.destinationlongitude = splitdata[3];
    } else {
      this.destinationid = "";
      this.destinationvalue = "";
      this.destinationlatitude = "";
      this.destinationlongitude = "";
    }
  }

  async detailsconfirmationalert() {
    if (this.rampForm.valid) {
      var get_vehicleid;
      var get_vehiclenumber;
      var get_netweight;

      if (this.vehicleid != 0) {
        if (this.vehiclenumber != "") {
          get_vehicleid = this.vehicleid;
          get_vehiclenumber = this.vehiclenumber;
        } else {
          this.commonservice.presentToast(
            this.translate.instant("RAMPHOME.vehiclenumbermandatory")
          );
          return;
        }
      } else {
        if (
          this.rampForm.value.txt_vehiclenumber != 0 &&
          typeof this.rampForm.value.txt_vehiclenumber !== "undefined" &&
          this.rampForm.value.txt_vehiclenumber !== null
        ) {
          get_vehicleid = this.vehicleid;
          get_vehiclenumber = this.rampForm.value.txt_vehiclenumber;
        } else {
          this.commonservice.presentToast(
            this.translate.instant("RAMPHOME.vehiclenumbermandatory")
          );
          return;
        }
      }

      if (this.rampForm.value.txt_netweight == "") {
        this.commonservice.presentToast(
          this.translate.instant("RAMPHOME.netweightmandatory")
        );
        return;
      }

      if (this.rampForm.value.select_destination == "") {
        this.commonservice.presentToast(
          this.translate.instant("RAMPHOME.destinationmandatory")
        );
        return;
      }

      if (
        this.rampForm.value.txt_netweight != "" &&
        typeof this.rampForm.value.txt_netweight !== "undefined" &&
        this.rampForm.value.txt_netweight !== null
      ) {
        get_netweight = Number(this.rampForm.value.txt_netweight).toFixed(2);
      } else {
        get_netweight = "0";
      }

      let alertmessage =
        this.translate.instant("RAMPHOME.vehiclenumber") +
        ": <b>" +
        get_vehiclenumber +
        "</b><br>" +
        this.translate.instant("RAMPHOME.netweight") +
        " (MT): <b>" +
        get_netweight +
        "</b>";

      const alert = await this.alertController.create({
        mode: "md",
        header: this.translate.instant("SUPERVISORDASHBOARD.header"),
        message: alertmessage,
        cssClass: "customalertmessagetwobuttons",
        buttons: [
          {
            text: "",
            handler: () => {
              //console.log("Confirm Cancel");
            },
          },
          {
            text: "",
            handler: () => {
              this.btn_save();
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.commonservice.presentToast(
        this.translate.instant("GENERALBUTTON.pleasefilltheform")
      );
    }
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
    if (this.rampForm.valid) {
      var get_vehicleid;
      var get_vehiclenumber;

      if (this.vehicleid != 0) {
        if (this.vehiclenumber != "") {
          get_vehicleid = this.vehicleid;
          get_vehiclenumber = this.vehiclenumber;
        } else {
          this.commonservice.presentToast(
            this.translate.instant("RAMPHOME.vehiclenumbermandatory")
          );
          return;
        }
      } else {
        if (
          this.rampForm.value.txt_vehiclenumber != 0 &&
          typeof this.rampForm.value.txt_vehiclenumber !== "undefined" &&
          this.rampForm.value.txt_vehiclenumber !== null
        ) {
          get_vehicleid = this.vehicleid;
          get_vehiclenumber = this.rampForm.value.txt_vehiclenumber;
        } else {
          this.commonservice.presentToast(
            this.translate.instant("RAMPHOME.vehiclenumbermandatory")
          );
          return;
        }
      }

      if (this.rampForm.value.txt_netweight == "") {
        this.commonservice.presentToast(
          this.translate.instant("RAMPHOME.netweightmandatory")
        );
        return;
      }

      if (this.rampForm.value.select_destination == "") {
        this.commonservice.presentToast(
          this.translate.instant("RAMPHOME.destinationmandatory")
        );
        return;
      }

      if (this.latitude == 0.0 || this.longitude == 0.0) {
        this.commonservice.presentToast("Not a Valid GeoPoints");
        return;
      }

      this.confirmDisable = true;

      if (this.despatchimageFlag == 0) {
        this.imagePaths.despatchimage_path = "";
      }

      var req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        dept_id: this.userlist.dept_id,
        design_id: this.userlist.desigId,
        acc_id: this.userlist.accId,
        dealer_id: this.userlist.dealer_id,
        supplier_acc_id: this.userlist.supplier_acc_id,
        vehicle_id: get_vehicleid,
        vehicle_no: get_vehiclenumber,
        latitude: this.latitude,
        longitude: this.longitude,
        net_weight: this.rampForm.value.txt_netweight,
        destination_id: this.destinationid,
        dispatchimage: this.imagePaths.despatchimage_path,
      };

      console.log("Test", req);

      this.rampservice.saveRamp(req).then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          this.confirmDisable = false;

          this.rampForm.reset();

          this.imagePaths.despatchimage_path = "";

          this.commonservice.presentToast(
            this.translate.instant("RAMPHOME.rampdatasavedsuccessfully")
          );
        } else {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("RAMPHOME.rampdatasavedfailed")
          );
        }
      });
    } else {
      this.commonservice.presentToast(
        this.translate.instant("GENERALBUTTON.pleasefilltheform")
      );
    }
  }

  backtoselect() {
    this.rampForm.controls.txt_searchvehicle.setValue("");
    this.rampForm.controls.txt_vehiclenumber.setValue("");

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  async callmodalcontroller(type) {
    if (type == "Vehicle") {
      const vehiclemodal = await this.vehiclemodalController.create({
        component: GradingVehicleSearchPage,
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["vehicle-modal"],
      });

      vehiclemodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        //console.log("GetData --->" + viewform);

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          //console.log(this.params.id);

          if (this.params.id != 0) {
            this.vehicleid = this.params.id;
            this.vehiclenumber = this.params.vehicle_no;

            //console.log(this.vehiclenumber);

            this.rampForm.controls.txt_searchvehicle.setValue(
              this.vehiclenumber
            );
            this.rampForm.controls.txt_vehiclenumber.setValue("");
          } else {
            this.vehicleid = this.params.id;
            this.vehiclenumber = this.params.vehicle_no;

            //console.log(modeldata.data.searchtext);

            this.rampForm.controls.txt_searchvehicle.setValue("");

            if (modeldata.data.searchtext != "") {
              this.rampForm.controls.txt_vehiclenumber.setValue(
                modeldata.data.searchtext
              );
            }

            this.selectvehicleFlag = false;
            this.entervehicleFlag = true;
          }
        } else {
          this.vehicleid = 0;
          this.vehiclenumber = "";

          this.rampForm.controls.txt_searchvehicle.setValue("");
          this.rampForm.controls.txt_vehiclenumber.setValue("");
        }
      });

      return await vehiclemodal.present();
    }
  }

  async ViewImages(despatchimages) {
    if (despatchimages != "") {
      const viewimagemodal = await this.viewimagemodalController.create({
        component: PressingsterilizerstationImageSliderPage,
        componentProps: {
          from: "Ramp",
          rampitem: despatchimages,
        },
      });

      viewimagemodal.onDidDismiss().then((data) => {});

      return await viewimagemodal.present();
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }

  alphanumberFilter(event: any) {
    const reg = /^[a-zA-Z0-9\s]{0,15}$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
