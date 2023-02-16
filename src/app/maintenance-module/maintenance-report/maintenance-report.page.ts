import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "app-maintenance-report",
  templateUrl: "./maintenance-report.page.html",
  styleUrls: ["./maintenance-report.page.scss"],
})
export class MaintenanceReportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  usermillcode = this.userlist.millcode;

  mill_name = this.nl2br(this.userlist.millname);

  count = 0;
  brodacastcommcount = 0; /*Broadcdast notification count*/
  personalizedcommcount = 0; /*Personalized notification count*/

  lab1006Arr = [
    /*[
      {
        title: "Maintenance Notification Report",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/maintenancenotification.png",
      },
    ],
    [
      {
        title: "Corrective Maintenance",
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/correctivemaintenance.png",
      },
    ],*/ [
      {
        title: this.translate.instant("MAINTENANCEREPORT.oillossesreport"),
        path: "/lab-oillossesreport",
        imgpath: "../../assets/img/oillossesreport.png",
      },
    ],
  ];

  manager1006Arr = [
    [
      // [
      //   {
      //     title: "Maintenance User Activity Report",
      //     path: "/maintenaceuser-activity",
      //     imgpath: "../../assets/img/machinerunninghours.png",
      //   },
      // ],
      // [
      //   {
      //     title: "Production User Activity Report",
      //     path: "/productionuser-activity",
      //     imgpath: "../../assets/img/supervisorreport.png",
      //   },
      // ],
      /*[
      {
        title: "Daily Checklist",
        name: "Daily Checklist",
        path: "/report-dailychecklist-stations",
        imgpath: "../../assets/img/checklist.png",
      },
    ],*/
      {
        title: this.translate.instant("MAINTENANCEREPORT.preventivemaintenance"),
        name: "Preventive Maintenance",
        path: "/report-pvrpv",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      {
        title:  this.translate.instant("MAINTENANCEREPORT.correctivemaintenance"),
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/correctivemaintenance.png",
      },
      /*[
      {
        title: "Maintenance Notification Report",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/maintenancenotification.png",
      },
    ],*/
      {
        title: this.translate.instant("MAINTENANCEREPORT.machineryrunninghoursreport"),
        path: "/report-machineryrunninghour",
        imgpath: "../../assets/img/machineryrunninghours.png",
      },
      {
        title:this.translate.instant("MAINTENANCEREPORT.hourlypressstationreport"),
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
        title: this.translate.instant("MAINTENANCEREPORT.hourlysterilizerreport"),
        path: "/report-sterilizerhourlyperformance",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
      /*[
      {
        title: "Sterilizer Station Log Sheet",
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
        title:this.translate.instant("MAINTENANCEREPORT.oillossesreport"),
        path: "/lab-oillossesreport",
        imgpath: "../../assets/img/oillossesreport.png",
      },
    ],
  ];

  engineering1006Arr = [
    [
      {
        title: this.translate.instant("MAINTENANCEREPORT.preventivemaintenance"),
        name: "Preventive Maintenance",
        path: "/report-pvrpv",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      {
        title: this.translate.instant("MAINTENANCEREPORT.correctivemaintenance"),
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/correctivemaintenance.png",
      },
      // {
      //   title: "Mill Production Status",
      //   name: "Mill Production Status",
      //   path: "/manager-productiondashboard",
      //   imgpath: "../../assets/img/machinerunninghours.png",
      // },
      {
        title:  this.translate.instant("MAINTENANCEREPORT.predictionanalysis"),
        name: "Prediction Analysis",
        path: "/dashboard-oilloss-predictionanalysis",
        imgpath: "../../assets/img/predictiveanalysis.png",
      },
      {
        title: this.translate.instant("MAINTENANCEREPORT.machineryrunninghoursreport"),
        path: "/report-machineryrunninghour",
        imgpath: "../../assets/img/machineryrunninghours.png",
      },
      {
        title: this.translate.instant("MAINTENANCEREPORT.hourlypressstationreport"),
        path: "/report-pressstationhourlyperformance",
        imgpath: "../../assets/img/pressingstation.png",
      },
      {
        title: this.translate.instant("MAINTENANCEREPORT.hourlysterilizerreport"),
        path: "/report-sterilizerhourlyperformance",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
      {
        title:  this.translate.instant("MAINTENANCEREPORT.oillossesreport"),
        path: "/lab-oillossesreport",
        imgpath: "../../assets/img/oillossesreport.png",
      },
    ],
  ];

  foreman1006Arr = [
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
        title: this.translate.instant("MAINTENANCEREPORT.preventivemaintenance"),
        name: "Preventive Maintenance",
        path: "/report-pvrpv",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      {
        title:  this.translate.instant("MAINTENANCEREPORT.correctivemaintenance"),
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/correctivemaintenance.png",
      },
      /*[
      {
        title: "Maintenance Notification Report",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/maintenancenotification.png",
      },
    ],*/
      {
        title:this.translate.instant("MAINTENANCEREPORT.machineryrunninghoursreport"),
        path: "/report-machineryrunninghour",
        imgpath: "../../assets/img/machineryrunninghours.png",
      },
      /*[
      {
        title: "Hourly Press Station Report",
        path: "/report-pressstationhourlyperformance",
        imgpath: "../../assets/img/pressingstation.png",
      },
    ],
    [
      {
        title: "Hourly Sterilizer Report",
        path: "/report-sterilizerhourlyperformance",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
    ],*/
    ],
  ];

  fitterArr = [
    [
      {
        title: this.translate.instant("MAINTENANCEREPORT.correctivetitle"),
        subtitle: this.translate.instant("MAINTENANCEREPORT.correctivesubtitle"),
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/corrective_report.png",
      },
      {
        title: this.translate.instant("MAINTENANCEREPORT.preventivetitle"),
        subtitle: this.translate.instant("MAINTENANCEREPORT.preventivesubtitle"),
        name: "Preventive Maintenance",
        path: "/report-pvrpv",
        imgpath: "../../assets/img/preventive_report.png",
      },
    ],
  ];

  chargemanArr = [
    [
      {
        title: this.translate.instant("MAINTENANCEREPORT.correctivetitle"),
        subtitle: this.translate.instant("MAINTENANCEREPORT.correctivesubtitle"),
        name: "Corrective Maintenance",
        path: "/report-maintenance-notification",
        imgpath: "../../assets/img/corrective_report.png",
      },
      {
        title: this.translate.instant("MAINTENANCEREPORT.preventivetitle"),
        subtitle: this.translate.instant("MAINTENANCEREPORT.preventivesubtitle"),
        name: "Preventive Maintenance",
        path: "/report-pvrpv",
        imgpath: "../../assets/img/preventive_report.png",
      },
    ],
  ];

  constructor(
    private zone: NgZone,
    private notifi: AuthGuardService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private service: AIREIService,
    private translate: TranslateService
  ) {
    this.activatedroute.params.subscribe((val) => {
      this.ionViewDidEnter();
    });
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

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
