import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { ModalController, AlertController, IonList } from "@ionic/angular";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import * as moment from "moment";
import { LanguageService } from "src/app/services/language-service/language.service";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
import { TranslateService } from "@ngx-translate/core";

const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-report-maintenance-notification",
  templateUrl: "./report-maintenance-notification.page.html",
  styleUrls: ["./report-maintenance-notification.page.scss"],
})
export class ReportMaintenanceNotificationPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  millcode = this.userlist.millcode;

  notificationReportForm;

  designationid = this.userlist.desigId;

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  //fromdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  //todate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  fromdate = "";
  todate = "";

  notificationlistArr = [];

  enableflag = false;
  pleasewaitflag = false;

  count = 0;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    private notifi: AuthGuardService,
    public modalController: ModalController,
    private router: Router,
    private fb: FormBuilder,
    private service: MaintenanceServiceService
  ) {
    this.notificationReportForm = this.fb.group({
      from_date: new FormControl(""),
      to_date: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    /*PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();*/

    this.getNotification();
  }

  ionViewDidEnter() {
    /*PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();*/

    this.getNotification();
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
      color = "#409b00";
    }

    return color;
  }

  openFromDateTimePicker() {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      date: this.fromdate,
      max: this.currentdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          this.fromdate = val.value;
          this.notificationReportForm.controls.from_date.setValue(
            this.fromdate
          );
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  openToDateTimePicker() {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      date: this.todate,
      max: this.currentdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText:this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          this.todate = val.value;
          this.notificationReportForm.controls.to_date.setValue(this.todate);
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  getNotification() {
    let getfromdate;
    let gettodate;

    if (this.fromdate != "" || this.todate != "") {
      getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
      gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");
    } else {
      getfromdate = "";
      gettodate = "";
    }

    this.notificationlistArr = [];
    this.enableflag = false;
    this.pleasewaitflag = true;

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      Fromdate: getfromdate,
      Todate: gettodate,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getNotificationListReport(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (this.fromdate == "" || this.todate == "") {
        this.fromdate = moment(resultdata.Fromdate, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        );

        this.notificationReportForm.controls.from_date.setValue(this.fromdate);

        this.todate = moment(resultdata.Todate, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        );

        this.notificationReportForm.controls.to_date.setValue(this.todate);
      }

      if (resultdata.httpcode == 200) {
        this.notificationlistArr = resultdata.data;
        this.enableflag = false;
        this.pleasewaitflag = false;
      } else {
        this.notificationlistArr = [];
        this.enableflag = true;
        this.pleasewaitflag = false;
      }
    });
  }

  btn_NotificationView(value) {
    this.router.navigate([
      "/maintenance-notification-view",
      { item: JSON.stringify(value), from: "CMReport" },
    ]);
  }
}
