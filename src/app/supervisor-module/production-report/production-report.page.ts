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
  selector: "app-production-report",
  templateUrl: "./production-report.page.html",
  styleUrls: ["./production-report.page.scss"],
})
export class ProductionReportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  usermillcode = this.userlist.millcode;

  count = 0;
  brodacastcommcount = 0; /*Broadcdast notification count*/
  personalizedcommcount = 0; /*Personalized notification count*/

  production1005Arr = [
    [
      {
        title: this.translate.instant("REPORTS.maintenancenotification"),
        path: "/report-production-maintenance-notification",
        imgpath: "../../assets/img/maintenancenotification.png",
      },
      {
        title: this.translate.instant("REPORTS.machineryrunninghours"),
        path: "/report-machineryrunninghour",
        imgpath: "../../assets/img/machineryrunninghours.png",
      },
      {
        title: this.translate.instant("REPORTS.hourlypressstation"),
        path: "/report-pressstationhourlyperformance",
        imgpath: "../../assets/img/pressingstation.png",
      },
      /*[
      {
        title: "Press Station Log Sheet",
        path: "/logsheet-pressstation",
        imgpath: "../../assets/img/pressingstationlogsheet.png",
      },
    ],*/
      {
        title: this.translate.instant("REPORTS.hourlysterilizer"),
        path: "/report-sterilizerhourlyperformance",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
      /*[
      {
        title: "Sterilization Station Log Sheet",
        path: "/logsheet-sterilizerstation",
        imgpath: "../../assets/img/sterilisationstationlogsheet.png",
      },
    ],*/
      /*[
      {
        title: "Tipping Log Sheet",
        path: "/logsheet-tippingstation",
        imgpath: "../../assets/img/logsheet.png",
      },
    ],*/
      {
        title: this.translate.instant("REPORTS.oillosses"),
        path: "/lab-oillossesreport",
        imgpath: "../../assets/img/oillossesreport.png",
      },
    ],
  ];

  production1006Arr = [
    /*[
      {
        title: "Maintenance Notification Report",
        path: "/report-production-maintenance-notification",
        imgpath: "../../assets/img/maintenancenotification.png",
      },
    ],*/
    [
      {
        title: this.translate.instant("REPORTS.correctivemaintenance"),
        path: "/report-production-maintenance-notification",
        imgpath: "../../assets/img/correctivemaintenance.png",
      },
      {
        title: this.translate.instant("REPORTS.machineryrunninghours"),
        path: "/report-machineryrunninghour",
        imgpath: "../../assets/img/machineryrunninghours.png",
      },
      {
        title: this.translate.instant("REPORTS.pressingstation"),
        path: "/report-pressstationhourlyperformance",
        imgpath: "../../assets/img/pressingstation.png",
      },
      /*[
      {
        title: "Press Station Log Sheet",
        path: "/logsheet-pressstation",
        imgpath: "../../assets/img/pressingstationlogsheet.png",
      },
    ],*/
      {
        title: this.translate.instant("REPORTS.sterilizationstation"),
        path: "/report-sterilizerhourlyperformance",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
      /*[
      {
        title: "Sterilization Station Log Sheet",
        path: "/logsheet-sterilizerstation",
        imgpath: "../../assets/img/sterilisationstationlogsheet.png",
      },
    ],*/
      /*[
      {
        title: "Tipping Log Sheet",
        path: "/logsheet-tippingstation",
        imgpath: "../../assets/img/logsheet.png",
      },
    ],*/
      {
        title: this.translate.instant("REPORTS.oillosses"),
        path: "/lab-oillossesreport",
        imgpath: "../../assets/img/oillossesreport.png",
      },
    ],
  ];

  constructor(
    private zone: NgZone,
    private notifi: AuthGuardService,
    private router: Router,
    private service: AIREIService,
    private translate: TranslateService
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
