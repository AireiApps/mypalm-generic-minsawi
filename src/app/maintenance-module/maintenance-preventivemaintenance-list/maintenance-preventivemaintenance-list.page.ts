import { Component, OnInit, NgZone } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import * as moment from "moment";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-maintenance-preventivemaintenance-list",
  templateUrl: "./maintenance-preventivemaintenance-list.page.html",
  styleUrls: ["./maintenance-preventivemaintenance-list.page.scss"],
})
export class MaintenancePreventivemaintenanceListPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  departmentid = this.userlist.dept_id;

  preventivemaintenanceForm;

  notificationlistArr = [];
  statusArr = [
    {
      id: 1,
      status: "Assign",
    },
    {
      id: 2,
      status: "Created",
    },
  ];
  //maintenancetypeArr = [];

  searchmaintenancetypeid = 0;
  searchstatusid = 0;
  totalrecords = 0;
  count = 0;

  enableflag = false;

  fromdate = moment(
    new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000).toISOString()
  ).format("DD-MM-YYYY");

  todate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  filterTerm: string;

  constructor(
    private languageService: LanguageService,
    private zone: NgZone,
    private fb: FormBuilder,
    private router: Router,
    private notifi: AuthGuardService,
    private commonservice: AIREIService,
    private service: MaintenanceServiceService
  ) {
    this.preventivemaintenanceForm = this.fb.group({
      txt_fromdate: new FormControl(this.fromdate),
      txt_todate: new FormControl(this.todate),
      select_maintenancetype: new FormControl(""),
      select_status: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.getNotification();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.getNotification();
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
            this.preventivemaintenanceForm.controls.txt_fromdate.setValue(
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
        doneText: "Done",
        cancelText: "Cancel",
      }).then(
        (val) => {
          if (val.value) {
            this.todate = val.value;
            this.preventivemaintenanceForm.controls.txt_todate.setValue(
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

  /*getMaintenancetype() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
    };
    this.service.getMaintenanceTypeList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.maintenancetypeArr = resultdata.data;

        this.getNotification();
      } else {
        this.maintenancetypeArr = [];

        this.getNotification();
      }
    });
  }*/

  onChangeStatus() {
    this.getNotification();
  }

  getNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    if (this.preventivemaintenanceForm.value.select_maintenancetype == "") {
      this.searchmaintenancetypeid = 0;
    } else {
      this.searchmaintenancetypeid = Number(
        this.preventivemaintenanceForm.value.select_maintenancetype
      );
    }

    if (this.preventivemaintenanceForm.value.select_status == "") {
      this.searchstatusid = 0;
    } else {
      this.searchstatusid = Number(
        this.preventivemaintenanceForm.value.select_status
      );
    }

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: getfromdate,
      todate: gettodate,
      status: this.searchstatusid,
      type: 0,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getPreventiveMaintenanceList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.notificationlistArr = resultdata.data;
        this.totalrecords = resultdata.recordcount;
        this.enableflag = false;
      } else {
        this.notificationlistArr = [];
        this.totalrecords = 0;
        this.enableflag = true;
      }
    });
  }

  btn_NotificationNew() {
    this.router.navigate(["/maintenance-notification-new"]);
  }

  btn_NotificationEdit(value) {
    this.router.navigate([
      "/maintenance-preventivemaintenance-edit",
      { item: JSON.stringify(value), from: "PV" },
    ]);
  }

  btn_NotificationView(value) {
    this.router.navigate([
      "/maintenance-notification-view",
      { item: JSON.stringify(value), from: "PV" },
    ]);
  }

  btn_NotificationAssign(value) {
    this.router.navigate([
      "/maintenance-preventivemaintenance-assign",
      { item: JSON.stringify(value) },
    ]);
  }

  goback() {
    this.router.navigate(["tabs/tabmaintenancehome"]);
  }
}
