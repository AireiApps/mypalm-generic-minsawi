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

@Component({
  selector: "app-report-preventive-maintenance",
  templateUrl: "./report-preventive-maintenance.page.html",
  styleUrls: ["./report-preventive-maintenance.page.scss"],
})
export class ReportPreventiveMaintenancePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  notificationReportForm;

  designationid = this.userlist.desigId;

  currentdate = new Date().toISOString();

  notificationlistArr = [];

  enableflag = false;

  count = 0;

  constructor(
    private languageService: LanguageService,
    private zone: NgZone,
    private notifi: AuthGuardService,
    public modalController: ModalController,
    private router: Router,
    private fb: FormBuilder,
    private service: MaintenanceServiceService
  ) {
    this.notificationReportForm = this.fb.group({
      from_date: new FormControl(this.currentdate),
      to_date: new FormControl(this.currentdate),
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
    //this.getPerformanceDetails();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

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

  getNotification() {
    let getFromDate = moment(
      this.notificationReportForm.value.from_date
    ).format("YYYY-MM-DD");
    let getToDate = moment(this.notificationReportForm.value.to_date).format(
      "YYYY-MM-DD"
    );

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      Fromdate: getFromDate,
      Todate: getToDate,
      pvflag: 1,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getPVRPVReport(req).then((result) => {
      var resultdata: any;
      resultdata = result;
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
      "/maintenance-notification-view",
      { item: JSON.stringify(value), from: "PV" },
    ]);
  }
}
