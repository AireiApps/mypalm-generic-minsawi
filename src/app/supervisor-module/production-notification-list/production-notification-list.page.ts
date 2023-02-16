import { Component, OnInit, NgZone } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import * as moment from "moment";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

// Custom Datepicker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-production-notification-list",
  templateUrl: "./production-notification-list.page.html",
  styleUrls: ["./production-notification-list.page.scss"],
})
export class ProductionNotificationListPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  designationid = this.userlist.desigId;
  millcode = this.userlist.millcode;

  maintenancenotificationForm;

  notificationlistArr = [];
  statusArr = [];
  maintenancetypeArr = [];

  totalrecords = 0;
  count = 0;

  enableflag = false;

  /*fromdate = moment(
    new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000).toISOString()
  ).format("DD-MM-YYYY");*/

  fromdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  todate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  filterTerm: string;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    private notifi: AuthGuardService,
    public modalController: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {
    this.maintenancenotificationForm = this.fb.group({
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

    this.getMaintenanceStatus();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.getMaintenanceStatus();
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
      color = "#409b00";
    }

    return color;
  }

  openDateTimePicker(type) {
    if (type == "FD") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.fromdate,
        theme: "dark",
        doneText: this.translate.instant("GENERALBUTTON.done"),
        cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
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
        doneText: this.translate.instant("GENERALBUTTON.done"),
        cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
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

  getMaintenanceStatus() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.service.getMaintenanceStatusList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.statusArr = resultdata.data;

        this.getMaintenancetype();
      } else {
        this.statusArr = [];

        this.getMaintenancetype();
      }
    });
  }

  getMaintenancetype() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
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
  }

  getNotification() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

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
    this.router.navigate(["/production-notification-new"]);
  }

  btn_NotificationEdit(value) {
    if (value.statusId == 2 || value.statusId == 3) {
      this.router.navigate([
        "/production-notification-inprogress-edit",
        { item: JSON.stringify(value) },
      ]);
    } else {
      this.router.navigate([
        "/production-notification-edit",
        { item: JSON.stringify(value) },
      ]);
    }
  }

  btn_NotificationView(value) {
    this.router.navigate([
      "/production-notification-view",
      { item: JSON.stringify(value) },
    ]);
  }
}
