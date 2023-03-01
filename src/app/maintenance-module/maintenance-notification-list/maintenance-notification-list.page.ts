import { Component, OnInit, NgZone } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import * as moment from "moment";

import { AlertController, ModalController } from "@ionic/angular";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

// Modal Pages - Start
import { MaintenanceNotificationUpdateModalPage } from "src/app/maintenance-module/maintenance-notification-update-modal/maintenance-notification-update-modal.page";
import { MaintenanceAcknowledgeModalPage } from "src/app/maintenance-module/maintenance-acknowledge-modal/maintenance-acknowledge-modal.page";
// Modal Pages - End
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-maintenance-notification-list",
  templateUrl: "./maintenance-notification-list.page.html",
  styleUrls: ["./maintenance-notification-list.page.scss"],
})
export class MaintenanceNotificationListPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  millcode = this.userlist.millcode;
  departmentid = this.userlist.dept_id;
  designationid = this.userlist.desigId;

  maintenancenotificationForm;

  notificationlistArr = [];
  creatednotificationlistArr = [];
  acknowledgenotificationlistArr = [];

  searchmaintenancetypeid = 0;
  searchstatusid = 0;

  createdrecords = 0;
  inprogressrecords = 0;
  completedrecords = 0;
  assignedrecords = 0;
  acknowledgerecords = 0;
  count = 0;

  norecordflag = false;
  creatednorecordflag = false;
  acknowledgenorecordflag = false;
  pleasewaitflag = false;

  /*fromdate = moment(
    new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000).toISOString()
  ).format("DD-MM-YYYY");*/

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  fromdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  todate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  filterTerm: string;

  tabs_segment = "";
  secondtabs_segment = "";

  notificationdate = "";
  notificationdata;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
    private notifi: AuthGuardService,
    private commonservice: AIREIService,
    private service: MaintenanceServiceService
  ) {
    this.notificationdate =
      this.activatedroute.snapshot.paramMap.get("reportdate");

    if (
      typeof this.notificationdate !== "undefined" &&
      this.notificationdate !== null &&
      this.notificationdate != ""
    ) {
      this.fromdate = moment(this.notificationdate, "YYYY-MM-DD").format(
        "DD-MM-YYYY"
      );
    }

    this.maintenancenotificationForm = this.fb.group({
      txt_fromdate: new FormControl(this.fromdate),
      txt_todate: new FormControl(this.todate),
      select_maintenancetype: new FormControl(""),
      select_status: new FormControl(""),
    });

    if (this.designationid == 2 && this.userlist.verificationacccess != 3) {
      this.tabs_segment = "Acknowledgement";
    } else {
      this.secondtabs_segment = "Created";
    }

    if (this.departmentid == 7 && this.designationid == 2) {
      this.activatedroute.params.subscribe((val) => {
        if (localStorage.getItem("notificationdata") != "") {
          this.notificationdata = JSON.parse(
            localStorage.getItem("notificationdata")
          );

          if (
            this.notificationdata.redirect !== "undefined" &&
            this.notificationdata.redirect !== null
          ) {
            if (
              this.notificationdata.redirect ==
              "CORRECTIVE MAINTENANCE NOTIFICATION"
            ) {
              localStorage.setItem("notificationdata", "");

              this.tabs_segment = "All";

              this.secondtabs_segment = "Created";

              this.getCreatedNotification("Created");
            } else if (
              this.notificationdata.redirect ==
              "CORRECTIVE MAINTENANCE NOTIFICATION ACKNOWLEDGEMENT"
            ) {
              localStorage.setItem("notificationdata", "");

              this.tabs_segment = "Acknowledgement";

              this.getAcknowledgeNotification();
            } else if (
              this.notificationdata.redirect ==
              "CORRECTIVE MAINTENANCE NOTIFICATION VERIFICATION"
            ) {
              localStorage.setItem("notificationdata", "");

              this.tabs_segment = "Acknowledgement";

              this.getAcknowledgeNotification();
            }
          }
        }
      });
    }
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    if (this.userlist.verificationacccess != 3) {
      if (this.tabs_segment == "") {
        this.getNotification();
      } else if (this.tabs_segment == "Acknowledgement") {
        this.getAcknowledgeNotification();
      }
    } else {
      this.secondtabs_segment = "Created";

      this.getCreatedNotification(this.secondsegmentChanged);
    }
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    if (this.userlist.verificationacccess != 3) {
      if (this.tabs_segment == "") {
        this.getNotification();
      } else if (this.tabs_segment == "Acknowledgement") {
        this.getAcknowledgeNotification();
      }
    } else {
      this.secondtabs_segment = "Created";

      this.getCreatedNotification(this.secondsegmentChanged);
    }
  }

  openDateTimePicker(type) {
    if (type == "FD") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.fromdate,
        theme: "dark",
        doneText: this.translate.instant("CORRECTIVEMAINTENACE.done"),
        cancelText: this.translate.instant("CORRECTIVEMAINTENACE.cancel"),
      }).then(
        (val) => {
          if (val.value) {
            this.fromdate = val.value;
            this.maintenancenotificationForm.controls.txt_fromdate.setValue(
              this.fromdate
            );
          }
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }

    if (type == "TD") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.todate,
        theme: "dark",
        doneText: this.translate.instant("CORRECTIVEMAINTENACE.done"),
        cancelText: this.translate.instant("CORRECTIVEMAINTENACE.cancel"),
      }).then(
        (val) => {
          if (val.value) {
            this.todate = val.value;
            this.maintenancenotificationForm.controls.txt_todate.setValue(
              this.todate
            );
          }
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }
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

  getStatusTextColor(status) {
    let color;

    if (status == "1") {
      color = "#cb4335";
    }

    if (status == "2") {
      color = "#ff9f0c";
    }

    if (status == "3") {
      color = "#ff9f0c";
    }

    if (status == "4") {
      color = "#9b59b6";
    }

    if (status == "5") {
      color = "#f39c12";
    }

    if (status == "6") {
      color = "#007bb3";
    }

    if (status == "7") {
      color = "#008000";
    }

    if (status == "8") {
      color = "#616161";
    }

    if (status == "9") {
      color = "#e74c3c";
    }

    if (status == "10") {
      color = "#01b800";
    }

    if (status == "12") {
      color = "#f36311";
    }

    return color;
  }

  getRecords() {
    if (this.tabs_segment == "All") {
      this.getCreatedNotification(this.secondtabs_segment);
    } else if (this.tabs_segment == "Acknowledgement") {
      this.getAcknowledgeNotification();
    } else {
      this.getNotification();
    }
  }

  getNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    this.notificationlistArr = [];
    this.norecordflag = false;
    this.pleasewaitflag = true;

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      segment: "",
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getNotificationList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.notificationlistArr = resultdata.data;
        this.norecordflag = false;
        this.pleasewaitflag = false;
      } else {
        this.notificationlistArr = [];
        this.norecordflag = true;
        this.pleasewaitflag = false;
      }
    });
  }

  getCreatedNotification(getcurrentsegment) {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    this.creatednotificationlistArr = [];
    this.creatednorecordflag = false;
    this.pleasewaitflag = true;

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      segment: getcurrentsegment,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getNotificationList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.creatednotificationlistArr = resultdata.data;

        this.createdrecords = resultdata.createdcount;
        this.inprogressrecords = resultdata.inprogesscount;
        this.assignedrecords = resultdata.assignedcount;
        this.completedrecords = resultdata.completedcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.creatednorecordflag = false;

        this.pleasewaitflag = false;
      } else {
        this.creatednotificationlistArr = [];

        this.createdrecords = resultdata.createdcount;
        this.inprogressrecords = resultdata.inprogesscount;
        this.assignedrecords = resultdata.assignedcount;
        this.completedrecords = resultdata.completedcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.creatednorecordflag = true;

        this.pleasewaitflag = false;
      }
    });
  }

  getAcknowledgeNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    this.acknowledgenotificationlistArr = [];
    this.acknowledgenorecordflag = false;
    this.pleasewaitflag = true;

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      segment: "Acknowledgement",
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getNotificationList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.acknowledgenotificationlistArr = resultdata.data;

        this.createdrecords = resultdata.createdcount;
        this.inprogressrecords = resultdata.inprogesscount;
        this.assignedrecords = resultdata.assignedcount;
        this.completedrecords = resultdata.completedcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.acknowledgenorecordflag = false;

        this.pleasewaitflag = false;
      } else {
        this.acknowledgenotificationlistArr = [];

        this.createdrecords = resultdata.createdcount;
        this.inprogressrecords = resultdata.inprogesscount;
        this.assignedrecords = resultdata.assignedcount;
        this.completedrecords = resultdata.completedcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.acknowledgenorecordflag = true;

        this.pleasewaitflag = false;
      }
    });
  }

  btn_NotificationNew() {
    this.router.navigate(["/maintenance-notification-new"]);
  }

  btn_NotificationEdit(value) {
    /*if (value.statusId == 2) {
      this.router.navigate([
        "/maintenance-notification-inprogress-edit",
        { item: JSON.stringify(value) },
      ]);
    } else if (value.statusId == 3) {
      this.router.navigate([
        "/maintenance-notification-materialrequest",
        { item: JSON.stringify(value) },
      ]);
    } else if (value.statusId == 4) {
      this.router.navigate([
        "/maintenance-notification-materialissuance-edit",
        { item: JSON.stringify(value) },
      ]);
    } else if (value.statusId == 10) {
      this.router.navigate([
        "/maintenance-correctivemaintenance-edit",
        { item: JSON.stringify(value), from: "MNL" },
      ]);
    } else {
      if (value.typeId == 2 || value.typeId == 3 || value.typeId == 4) {
        this.router.navigate([
          "/maintenance-notification-technicalclerk-edit",
          { item: JSON.stringify(value) },
        ]);
      } else {
        this.router.navigate([
          "/maintenance-notification-edit",
          { item: JSON.stringify(value) },
        ]);
      }
    }*/

    if (value.statusId == 1) {
      this.callmodalcontroller(value, "ASSIGN");
    }
  }

  btn_NotificationView(value) {
    if (value.statusId != 6) {
      this.router.navigate([
        "/maintenance-notification-view",
        { item: JSON.stringify(value), from: "CM" },
      ]);
    } else {
      this.router.navigate([
        "/maintenance-notification-view",
        { item: JSON.stringify(value), from: "CMACK" },
      ]);
    }
  }

  showAuthorize(value) {
    let alertmessage = this.translate.instant(
      "CORRECTIVEMAINTENACE.alertmessage"
    );

    this.alertController
      .create({
        header: this.translate.instant("CORRECTIVEMAINTENACE.alert"),
        message: alertmessage,
        cssClass: "alertmessage",
        backdropDismiss: false,
        buttons: [
          {
            text: this.translate.instant("CORRECTIVEMAINTENACE.no"),
            role: "no",
            cssClass: "secondary",
            handler: (no) => {
              //console.log("No");
            },
          },
          {
            text: this.translate.instant("CORRECTIVEMAINTENACE.yes"),
            handler: () => {
              this.authorize(value);
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  authorize(value) {
    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      id: value.id,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.updateCorrectiveMaintenanceAuthorize(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.ngAfterViewInit();
      } else {
        this.commonservice.presentToast(
          this.translate.instant("CORRECTIVEMAINTENACE.authorizationupdation")
        );
      }
    });
  }

  segmentChanged(ev: any) {
    //console.log("Segment changed", ev.detail.value);
    if (ev.detail.value == "All") {
      this.secondtabs_segment = "Created";

      this.getCreatedNotification(this.secondtabs_segment);
    }

    if (ev.detail.value == "Acknowledgement") {
      this.getAcknowledgeNotification();
    }
  }

  secondsegmentChanged(ev: any) {
    //console.log(this.thirdtabs_segment);
    if (this.userlist.verificationacccess != 3) {
      if (this.tabs_segment == "All") {
        this.getCreatedNotification(this.secondtabs_segment);
      }
    } else {
      this.getCreatedNotification(this.secondtabs_segment);
    }
  }

  async callmodalcontroller(value, type) {
    if (type == "ASSIGN") {
      const modal = await this.modalController.create({
        component: MaintenanceNotificationUpdateModalPage,
        componentProps: {
          item: JSON.stringify(value),
          module: "CM",
        },
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["notification-modal"],
      });

      modal.onDidDismiss().then((data) => {
        this.ngAfterViewInit();
      });

      return await modal.present();
    }

    if (type == "ACKNOWLEDGE") {
      const modal = await this.modalController.create({
        component: MaintenanceAcknowledgeModalPage,
        componentProps: {
          item: JSON.stringify(value),
          module: "CM",
        },
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["acknowledgement-modal"],
      });

      modal.onDidDismiss().then((data) => {
        this.ngAfterViewInit();
      });

      return await modal.present();
    }
  }
}
