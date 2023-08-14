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
import { GradingserviceService } from "src/app/services/grading-service/gradingservice.service";

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

import { GradingVehicleSearchPage } from "src/app/grading-module/grading-vehicle-search/grading-vehicle-search.page";
import { PressingsterilizerstationImageSliderPage } from "src/app/supervisor-module/pressingsterilizerstation-image-slider/pressingsterilizerstation-image-slider.page";
import { GradingUpdateScreenPage } from "../grading-update-screen/grading-update-screen.page";
import { GradingVehicleSearchNewPage } from "../grading-vehicle-search-new/grading-vehicle-search-new.page";

@Component({
  selector: "app-grading-homescreen2",
  templateUrl: "./grading-homescreen2.page.html",
  styleUrls: ["./grading-homescreen2.page.scss"],
})
export class GradingHomescreen2Page implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  gradingForm;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  count = 0;

  // Variables
  params;
  receivenewloadFlag = false;
  selectvehicleFlag = true;
  entervehicleFlag = false;
  confirmDisable = false;
  pleasewaitflag = false;
  uinorecordFlag = false;
  previousstatusofnorecordflag: boolean;
  norecordFlag = false;

  vehicleid = 0;
  vehiclenumber = "";
  receivenewloadclick = 0;

  gradinglistArr = [];
  newsize;
  newtotalpage;

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
    private gradingservice: GradingserviceService,
    public vehiclemodalController: ModalController,
    public viewimagemodalController: ModalController,
    private screenOrientation: ScreenOrientation,
    private imgUpload: ImageUploadService,
    public modalController: ModalController
  ) {
    this.gradingForm = this.fb.group({
      txt_searchvehicle: new FormControl(""),
      txt_vehiclenumber: new FormControl(""),
      txt_overdue: new FormControl("", Validators.required),
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

    this.getGrading(true, "0");
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

  newpagination(event) {
    setTimeout(() => {
      if (this.gradinglistArr.length == this.newtotalpage) {
        event.target.complete();
        return;
      }
      event.target.complete();
      var z = Math.ceil(this.gradinglistArr.length / this.newsize);
      if (this.gradinglistArr.length < this.newtotalpage) {
        this.getGrading(false, String(z));
      }
    }, 500);
  }

  getGrading(pagerefresh: Boolean, pagenum: string) {
    if (this.receivenewloadclick == 1) {
      this.receivenewloadclick = 0;
      this.receivenewloadFlag = false;
      this.gradingForm.reset();
      this.cleardata();
    }

    this.pleasewaitflag = true;
    this.pleasewaitflag = true;
    if (pagerefresh == true) {
      this.gradinglistArr = [];
    } else {
    }

    const req = {
      millcode: this.userlist.millcode,
      department_id: this.userlist.dept_id,
      page: parseInt(pagenum) + 1,
    };

    this.gradingservice.getGradingListNew(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.newsize = parseInt(resultdata.size);

        this.newtotalpage = resultdata.total_page * this.newsize;

        console.log("Store Data:", resultdata);

        if (resultdata.httpcode == 200) {
          //this.recentStore = resultdata.data
          if (resultdata.data.length > 0) {
            for (var i = 0; i < resultdata.data.length; i++) {
              this.gradinglistArr.push(resultdata.data[i]);
            }
            this.norecordFlag = false;
          }
          this.pleasewaitflag = false;
        } else {
          this.norecordFlag = true;
          this.pleasewaitflag = false;
        }
        this.gradinglistArr = resultdata.data;
        this.uinorecordFlag = true;
        this.norecordFlag = false;
        this.previousstatusofnorecordflag = this.norecordFlag;
        this.pleasewaitflag = false;
      } else {
        this.gradinglistArr = [];
        this.uinorecordFlag = true;
        this.norecordFlag = true;
        this.previousstatusofnorecordflag = this.norecordFlag;
        this.pleasewaitflag = false;
      }
    });
  }

  btn_receivenewload() {
    this.gradingForm.reset();
    this.cleardata();

    if (this.receivenewloadclick == 0) {
      this.receivenewloadclick = 1;
      this.receivenewloadFlag = true;

      if (this.norecordFlag) {
        this.uinorecordFlag = false;
        this.norecordFlag = false;
      }
    } else {
      this.receivenewloadclick = 0;
      this.receivenewloadFlag = false;

      if (this.previousstatusofnorecordflag) {
        this.uinorecordFlag = true;
        this.norecordFlag = true;
      }
    }

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  btn_save() {
    if (this.gradingForm.valid) {
      var get_vehiclenumber = "";

      if (this.vehicleid != 0) {
        if (this.vehiclenumber != "") {
          get_vehiclenumber = this.vehiclenumber;

          //console.log(this.vehiclenumber + "\n" + this.vehicleid);
        } else {
          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.vehiclenumbermandatory")
          );
          return;
        }
      } else {
        if (
          this.gradingForm.value.txt_vehiclenumber != 0 &&
          typeof this.gradingForm.value.txt_vehiclenumber !== "undefined" &&
          this.gradingForm.value.txt_vehiclenumber !== null
        ) {
          get_vehiclenumber = this.gradingForm.value.txt_vehiclenumber;
        } else {
          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.vehiclenumbermandatory")
          );
          return;
        }
      }

      if (this.gradingForm.value.txt_overdue > 100) {
        this.commonservice.presentToast(
          this.translate.instant("GRADINGHOME.percentagevalidation")
        );
        return;
      }

      this.confirmDisable = true;

      var req = {
        user_id: this.userlist.userId,
        millcode: this.userlist.millcode,
        vehicle: get_vehiclenumber,
        overdue: this.gradingForm.value.txt_overdue,
      };

      console.log(req);

      this.gradingservice.saveGradingNew(req).then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          this.confirmDisable = false;

          this.cleardata();

          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.receivedloadsuccessfully")
          );

          if (this.receivenewloadclick == 0) {
            this.receivenewloadclick = 1;
          } else {
            this.receivenewloadclick = 0;
          }

          this.receivenewloadFlag = false;

          this.getGrading(true, "0");
        } else {
          this.confirmDisable = false;

          this.cleardata();

          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.receivedloadfailed")
          );
        }
      });
    } else {
      this.commonservice.presentToast(
        this.translate.instant("GENERALBUTTON.pleasefilltheform")
      );
    }
  }

  checkData() {
    if (
      this.gradingForm.value.txt_overdue != "" &&
      typeof this.gradingForm.value.txt_overdue !== "undefined" &&
      this.gradingForm.value.txt_overdue !== null
    ) {
      if (Number.isInteger(this.gradingForm.value.txt_overdue)) {
        this.gradingForm.controls.txt_overdue.setValue(
          Number(this.gradingForm.value.txt_overdue).toFixed(1)
        );
      }
    }
  }

  btn_Action(item) {
    this.router.navigate([item.path]);
  }

  backtoselect() {
    this.gradingForm.controls.txt_searchvehicle.setValue("");
    this.gradingForm.controls.txt_vehiclenumber.setValue("");

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  async callmodalcontroller(type) {
    if (type == "Vehicle") {
      const vehiclemodal = await this.vehiclemodalController.create({
        component: GradingVehicleSearchNewPage,
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["vehicle-modal"],
      });

      vehiclemodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        //console.log("GetData --->" + viewform);

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          console.log(this.params.TICKET);

          if (this.params.TICKET != 0) {
            this.vehicleid = this.params.TICKET;
            this.vehiclenumber = this.params.vehicle_no;

            //console.log(this.vehiclenumber);

            this.gradingForm.controls.txt_searchvehicle.setValue(
              this.vehiclenumber
            );
            this.gradingForm.controls.txt_vehiclenumber.setValue("");
          } else {
            this.vehicleid = this.params.TICKET;
            this.vehiclenumber = this.params.vehicle_no;

            //console.log(modeldata.data.searchtext);

            this.gradingForm.controls.txt_searchvehicle.setValue("");

            if (modeldata.data.searchtext != "") {
              this.gradingForm.controls.txt_vehiclenumber.setValue(
                modeldata.data.searchtext
              );
            }

            this.selectvehicleFlag = false;
            this.entervehicleFlag = true;
          }
        } else {
          this.vehicleid = 0;
          this.vehiclenumber = "";

          this.gradingForm.controls.txt_searchvehicle.setValue("");
          this.gradingForm.controls.txt_vehiclenumber.setValue("");
        }
      });

      return await vehiclemodal.present();
    }
  }

  async ViewImages(hardbunchesimages) {
    if (hardbunchesimages != "") {
      const viewimagemodal = await this.viewimagemodalController.create({
        component: PressingsterilizerstationImageSliderPage,
        componentProps: {
          from: "Grading",
          gradingitem: hardbunchesimages,
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
    const reg = /^-?\d*(\.\d{0,1})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  cleardata() {
    this.vehicleid = 0;
    this.vehiclenumber = "";

    this.gradingForm.controls.txt_searchvehicle.setValue("");
    this.gradingForm.controls.txt_vehiclenumber.setValue("");
  }
  async btn_updateAction(value) {
    const modal = await this.modalController.create({
      component: GradingUpdateScreenPage,
      componentProps: {
        item: value,
      },
    });
    modal.onDidDismiss().then((modeldata) => {
      this.getGrading(true, "0");
    });
    return await modal.present();
  }
}
