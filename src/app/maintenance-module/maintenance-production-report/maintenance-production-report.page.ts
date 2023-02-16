import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

@Component({
  selector: "app-maintenance-production-report",
  templateUrl: "./maintenance-production-report.page.html",
  styleUrls: ["./maintenance-production-report.page.scss"],
})
export class MaintenanceProductionReportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;

  count = 0;
  brodacastcommcount = 0; /*Broadcdast notification count*/
  personalizedcommcount = 0; /*Personalized notification count*/

  engineeringArr = [
    [
      {
        title: "Machineries Running Hours Report",
        path: "/report-machineryrunninghour",
        imgpath: "../../assets/img/machineryrunninghours.png",
      },
      {
        title: "Hourly Press Station Report",
        path: "/report-pressstationhourlyperformance",
        imgpath: "../../assets/img/pressingstation.png",
      },
      // {
      //   title: "Press Station Log Sheet",
      //   path: "/logsheet-pressstation",
      //   imgpath: "../../assets/img/pressingstationlogsheet.png",
      // },
      {
        title: "Hourly Sterilizer Report",
        path: "/report-sterilizerhourlyperformance",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
      // {
      //   title: "Sterilizer Station Log Sheet",
      //   path: "/logsheet-sterilizerstation",
      //   imgpath: "../../assets/img/sterilisationstationlogsheet.png",
      // },
      /*[
      {
        title: "Tipping Log Sheet",
        path: "/logsheet-tippingstation",
        imgpath: "../../assets/img/logsheet.png",
      },
    ],*/
      {
        title: "Oil Losses Report",
        path: "/lab-oillossesreport",
        imgpath: "../../assets/img/oillossesreport.png",
      },
    ],
  ];

  constructor(
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
