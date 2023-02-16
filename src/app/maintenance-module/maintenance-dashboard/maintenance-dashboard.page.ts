import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";
import {
  AlertController,
  Platform,
  Animation,
  AnimationController,
  ModalController,
} from "@ionic/angular";
import * as moment from "moment";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

// Modal Pages - Start
import { WebviewWeeklyreportPage } from "src/app/maintenance-module/webview-weeklyreport/webview-weeklyreport.page";
import { SchedulePage } from "src/app/maintenance-module/schedule/schedule.page";
import { MaintenanceNotificationModalPage } from "src/app/maintenance-module/maintenance-notification-modal/maintenance-notification-modal.page";
import { MaintenanceEngineerNotificationModalPage } from "src/app/maintenance-module/maintenance-engineer-notification-modal/maintenance-engineer-notification-modal.page";
// Modal Pages - End

import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";

@Component({
  selector: "app-maintenance-dashboard",
  templateUrl: "./maintenance-dashboard.page.html",
  styleUrls: ["./maintenance-dashboard.page.scss"],
})
export class MaintenanceDashboardPage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  filterForm;
  dashboardForm;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  count = 0;
  productionflag = "";

  uienable = false;
  pleasewaitflag = false;
  nomachinesfound = false;

  stationlistArr = [];
  filterstationsArr = [];
  stationsArr = [];
  txt_millproductionstatus = "";
  millstartdatetime = "";
  millstopdatetime = "";

  filterTerm: string;
  getplatform: string;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public modalController: ModalController,
    private alertController: AlertController,
    private zone: NgZone,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notifi: AuthGuardService,
    private commonservice: AIREIService,
    private platform: Platform,
    private appVersion: AppVersion,
    private market: Market,
    private service: SupervisorService,
    private animationCtrl: AnimationController
  ) {
    if (this.platform.is("android")) {
      this.getplatform = "android";
    } else if (this.platform.is("ios")) {
      this.getplatform = "ios";
    }

    this.dashboardForm = this.fb.group({
      select_station: new FormControl(""),
      //txt_millproductionstatus: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(this.myElementRef.nativeElement)
      .duration(2000)
      .fromTo("transform", "translateX(600px)", "translateX(0px)")
      .fromTo("opacity", "0", "1");

    animation.play();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.forceUpdated();

    this.dashboardForm.controls.select_station.setValue("");

    this.getStation();
  }

  forceUpdated() {
    var app_version;

    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        app_version = versionNumber;

        console.log(app_version);

        let req = {
          user_id: this.userlist.userId,
          millcode: this.userlist.millcode,
          dept_id: this.userlist.dept_id,
          language: this.languageService.selected,
        };

        this.commonservice.getSettings(req).then((result) => {
          var resultdata: any;
          resultdata = result;
          let updateVersion = resultdata.appVersion;
          let logout = resultdata.islogOut;

          if (typeof logout !== "undefined" && logout !== null) {
            if (logout == 1) {
              this.notifi.logoutupdateNotification();
              localStorage.clear();
              this.router.navigate(["/login"], { replaceUrl: true });
            } else {
              if (updateVersion > app_version) {
                this.alertForce(updateVersion);
              }
            }
          } else {
            if (updateVersion > app_version) {
              this.alertForce(updateVersion);
            }
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async alertForce(app_version) {
    let alert = await this.alertController.create({
      header: this.translate.instant("FORCEUPDATE.header"),
      backdropDismiss: false,
      message: this.translate.instant("FORCEUPDATE.message") + app_version,
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.updatebutton"),
          handler: () => {
            let appId;

            if (this.platform.is("android")) {
              appId = "com.airei.milltracking";
            } else {
              appId = "id1534533301";
            }

            this.market
              .open(appId)
              .then((response) => {
                localStorage.clear();
                this.notifi.logoutupdateNotification();
                this.router.navigate(["/login"], { replaceUrl: true });

                console.debug(response);
              })
              .catch((error) => {
                console.warn(error);
              });
          },
        },
      ],
    });
    alert.present();
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);
    //this.router.navigate(["/segregation-notification"]);
  }

  updateNotification() {
    this.zone.run(() => {
      this.count = parseInt(localStorage.getItem("badge_count"));
    });
  }

  btn_reportnotification() {
    this.router.navigate(["/notification-report"]);
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
      //color = "#4cbb17";
      color = "#008000";
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
      //color ="linear-gradient(to right top, #74d217, #8bd847, #a0dd69, #b4e388, #c6e8a5, #c8e8a8, #cae9ac, #cce9af, #bfe599, #b1e183, #a2dd6c, #93d954)";
    } else if (status == "0") {
      color = "#CB4335";
      //color ="linear-gradient(to right top, #ea2c2c, #ef4444, #f3585a, #f56b6f, #f67d83, #f68086, #f5838a, #f5868d, #f57c81, #f57175, #f46769, #f35c5c)";
    } else {
      color = "#ff9f0c";
    }

    return color;
  }

  getStatusTextColor(status) {
    let color;

    if (status == "1") {
      color = "#ffffff";
    } else if (status == "0") {
      color = "#ffffff";
    } else {
      color = "#000000";
    }

    return color;
  }

  refreshRecords() {
    this.dashboardForm.controls.select_station.setValue("");

    this.getProductionStatus();
  }

  onChangeStation() {
    var searchedstationid = this.dashboardForm.value.select_station;

    var item = this.filterstationsArr.filter(
      (item) => item.stationid === parseInt(searchedstationid)
    );

    if (searchedstationid == "") {
      this.stationsArr = this.filterstationsArr;
    } else {
      this.stationsArr = item;
    }
  }

  getStation() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.service.getStationList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.stationlistArr = resultdata.data;

        this.nomachinesfound = false;

        this.getProductionStatus();
      } else {
        this.stationlistArr = [];

        this.nomachinesfound = true;

        //this.getProductionStatus();
      }
    });
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

        this.millstartdatetime = resultdata.data[0].mill_start_date;
        this.millstopdatetime = resultdata.data[0].mill_stop_date;

        if (this.productionflag == "1") {
          this.txt_millproductionstatus = this.translate.instant(
            "MAINTENANCEDASHBOARD.inoperation"
          );
        } else {
          this.txt_millproductionstatus = this.translate.instant(
            "MAINTENANCEDASHBOARD.stoppedoperation"
          );
        }

        this.getStations();
      } else {
        this.productionflag = "0";

        this.millstartdatetime = "";
        this.millstopdatetime = "";

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

        this.filterstationsArr = this.stationsArr;

        if (this.productionflag == "1") {
          this.uienable = true;
        } else {
          this.uienable = true;
        }

        this.pleasewaitflag = false;
      } else {
        this.stationsArr = [];

        this.filterstationsArr = this.stationsArr;

        this.uienable = false;

        this.pleasewaitflag = false;
      }
    });
  }

  btn_Action(value) {
    this.router.navigate([
      "/maintenance-dashboard-correctivemaintenance",
      { item: JSON.stringify(value) },
    ]);
  }

  async callmodalcontroller(value) {
    if (value == "SCHEDULING") {
      const modal = await this.modalController.create({
        component: SchedulePage,
      });

      modal.onDidDismiss().then((data) => {
        this.ionViewDidEnter();
      });

      return await modal.present();
    } else if (value == "WEEKLYREPORT") {
      const modal = await this.modalController.create({
        component: WebviewWeeklyreportPage,
      });

      modal.onDidDismiss().then((data) => {
        this.ionViewDidEnter();
      });

      return await modal.present();
    } else {
      if (this.userdesignation == 2) {
        const modal = await this.modalController.create({
          component: MaintenanceEngineerNotificationModalPage,
          componentProps: {
            item: JSON.stringify(value),
            module: "MAINTENANCE",
          },
          showBackdrop: true,
          backdropDismiss: false,
          cssClass: ["notification-modal"],
        });

        modal.onDidDismiss().then((data) => {
          this.ionViewDidEnter();
        });

        return await modal.present();
      } else if (this.userdesignation != 2) {
        const modal = await this.modalController.create({
          component: MaintenanceNotificationModalPage,
          componentProps: {
            item: JSON.stringify(value),
            module: "MAINTENANCE",
          },
          showBackdrop: true,
          backdropDismiss: false,
          cssClass: ["notification-modal"],
        });

        modal.onDidDismiss().then((data) => {
          this.ionViewDidEnter();
        });

        return await modal.present();
      }
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
