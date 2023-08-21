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
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
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

import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { ProductionFfbcagePage } from "src/app/supervisor-module/production-ffbcage/production-ffbcage.page";
import { ProductionMachineshutdownalertModalPage } from "src/app/supervisor-module/production-machineshutdownalert-modal/production-machineshutdownalert-modal.page";
import { GeneralserviceService } from "src/app/services/generalservice/generalservice.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
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

  pendingcount = 0;
  pendingcountlength = 0;

  productionflag = "0";
  breakdownflag = 0;

  uienable = false;
  pleasewaitflag = false;
  nomachinesfound = false;

  stationlistArr = [];
  stationsArr = [];
  txt_millproductionstatus = "";
  txt_millstartstop = "";
  millstartdatetime = "";
  millstopdatetime = "";

  breakdownreason = "";

  // FFB Cages
  ffbcageenableflag = 0;
  ffbtotal = "";
  ffbinuse = "";
  ffbnotinuse = "";
  ffbunderrepair = "";

  filterTerm: string;
  getplatform: string;

  searchedstationid = "";

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
    private animationCtrl: AnimationController,
    private screenOrientation: ScreenOrientation,
    private generalservice: GeneralserviceService

  ) {
    this.dashboardForm = this.fb.group({
      select_station: new FormControl(""),
      //txt_millproductionstatus: new FormControl("", Validators.required),
    });

    this.activatedroute.params.subscribe((val) => {
      if (this.platform.is("android")) {
        this.getplatform = "android";
      } else if (this.platform.is("ios")) {
        this.getplatform = "ios";
      }

      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      );

      if (
        this.userdesignation == 2 ||
        this.userdesignation == 4 ||
        this.userdesignation == 6
      ) {
        this.getMaintenancePendingCount();
      }
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
    this.forceUpdated();
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
              appId = "com.airei.milltracking.mypalm.mikk";
            } else {
              appId = "id1573914314";
            }

            this.market
              .open(appId)
              .then((response) => {
                /*this.notifi.logoutupdateNotification();
                localStorage.clear();
                this.router.navigate(["/login"], { replaceUrl: true });*/
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
    if (this.userdesignation != 4 && this.userdesignation != 6) {
      localStorage.setItem("badge_count", "0");
      this.router.navigate(["/segregatenotification"]);
    }

    /*localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);*/
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

        if (
          this.userdesignation == 2 ||
          this.userdesignation == 4 ||
          this.userdesignation == 6
        ) {
          this.getMaintenancePendingCount();

          setTimeout(() => {
            this.getStation();
          }, 2000);
        }
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

  getBackGroundColor(machinestatus, breakdownstatus) {
    let color;
    if (machinestatus == "0") {
      if (breakdownstatus == "0") {
        color = "#4d4d4d";
      } else {
        color = "#CB4335";
      }
    } else if (machinestatus == "1") {
      color = "#008000";
    } else if (machinestatus == "2") {
      color = "#ff9f0c";
    } else {
      color = "#4d4d4d";
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
    //this.dashboardForm.controls.select_station.setValue("");

    this.getProductionStatus();
  }

  getMaintenancePendingCount() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    console.log(req);

    this.commonservice.getmaintenancependingcount(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.pendingcount = resultdata.count;
        this.pendingcountlength = this.pendingcount.toString().length;
      } else {
        this.pendingcount = 0;
        this.pendingcountlength = this.pendingcount.toString().length;
      }
    });
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

        this.getProductionStatus();
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
        this.breakdownflag = resultdata.data[0].breakdownflag;

        this.millstartdatetime = resultdata.data[0].mill_start_date;
        this.millstopdatetime = resultdata.data[0].mill_stop_date;
        this.breakdownreason = resultdata.data[0].breakdownreason;

        this.ffbcageenableflag = resultdata.data[0].ffbcageenableflag;
        this.ffbtotal = resultdata.data[0].ffbcagestotal;
        this.ffbinuse = resultdata.data[0].ffbcagesinuse;
        this.ffbnotinuse = resultdata.data[0].ffbcagesnotinuse;
        this.ffbunderrepair = resultdata.data[0].ffbcagesunderrepair;

        if (this.productionflag == "1") {

          this.txt_millproductionstatus = this.translate.instant("MAINTENANCEDASHBOARD.inoperation");
          this.txt_millstartstop = this.translate.instant("MAINTENANCEDASHBOARD.millstartdatetime");
        } else if (this.productionflag == "0") {
          if (this.breakdownflag == 1) {
            this.txt_millproductionstatus = this.translate.instant("MAINTENANCEDASHBOARD.stoppedoperation");
            this.txt_millstartstop = this.translate.instant("MAINTENANCEDASHBOARD.stoppedbreakdownoperation");
          } else {
            this.txt_millproductionstatus = this.translate.instant("MAINTENANCEDASHBOARD.stoppedoperation");
            this.txt_millstartstop = this.translate.instant("MAINTENANCEDASHBOARD.millstopdatetime");
          }
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

    this.service.getProductionStaionsBoiler(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.stationsArr = resultdata.data;
        
        if (this.productionflag == "1") {
          this.uienable = true;
        } else {
          this.uienable = true;
        }
        this.pleasewaitflag = false;
      } else {
        this.stationsArr = [];

        this.uienable = false;

        this.pleasewaitflag = false;
      }
    });
  }

  btn_Action(stationid, stationname, item) {

    if (this.productionflag == "1") {
      if (item.breakdownstatus == 0) {
        this.popupmodalcontroller(stationid, stationname, item);
      } else {
        this.alreadybreakdownalert(stationid, stationname, item);
      }
    } else {
      if (item.breakdownstatus == 0) {
        this.popupmodalcontroller(stationid, stationname, item);
      } else {
        this.alreadybreakdownalert(stationid, stationname, item);
      }
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }

  async alreadybreakdownalert(stationid, stationname, item) {
    let machine = item.machinename;
    let alertmessage =
      machine +
      this.translate.instant(
        "SUPERVISORDASHBOARD.alreadybreakdownalertmessage"
      );

    const alert = await this.alertController.create({
      mode: "md",
      header: this.translate.instant(
        "SUPERVISORDASHBOARD.alreadybreakdownalerttitle"
      ),
      cssClass: "customalertmessageonebuttons",
      message: alertmessage,
      buttons: [
        {
          text: "",
          handler: () => {
            //console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }
  async popupmodalcontroller(getstationid, getstationname, value) {
    const modal = await this.modalController.create({
      component: ProductionMachineshutdownalertModalPage,
      componentProps: {
        item: JSON.stringify(value),
        stationid: getstationid,
        stationname: getstationname,
        millstatus: this.productionflag,
        module: "CM",
      },
      showBackdrop: true,
      backdropDismiss: false,
      cssClass: ["acknowledgement-modal"],
    });

    modal.onDidDismiss().then((modeldata) => {
      let breakdownid = modeldata["data"]["breakdown_id"];
      let maintenancetypeid = modeldata["data"]["maintenancetype_id"];
      let partid = modeldata["data"]["part_id"];
      let otherpartname = modeldata["data"]["otherpart_name"];
      let breakdowncauses = modeldata["data"]["breakdowncauses_id"];
      let breakdownremarks = modeldata["data"]["breakdownremarks"];
      let notinuseremarks = modeldata["data"]["notinuseremarks"];

      if (
        typeof breakdownid !== "undefined" &&
        typeof maintenancetypeid !== "undefined" &&
        typeof partid !== "undefined" &&
        typeof breakdowncauses !== "undefined"
      ) {
        //this.dashboardForm.controls.select_station.setValue("");

        this.problemalertmessage(
          getstationid,
          getstationname,
          value,
          breakdownid,
          maintenancetypeid,
          partid,
          otherpartname,
          breakdowncauses,
          breakdownremarks,
          notinuseremarks
        );
      }
    });

    return await modal.present();
  }

  async ffbcagemodalcontroller() {
    const modal = await this.modalController.create({
      component: ProductionFfbcagePage,
      componentProps: {
        ffbcagetotal: this.ffbtotal,
        ffbcageinuse: this.ffbinuse,
        ffbcagenotinuse: this.ffbnotinuse,
        ffbcageunderrepair: this.ffbunderrepair,
        millstatus: this.productionflag,
      },
      showBackdrop: true,
      backdropDismiss: false,
      cssClass: ["ffbcagepopup-modal"],
    });

    modal.onDidDismiss().then((modeldata) => {
      let getdata = modeldata["data"]["item"];

      if (getdata != "") {
        this.getProductionStatus();
      }
    });

    return await modal.present();
  }
  async problemalertmessage(
    station_id,
    station_name,
    value,
    breakdown_id,
    maintenancetype_id,
    part_id,
    otherpart_name,
    breakdown_causes,
    breakdown_remarks,
    notinuse_remarks
  ) {
    //console.log("breakdownid:", breakdown_id);

    if (breakdown_id == 1 || breakdown_id == 2) {
      var alertmessage =
        this.translate.instant(
          "SUPERVISORDASHBOARD.correctivemaintenancecreated"
        ) + value.machinename;

      const alert = await this.alertController.create({
        mode: "md",
        header: this.translate.instant("SUPERVISORDASHBOARD.reportsubmitted"),
        cssClass: "customalertmessageonebuttons",
        message: alertmessage,
        backdropDismiss: false,
        buttons: [
          {
            text: "",
            handler: () => {
              this.updateMachineStatus(
                station_id,
                station_name,
                value,
                breakdown_id,
                maintenancetype_id,
                part_id,
                otherpart_name,
                breakdown_causes,
                breakdown_remarks,
                notinuse_remarks
              );
            },
          },
        ],
      });

      await alert.present();
    } else if (breakdown_id == 0 || breakdown_id == 3) {
      this.updateMachineStatus(
        station_id,
        station_name,
        value,
        breakdown_id,
        maintenancetype_id,
        part_id,
        otherpart_name,
        breakdown_causes,
        breakdown_remarks,
        notinuse_remarks
      );
    }
  }
  updateMachineStatus(
    stationid,
    stationname,
    item,
    getproblem,
    getmaintenancetype,
    getpart,
    getotherpartname,
    getbreakdowncauses,
    getbreakdownremarks,
    getnotinuseremarks
  ) {
    var currentmachinestatus;
    var settype;

    if (item.machinestatus == 0) {
      currentmachinestatus = 1;
    } else {
      currentmachinestatus = 0;
    }

    if (this.productionflag == "1") {
      settype = "1";
    } else {
      settype = "6";
    }

    if (!this.pleasewaitflag) {
      this.pleasewaitflag = true;
    }

    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      stationid: item.stationid,
      machineid: item.machineid,
      machinestatus: Number(currentmachinestatus),
      reason: getproblem,
      maintenancetype: getmaintenancetype,
      part_defect: getpart,
      other_part_name: getotherpartname,
      breakdown_cause: getbreakdowncauses,
      remarks: getbreakdownremarks,
      notinuseremarks: getnotinuseremarks,
      language: this.languageService.selected,
      type: settype,
      ffbcagestatus: item.ffbcageflag,
      millstatus: this.productionflag,
    };

    console.log(req);

    this.service.saveMachineStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        if (item.ffbcageflag) {
          this.refreshFFBStatus();
        } else {
          this.getStations();
        }
      } else if (resultdata.httpcode == 401) {
        this.pleasewaitflag = false;

        this.alreadybreakdownalert(stationid, stationname, item);
      }
    });
  }
  refreshFFBStatus() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };
    //console.log(req);
    this.service.getProductionStartStopStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.ffbtotal = resultdata.data[0].ffbcagestotal;
        this.ffbinuse = resultdata.data[0].ffbcagesinuse;
        this.ffbnotinuse = resultdata.data[0].ffbcagesnotinuse;
        this.ffbunderrepair = resultdata.data[0].ffbcagesunderrepair;

        this.getStations();
      } else {
        this.ffbtotal = "";
        this.ffbinuse = "";
        this.ffbnotinuse = "";
        this.ffbunderrepair = "";

        this.getStations();
      }
    });
  }
  confirmStation(stationid, stationname, stationstatus) {
    let alertmessage = "";

    if (stationstatus == 0) {
      /*Commented by suresh as said by vignesh MG-547
      alertmessage =
        stationname +
        " running hours are monitored when the machinery tabs are green in color.<br><br>" +
        "Kindly tap the button if the machinery are switched off. This will turn the tab into red in color and running hours will not be monitored.";*/
      alertmessage =
        this.translate.instant("SUPERVISORDASHBOARD.themachineriesunder") +
        stationname +
        this.translate.instant("SUPERVISORDASHBOARD.machineoff");

      this.alertController
        .create({
          header: this.translate.instant("SUPERVISORDASHBOARD.machineheader"),
          message: alertmessage,
          cssClass: "customalertmessagetwobuttons",
          backdropDismiss: false,
          buttons: [
            {
              //text: this.translate.instant("SUPERVISORDASHBOARD.cancel"),
              text: "",
              role: "cancel",
              cssClass: "cancelbutton",
              handler: (cancel) => {
                //console.log("Confirm Cancel");
              },
            },
            {
              //text: this.translate.instant("SUPERVISORDASHBOARD.okay"),
              text: "",
              //cssClass: "okaybutton",
              handler: () => {
                this.startstopMachines(stationid, stationname, stationstatus);
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    } else {
      alertmessage =
        this.translate.instant("SUPERVISORDASHBOARD.machinealert") +
        stationname +
        "?";

      this.alertController
        .create({
          header: this.translate.instant("SUPERVISORDASHBOARD.machineheader"),
          message: alertmessage,
          cssClass: "customalertmessagetwobuttons",
          backdropDismiss: false,
          buttons: [
            {
              //text: this.translate.instant("SUPERVISORDASHBOARD.no"),
              text: "",
              cssClass: "cancelbutton",
              handler: () => {},
            },
            {
              //text: this.translate.instant("SUPERVISORDASHBOARD.yes"),
              text: "",
              //cssClass: "okaybutton",
              handler: () => {
                this.startstopMachines(stationid, stationname, stationstatus);
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    }
  }
  startstopMachines(stationid, stationname, stationstatus) {
    var req;

    var station_status = 0;

    if (stationstatus == 0) {
      station_status = 1;
    }

    if (stationstatus == 1) {
      station_status = 0;
    }

    if (!this.pleasewaitflag) {
      this.pleasewaitflag = true;
    }

    req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      productionstatus: station_status,
      stationid: stationid,
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.startstopProductionStation(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        if (station_status == 1) {
          this.commonservice.presentToast(
            stationname +
              this.translate.instant("SUPERVISORDASHBOARD.startedsuccessfully")
          );
        } else {
          this.commonservice.presentToast(
            stationname +
              this.translate.instant("SUPERVISORDASHBOARD.stoppedsuccessfully")
          );
        }

        this.getStations();
      } else {
        this.pleasewaitflag = false;

        this.commonservice.presentToast(
          this.translate.instant("SUPERVISORDASHBOARD.productionstartfailed")
        );
      }
    });
  }
}
