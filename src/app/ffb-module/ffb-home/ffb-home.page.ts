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

import { FfbServiceService } from "src/app/services/ffb-service/ffb-service.service";
@Component({
  selector: "app-ffb-home",
  templateUrl: "./ffb-home.page.html",
  styleUrls: ["./ffb-home.page.scss"],
})
export class FfbHomePage implements OnInit {
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
  uinorecordFlag = true;
  norecordFlag = false;

  receivenewloadclick = 0;

  ffbrampsize;
  ffbramptotalpage;

  ffbramplistArr = [
    /*{
      rampcode: "Code1",
      rampname: "Ramp1",
      dateandtime: "02-08-2023 14:12",
    },
    {
      rampcode: "Code2",
      rampname: "Ramp2",
      dateandtime: "02-08-2023 14:12",
    },
    {
      rampcode: "Code3",
      rampname: "Ramp3",
      dateandtime: "02-08-2023 14:12",
    },
    {
      rampcode: "Code4",
      rampname: "Ramp4",
      dateandtime: "02-08-2023 14:12",
    },*/
  ];

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
    private screenOrientation: ScreenOrientation,
    private services: FfbServiceService
  ) {
    this.gradingForm = this.fb.group({
      txt_rampname: new FormControl("", Validators.required),
      txt_rampcode: new FormControl("", Validators.required),
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

    this.getFFBrampdetails(true, "0");
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

  getFFBrampdetails(pagerefresh: Boolean, pagenum: string) {
    if (this.receivenewloadclick == 1) {
      this.receivenewloadclick = 0;
      this.receivenewloadFlag = false;
      this.gradingForm.reset();
    }

    this.norecordFlag = false;
    this.pleasewaitflag = true;

    if (pagerefresh == true) {
      this.ffbramplistArr = [];
    } else {
    }

    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      acc_id: this.userlist.accId,
      page: parseInt(pagenum) + 1,
      language: this.languageService.selected,
    };

    this.services.getFFBRampList(req).then((result) => {
      let resultdata: any;
      resultdata = result;

      this.ffbrampsize = parseInt(resultdata.size);
      this.ffbramptotalpage = resultdata.total_page * this.ffbrampsize;

      if (resultdata.httpcode == 200) {
        if (resultdata.rampData.length > 0) {
          for (var i = 0; i < resultdata.rampData.length; i++) {
            this.ffbramplistArr.push(resultdata.rampData[i]);
          }
          this.uinorecordFlag = true;
          this.norecordFlag = false;
        } else {
          this.uinorecordFlag = true;
          this.norecordFlag = true;
        }

        this.pleasewaitflag = false;
      } else {
        this.uinorecordFlag = true;

        if (this.ffbramplistArr.length > 0) {
          this.norecordFlag = false;
        } else {
          this.norecordFlag = true;
        }

        this.pleasewaitflag = false;
      }
    });
  }

  btn_newramp() {
    this.gradingForm.reset();

    if (this.receivenewloadclick == 0) {
      this.receivenewloadclick = 1;
      this.receivenewloadFlag = true;

      if (this.ffbramplistArr.length <= 0) {
        this.uinorecordFlag = false;
        this.norecordFlag = false;
      }
    } else {
      this.receivenewloadclick = 0;
      this.receivenewloadFlag = false;

      if (this.ffbramplistArr.length <= 0) {
        this.uinorecordFlag = true;
        this.norecordFlag = true;
      }
    }

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  btn_save() {
    if (this.gradingForm.valid) {
      if (this.gradingForm.value.txt_rampname == "") {
        this.commonservice.presentToast(
          this.translate.instant("FFBSUPPLIERHOME.rampnamemandatory")
        );
        return;
      }

      if (this.gradingForm.value.txt_rampcode == "") {
        this.commonservice.presentToast(
          this.translate.instant("FFBSUPPLIERHOME.rampcodemandatory")
        );
        return;
      }

      this.confirmDisable = true;

      var getrampname = this.gradingForm.value.txt_rampname;
      var getrampcode = this.gradingForm.value.txt_rampcode;

      var req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        dept_id: this.userlist.dept_id,
        design_id: this.userlist.desigId,
        acc_id: this.userlist.accId,
        dealer_id: this.userlist.dealer_id,
        rampname: getrampname,
        rampcode: getrampcode,
      };

      console.log(req);

      this.services.saveFFBRamp(req).then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("FFBSUPPLIERHOME.rampsavedsuccessfully")
          );
          if (this.receivenewloadclick == 0) {
            this.receivenewloadclick = 1;
          } else {
            this.receivenewloadclick = 0;
          }

          this.receivenewloadFlag = false;

          this.getFFBrampdetails(true, "0");

          if (
            resultdata.data[0].username != "" &&
            resultdata.data[0].password != ""
          ) {
            this.credentialalert(
              resultdata.data[0].username,
              resultdata.data[0].password
            );
          }
        } else if (resultdata.httpcode == 401) {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            getrampname +
              " / " +
              getrampcode +
              this.translate.instant("FFBSUPPLIERHOME.alreadyexist")
          );
        } else {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("FFBSUPPLIERHOME.rampsavedfailed")
          );
        }
      });
    } else {
      this.commonservice.presentToast(
        this.translate.instant("GENERALBUTTON.pleasefilltheform")
      );
    }
  }

  async credentialalert(getusername, getpassword) {
    let alertmessage =
      "<b>" +
      this.translate.instant("FFBSUPPLIERHOME.username") +
      getusername +
      "</b><br><b>" +
      this.translate.instant("FFBSUPPLIERHOME.password") +
      getpassword +
      "</b>";

    const alert = await this.alertController.create({
      mode: "md",
      header: this.translate.instant("FFBSUPPLIERHOME.alert"),
      subHeader: this.translate.instant("FFBSUPPLIERHOME.alertmessage"),
      cssClass: "customalertmessageonebuttons",
      message: alertmessage,
      buttons: [
        {
          text: "",
          handler: () => {
            //console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }

  ffbramppagination(event) {
    setTimeout(() => {
      if (this.ffbramplistArr.length == this.ffbramptotalpage) {
        event.target.complete();
        return;
      }

      event.target.complete();

      var z = Math.ceil(this.ffbramplistArr.length / this.ffbrampsize);

      if (this.ffbramplistArr.length < this.ffbramptotalpage) {
        this.getFFBrampdetails(false, String(z));
      }
    }, 500);
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
