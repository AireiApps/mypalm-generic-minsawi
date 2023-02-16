import { Component, OnInit, NgZone } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import * as moment from "moment";
import { ModalController, AlertController } from "@ionic/angular";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

// Modal Pages - Start

import { MaintenancePreventivemaintenanceAssignModalPage } from "src/app/maintenance-module/maintenance-preventivemaintenance-assign-modal/maintenance-preventivemaintenance-assign-modal.page";
import { MaintenanceAcknowledgeModalPage } from "src/app/maintenance-module/maintenance-acknowledge-modal/maintenance-acknowledge-modal.page";
import { LanguageService } from "src/app/services/language-service/language.service";
// Modal Pages - End

// Custom Datepicker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-maintenance-routine",
  templateUrl: "./maintenance-routine.page.html",
  styleUrls: ["./maintenance-routine.page.scss"],
})
export class MaintenanceRoutinePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  departmentid = this.userlist.dept_id;
  designationid = this.userlist.desigId;

  pvForm;

  notificationlistArr = [];
  creatednotificationlistArr = [];
  acknowledgenotificationlistArr = [];

  searchmaintenancetypeid = 0;
  searchstatusid = 0;

  createdrecords = 0;
  acknowledgerecords = 0;
  count = 0;

  norecordflag = false;
  creatednorecordflag = false;
  acknowledgenorecordflag = false;

  /*fromdate = moment(
    new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000).toISOString()
  ).format("DD-MM-YYYY");*/

  fromdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  todate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  filterTerm: string;

  tabs_segment = "";

  constructor(
    private languageService: LanguageService,
    private zone: NgZone,
    private fb: FormBuilder,
    private router: Router,
    private notifi: AuthGuardService,
    public modalController: ModalController,
    private alertController: AlertController,
    private commonservice: AIREIService,
    private service: MaintenanceServiceService
  ) {
    this.pvForm = this.fb.group({
      txt_fromdate: new FormControl(this.fromdate),
      txt_todate: new FormControl(this.todate),
    });

    if (this.designationid == 2) {
      this.tabs_segment = "Created";
    }
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    if (this.tabs_segment == "") {
      this.getPVNotification();
    } else if (this.tabs_segment == "Created") {
      this.getCreatedPVNotification();
    } else if (this.tabs_segment == "Acknowledgement") {
      this.getAcknowledgePVNotification();
    }
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    if (this.tabs_segment == "") {
      this.getPVNotification();
    } else if (this.tabs_segment == "Created") {
      this.getCreatedPVNotification();
    } else if (this.tabs_segment == "Acknowledgement") {
      this.getAcknowledgePVNotification();
    }
  }

  openDateTimePicker(type) {
    if (type == "FD") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.fromdate,
        theme: "dark",
        doneText: "Done",
        cancelText: "Cancel",
      }).then(
        (val) => {
          if (val.value) {
            this.fromdate = val.value;
            this.pvForm.controls.txt_fromdate.setValue(this.fromdate);
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
        doneText: "Done",
        cancelText: "Cancel",
      }).then(
        (val) => {
          if (val.value) {
            this.todate = val.value;
            this.pvForm.controls.txt_todate.setValue(this.todate);
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

  geBorderColor(status) {
    let color;

    if (status == "") {
      color = "#ffffff71";
    }

    // Good
    if (status == "0") {
      color = "#87D37C";
    }

    // Abnormal
    if (status == "1") {
      color = "#ff4d4d";
    }

    return color;
  }

  getBackgroundColor(status) {
    let color;

    if (status == "") {
      color = "#ffffff";
    }

    // Good
    if (status == "0") {
      color = "#e2fcde";
    }

    // Abnormal
    if (status == "1") {
      color = "#fce1e1";
    }

    return color;
  }

  getTextColor(status) {
    let color;

    if (status == "") {
      color = "#000000";
    }

    if (status == "0") {
      color = "#000000";
    }

    if (status == "1") {
      color = "#ffffff";
    }

    return color;
  }

  getRecords() {
    if (this.designationid != 2) {
      this.getPVNotification();
    } else {
      if (this.tabs_segment == "Created") {
        this.getCreatedPVNotification();
      } else if (this.tabs_segment == "Acknowledgement") {
        this.getAcknowledgePVNotification();
      }
    }
  }

  getPVNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      status: 0,
      type: 0,
      segment: "",
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.getPreventiveMaintenanceList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.notificationlistArr = resultdata.data;

        this.norecordflag = false;
      } else {
        this.notificationlistArr = [];

        this.norecordflag = true;
      }
    });
  }

  getCreatedPVNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      status: 0,
      type: 0,
      segment: "Created",
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.getPreventiveMaintenanceList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.creatednotificationlistArr = resultdata.data;

        this.createdrecords = resultdata.createdcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.creatednorecordflag = false;
      } else {
        this.creatednotificationlistArr = [];

        this.createdrecords = resultdata.createdcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.creatednorecordflag = true;
      }
    });
  }

  getAcknowledgePVNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      status: 0,
      type: 0,
      segment: "Acknowledgement",
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.getPreventiveMaintenanceList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.acknowledgenotificationlistArr = resultdata.data;

        this.createdrecords = resultdata.createdcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.acknowledgenorecordflag = false;
      } else {
        this.acknowledgenotificationlistArr = [];

        this.createdrecords = resultdata.createdcount;
        this.acknowledgerecords = resultdata.acknowlegecount;

        this.acknowledgenorecordflag = true;
      }
    });
  }

  showAuthorize(value) {
    let alertmessage =
      "Are you sure, you want to acknowledge this completed Routine Preventive Maintenance Notification?";

    this.alertController
      .create({
        header: "ALERT",
        message: alertmessage,
        cssClass: "alertmessage",
        backdropDismiss: false,
        buttons: [
          {
            text: "No",
            role: "no",
            cssClass: "secondary",
            handler: (no) => {
              //console.log("No");
            },
          },
          {
            text: "Yes",
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
        this.commonservice.presentToast("Authroization Updation Failed");
      }
    });
  }

  btn_PVNotificationEdit(value) {
    this.router.navigate([
      "/maintenance-preventivemaintenance-edit",
      { item: JSON.stringify(value), from: "PV" },
    ]);
  }

  btn_PVNotificationView(value) {
    this.router.navigate([
      "/maintenance-notification-view",
      { item: JSON.stringify(value), from: "RoPM" },
    ]);
  }

  btn_PVNotificationAssign(value) {
    this.router.navigate([
      "/maintenance-preventivemaintenance-assign",
      { item: JSON.stringify(value) },
    ]);
  }

  btn_PVNotificationMaterialRequest(value) {
    this.router.navigate([
      "/maintenance-preventivemaintenance-created",
      { item: JSON.stringify(value) },
    ]);
  }

  segmentChanged(ev: any) {
    //console.log("Segment changed", ev.detail.value);
    if (ev.detail.value == "Created") {
      this.getCreatedPVNotification();
    }

    if (ev.detail.value == "Acknowledgement") {
      this.getAcknowledgePVNotification();
    }
  }

  async callmodalcontroller(value, type) {
    if (type == "ASSIGN") {
      const modal = await this.modalController.create({
        component: MaintenancePreventivemaintenanceAssignModalPage,
        componentProps: {
          item: JSON.stringify(value),
          module: "MAINTENANCE",
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
          module: "ROUTINE",
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
  }
}
