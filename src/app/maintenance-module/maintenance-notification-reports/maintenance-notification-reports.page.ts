import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";
import { TranslateService } from "@ngx-translate/core";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

@Component({
  selector: "app-maintenance-notification-reports",
  templateUrl: "./maintenance-notification-reports.page.html",
  styleUrls: ["./maintenance-notification-reports.page.scss"],
})
export class MaintenanceNotificationReportsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;

  count = 0;

  engineeringArr = [
    /*[
      {
        title: "Daily Checklist",
        name: "Daily Checklist",
        path: "/report-dailychecklist-stations",
        imgpath: "../../assets/img/checklist.png",
      },
    ],*/
    [
      {
        title: this.translate.instant("REPORTS.preventivemaintenance"),
        name: "Preventive Maintenance",
        path: "/report-pvrpv",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
    ],
    [
      {
        title: this.translate.instant("REPORTS.correctivemaintenance"),
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/correctivemaintenance.png",
      },
    ],
  ];

  constructor(
    private translate: TranslateService,

    private zone: NgZone,
    private notifi: AuthGuardService,
    private router: Router,
    private service: AIREIService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  ionViewDidEnter() {
    //this.getPerformanceDetails();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);
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
    this.router.navigate([item.path, { reportdate: "" }]);
  }
}
