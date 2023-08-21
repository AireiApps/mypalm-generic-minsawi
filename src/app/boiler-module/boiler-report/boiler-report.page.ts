import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BoilerServiceService } from "src/app/services/boiler-service/boiler-service.service";
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";
import { AIREIService } from "src/app/api/api.service";
import { Platform, AlertController } from "@ionic/angular";
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

import { TranslateService } from "@ngx-translate/core";

import { GeneralserviceService } from "src/app/services/generalservice/generalservice.service";

@Component({
  selector: "app-boiler-report",
  templateUrl: "./boiler-report.page.html",
  styleUrls: ["./boiler-report.page.scss"],
})
export class BoilerReportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  mill_name = this.nl2br(this.userlist.millname);

  count = 0;

  itemsArr = [
    [
      {
        title: "Boiler",
        subtitle: "Log Book",
        name: "BoilerLogBook",
        path: "/boilelogbook",
        imgpath: "../../assets/img/viewlog.png",
      },
      {
        title: this.translate.instant("PRODUCTIONHOME.correctivetitle"),
        subtitle: this.translate.instant("PRODUCTIONHOME.correctivesubtitle"),
        name: "Corrective Maintenance",
        path: "/report-production-maintenance-notification",
        imgpath: "../../assets/img/corrective_report.png",
      },
    ],
    [
      {
        title: "Abnormal",
        subtitle: "Report",
        name: "Abnormal Report",
        path: "/abnormal-report-screen",
        imgpath: "../../assets/img/pressmachineroutinecheck.png",
      },
    ],
  ];

  constructor(
    private translate: TranslateService,
    private zone: NgZone,
    private router: Router,
    private fb: FormBuilder,
    private notifi: AuthGuardService,
    private commonservice: AIREIService,
    private service: BoilerServiceService,
    private httpservice: HttpserviceService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    private market: Market,
    private generalservice: GeneralserviceService
  ) {
    //generalservice.loginstate = true;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
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
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/notification"]);
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
        // alert('Push received: ' + JSON.stringify(notification));
        this.updateNotification();
      }
    );
  }

  btn_Action(item) {
    this.router.navigate([item.path]);
  }
  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
