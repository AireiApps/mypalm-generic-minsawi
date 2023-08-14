import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { appsettings } from "src/app/appsettings";
import {
  AlertController,
  Platform,
  Animation,
  AnimationController,
  ModalController,
} from "@ionic/angular";
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";
import { AIREIService } from "src/app/api/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { App, AppState } from "@capacitor/core";

import { SchedulePage } from "src/app/maintenance-module/schedule/schedule.page";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
const { PushNotifications } = Plugins;
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";

@Component({
  selector: "app-ceohome",
  templateUrl: "./ceohome.page.html",
  styleUrls: ["./ceohome.page.scss"],
})
export class CeohomePage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);
  count = 0;
  productioncount = 0;
  productioncountlength = 0;

  maintenancecount = 0;
  maintenancecountlength = 0;
  getplatform: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public modalController: ModalController,
    private httpservice: HttpserviceService,
    private zone: NgZone,
    private platform: Platform,
    private activatedroute: ActivatedRoute,
    public alertController: AlertController,
    private commonservice: AIREIService,
    private appVersion: AppVersion,
    private market: Market,
    private languageService: LanguageService,
    private animationCtrl: AnimationController,
    private notifi: AuthGuardService
  ) {
    this.activatedroute.params.subscribe((val) => {
      if (this.platform.is("android")) {
        this.getplatform = "android";
      } else if (this.platform.is("ios")) {
        this.getplatform = "ios";
      }

      this.getNotificationCount();
    });
  }

  ngOnInit() {
    App.addListener("appStateChange", (state: AppState) => {
      if (state.isActive == true) {
        if (this.router.url == "/tabs/tabdashboard") {
          this.getNotificationCount();
        }
      }
    });
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;

    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ngAfterViewInit(): void {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(this.myElementRef.nativeElement)
      .duration(2000)
      .fromTo("transform", "translateX(600px)", "translateX(0px)")
      .fromTo("opacity", "0", "1");

    animation.play();

    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.forceUpdated();

    //this.dashboardForm.controls.select_station.setValue("");
  }

  getNotificationCount() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    console.log(req);

    this.commonservice.getmaintenancependingcount(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.productioncount = resultdata.productioncount;
        this.productioncountlength = this.productioncount.toString().length;

        this.maintenancecount = resultdata.maintenancecount;
        this.maintenancecountlength = this.maintenancecount.toString().length;
      } else {
        this.productioncount = 0;
        this.productioncountlength = this.productioncount.toString().length;

        this.maintenancecount = 0;
        this.maintenancecountlength = this.maintenancecount.toString().length;
      }
    });
  }

  forceUpdated() {
    var app_version;

    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        app_version = versionNumber;

        let req = {
          user_id: this.userlist.userId,
          millcode: this.userlist.millcode,
          dept_id: this.userlist.dept_id,
        };

        this.commonservice.getSettings(req).then((result) => {
          var resultdata: any;
          resultdata = result;
          let updateVersion = resultdata.appVersion;

          if (updateVersion > app_version) {
            this.alertForce(updateVersion);
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
      header: "New Version Available",
      backdropDismiss: false,
      message:
        "A new version of MyPalm is available, Please update a version " +
        app_version,
      buttons: [
        {
          text: "Update",
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
  btn_notification(value) {
    /*if (this.userdesignation != 4 && this.userdesignation != 6) {
      localStorage.setItem("badge_count", "0");
      this.router.navigate(["/segregatenotification"]);
    }*/

    localStorage.setItem("badge_count", "0");

    if (value == "Production") {
      this.router.navigate(["/tabs/tabproduction"]);
    } else {
      this.router.navigate(["/tabs/tabmaintenance"]);
    }
  }

  updateNotification() {
    this.zone.run(() => {
      this.count = parseInt(localStorage.getItem("badge_count"));
    });
  }

  btn_reportnotification() {
    this.router.navigate(["/notification-report"]);
  }

  getLiveNotification() {
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {
        // alert('Push received: ' + JSON.stringify(notification));
        this.updateNotification();

        this.getNotificationCount();
      }
    );
  }

  dashboard() {
    this.router.navigate(["/ceodashboard"]);
  }

  reviewreport() {
    this.router.navigate(["/abcdreport"]);
  }

  monthlyreports() {
    this.router.navigate(["/ceomonthlyreports"]);
  }

  /*Commented on 17.03.2021 as Said by Veda Sir
  reports() {
    this.router.navigate(["/ceoreports"]);
  }*/

  reports() {
    this.router.navigate(["/ceo-dailyreports"]);
  }

  approvals() {
    this.router.navigate(["/approvals-home"]);
  }

  hourly() {
    this.router.navigate(["/hourly-reports-home"]);
  }

  ffblivetrackingreport() {
    this.router.navigate(["/livetrackingreport"]);
  }

  useractivity() {
    this.router.navigate(["/ceo-userlogreport"]);
  }

  financialreports() {
    this.router.navigate(["/ceo-financialreports-home"]);
  }

  gotoprofile() {
    this.router.navigate(["/more"]);
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
