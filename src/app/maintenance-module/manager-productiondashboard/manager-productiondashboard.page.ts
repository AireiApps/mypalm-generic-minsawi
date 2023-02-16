import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;
import { LanguageService } from "src/app/services/language-service/language.service";
@Component({
  selector: "app-manager-productiondashboard",
  templateUrl: "./manager-productiondashboard.page.html",
  styleUrls: ["./manager-productiondashboard.page.scss"],
})
export class ManagerProductiondashboardPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  mill_name = this.userlist.millname;

  dashboardForm;

  count = 0;
  productionflag = 0;
  productioncount = 0;
  txt_millproductionstatus = "";

  currentdatetime = moment(new Date().toISOString()).format("DD-MM-YYYY HH:mm");

  uienable = false;
  pleasewaitflag = false;

  stationsArr = [];

  constructor(
    private languageService: LanguageService,
    private zone: NgZone,
    private notifi: AuthGuardService,
    private fb: FormBuilder,
    private router: Router,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {
    this.dashboardForm = this.fb.group({
      //txt_millproductionstatus: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    /*PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();*/

    this.getProductionStatus();
  }

  ionViewDidEnter() {
    /*PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();*/

    this.getProductionStatus();
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

  getProductionStatusBackGroundColor(status) {
    let color;

    if (status == "1") {
      color = "#4cbb17";
    } else if (status == "0") {
      color = "#CB4335";
    } else {
      color = "#F4F4F4";
    }

    return color;
  }

  getBackGroundColor(status) {
    let color;

    if (status == "1") {
      color = "#008000";
      // color = "linear-gradient(to right top, #74d217, #8bd847, #a0dd69, #b4e388, #c6e8a5, #c8e8a8, #cae9ac, #cce9af, #bfe599, #b1e183, #a2dd6c, #93d954)";
    } else if (status == "0") {
      color = "#CB4335";
      //color ="linear-gradient(to right top, #ea2c2c, #ef4444, #f3585a, #f56b6f, #f67d83, #f68086, #f5838a, #f5868d, #f57c81, #f57175, #f46769, #f35c5c)";
    } else {
      color = "#F4F4F4";
    }

    return color;
  }

  getProductionStatus() {
    this.pleasewaitflag = true;

    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    this.service.getProductionStartStopStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.productionflag = resultdata.data[0].status;

        if (this.productionflag == 1) {
          this.txt_millproductionstatus = "Running";
        } else {
          this.txt_millproductionstatus = "Stopped";
        }
        this.getStations();
      } else {
        this.productionflag = 0;

        this.getStations();
      }
    });
  }

  getStations() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    this.service.getProductionStaions(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.stationsArr = resultdata.data;

        if (this.productionflag == 1) {
          this.uienable = true;
        } else {
          this.uienable = false;
        }

        this.pleasewaitflag = false;
      } else {
        this.stationsArr = [];

        this.uienable = false;

        this.pleasewaitflag = false;
      }
    });
  }
}
