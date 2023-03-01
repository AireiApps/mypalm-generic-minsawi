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
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

// Custom Datepicker
import { Plugins } from "@capacitor/core";

import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-report-production-maintenance-notification",
  templateUrl: "./report-production-maintenance-notification.page.html",
  styleUrls: ["./report-production-maintenance-notification.page.scss"],
})
export class ReportProductionMaintenanceNotificationPage implements OnInit {
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

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    private router: Router,
    private fb: FormBuilder,
    private service: SupervisorService
  ) {
    this.notificationReportForm = this.fb.group({
      from_date: new FormControl(this.currentdate),
      to_date: new FormControl(this.currentdate),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getNotification();
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
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
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
      } else {
        this.notificationlistArr = [];
        this.enableflag = true;
      }
    });
  }

  btn_NotificationView(value) {
    this.router.navigate([
      "/production-notification-view",
      { item: JSON.stringify(value) },
    ]);
  }
}
