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
import { GradingserviceService } from "src/app/services/grading-service/gradingservice.service";

import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { GradingUpdateScreenPage } from "../grading-update-screen/grading-update-screen.page";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-grading-home-screen',
  templateUrl: './grading-home-screen.page.html',
  styleUrls: ['./grading-home-screen.page.scss'],
})
export class GradingHomeScreenPage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

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
  norecordFlag = false;
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
    public modalController: ModalController,
    private appVersion: AppVersion,
    private market: Market,
    private animationCtrl: AnimationController,
    private gradingservice: GradingserviceService,
    private screenOrientation: ScreenOrientation,
  ) {
  

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
    this.forceUpdated();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
    this.forceUpdated();
    this.getGrading(true,'0');
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
          text: this.translate.instant("GENERALBUTTON.updatebutton"),
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
                localStorage.clear();
                this.notifi.logoutupdateNotification();
                this.router.navigate(["/login"], { replaceUrl: true });

                console.debug(response);
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
  getGrading(pagerefresh: Boolean, pagenum: string) {
    
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
    });
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
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
  async btn_updateAction(value) {
    const modal = await this.modalController.create({
        component: GradingUpdateScreenPage,
        componentProps: {
          item: value,
        },
      });
      modal.onDidDismiss().then((modeldata) => {
        this.getGrading(true,'0');
      });
      return await modal.present();
  }
}
