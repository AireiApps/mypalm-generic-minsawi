import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { appsettings } from "src/app/appsettings";
import {
  ModalController,
  AlertController,
  Platform,
  Animation,
  AnimationController,
} from "@ionic/angular";
import * as moment from "moment";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { DateModalPage } from "src/app/supervisor-module/date-modal/date-modal.page";
import { LanguageService } from "src/app/services/language-service/language.service";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  PluginListenerHandle,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications, Network } = Plugins;

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-production-dashboard",
  templateUrl: "./production-dashboard.page.html",
  styleUrls: ["./production-dashboard.page.scss"],
})
export class ProductionDashboardPage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  mill_name = this.nl2br(this.userlist.millname);

  dashboardForm;

  count = 0;

  productionflag = 0;
  productioncount = 0;

  currentdatetime = moment(new Date().toISOString()).format("DD-MM-YYYY HH:mm");

  uienable = true;

  fruithandlingstationArr = [];
  fruithandlinguienableflag = false;
  fruithandlingstation = 0;
  fruithandlingbuttonflag = 0;
  fruithandlingcount = 0;

  threshingstationArr = [];
  threshingstationuienableflag = false;
  threshingstation = 0;
  threshingbuttonflag = 0;
  threshingcount = 0;

  pressingstationArr = [];
  pressingstationuienableflag = false;
  pressingstation = 0;
  pressingbuttonflag = 0;
  pressingcount = 0;

  clarificationstationArr = [];
  clarificationstationuienableflag = false;
  clarificationstation = 0;
  clarificationbuttonflag = 0;
  clarificationcount = 0;

  depericarpingstationArr = [];
  depericarpingstationuienableflag = false;
  depericarpingstation = 0;
  depericarpingbuttonflag = 0;
  depericarpingcount = 0;

  kernelrecoverystationArr = [];
  kernelrecoverystationuienableflag = false;
  kernelrecoverystation = 0;
  kernelrecoverybuttonflag = 0;
  kernelrecoverycount = 0;

  boilerstationArr = [];
  boilerstationuienableflag = false;
  boilerstation = 0;
  boilerbuttonflag = 0;
  boilercount = 0;

  powergenerationArr = [];
  powergenerationuienableflag = false;
  powergeneration = 0;
  powergenerationbuttonflag = 0;
  powergenerationcount = 0;

  administrationArr = [];
  administrationuienableflag = false;
  administration = 0;
  administrationbuttonflag = 0;
  administrationcount = 0;

  sterilisationstationArr = [];
  sterilisationstationuienableflag = false;
  sterilisationstation = 0;
  sterilisationbuttonflag = 0;
  sterilisationcount = 0;

  isDisabled = false;

  productionalerttitle = "";
  startalertmessage = "";
  stopalertmessage = "";
  breakdownalerttitle = "";
  breakdownalertmessage = "";
  reasonplaceholder = "";
  balancecropplaceholder = "";
  reasonalerttitle = "";
  reasonalertmessage = "";
  reasonalertplaceholder = "";

  transactionid = "";
  mill_startdatetime = "";
  mill_stopdatetime = "";
  millstartdatetime = "";
  millstopdatetime = "";

  // Network Check
  networkListener: PluginListenerHandle;
  status: boolean;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    public modalController: ModalController,
    private alertController: AlertController,
    private notifi: AuthGuardService,
    private router: Router,
    private commonservice: AIREIService,
    private fb: FormBuilder,
    private service: SupervisorService,
    private platform: Platform,
    private appVersion: AppVersion,
    private market: Market,
    private animationCtrl: AnimationController
  ) {
    this.dashboardForm = this.fb.group({});
  }

  async ngOnInit() {
    this.networkListener = await Network.addListener(
      "networkStatusChange",
      (status) => {
        console.log("Network status changed", status);
        this.zone.run(() => {
          //this.changeStatus(status);
        });
      }
    );
    const status = await Network.getStatus();
    console.log("Network status:", status);
    //this.changeStatus(status);
    console.log("Network status:", this.status);
  }

  ngAfterViewInit(): void {
    /*PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.forceUpdated();*/

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

    this.getProductionStatus();
    this.getMachineStatus();

    this.forceUpdated();
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
        this.updateNotification();
      }
    );
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);
  }

  btn_reportnotification() {
    this.router.navigate(["/notification-report"]);
  }

  forceUpdated() {
    var app_version;

    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        app_version = versionNumber;

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
      message: this.translate.instant("FORCEUPDATE.message") +
        app_version,
      buttons: [
        {
          text: this.translate.instant("FORCEUPDATE.button"),
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

  getBackGroundColor(status) {
    let color;

    if (status == "1") {
      //color = "#E6FFE6";
      color =
        "linear-gradient(to right top, #74d217, #8bd847, #a0dd69, #b4e388, #c6e8a5, #c8e8a8, #cae9ac, #cce9af, #bfe599, #b1e183, #a2dd6c, #93d954)";
    } else if (status == "0") {
      //color = "#FFBFBF";
      color =
        "linear-gradient(to right top, #ea2c2c, #ef4444, #f3585a, #f56b6f, #f67d83, #f68086, #f5838a, #f5868d, #f57c81, #f57175, #f46769, #f35c5c)";
    } else {
      color = "#F4F4F4";
    }

    return color;
  }

  confirmProduction(value) {
    let alertmessage = "";

    if (value == 0) {
      //alertmessage = "By clicking the green button you are confirming that the mill production has started";
      alertmessage = this.startalertmessage;

      this.alertController
        .create({
          message: alertmessage,
          cssClass: "alertmessage",
          backdropDismiss: false,
          buttons: [
            {
              text: this.translate.instant("GENERALBUTTON.cancelbutton"),
              role: "cancel",
              handler: (cancel) => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: this.translate.instant("GENERALBUTTON.okay"),
              handler: () => {
                this.startstopProduction("");
                console.log("Confirm Okay");
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    } else {
      //alertmessage = "By clicking the red button you are confirming that the mill production has stopped";
      alertmessage = this.stopalertmessage;

      this.alertController
        .create({
          message: alertmessage,
          cssClass: "alertmessage",
          backdropDismiss: false,
          inputs: [
            {
              name: "balancecrop",
              type: "number",
              placeholder: this.balancecropplaceholder,
            },
          ],
          buttons: [
            {
              text: this.translate.instant("GENERALBUTTON.cancelbutton"),
              handler: (data: any) => {},
            },
            {
              text:this.translate.instant("GENERALBUTTON.okay"),
              handler: (data: any) => {
                if (data.balancecrop != "") {
                  this.startstopProduction(data.balancecrop);
                }
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    }
  }

  breakdownalert() {
    //let alertmessage = "Please enter Reason for Breakdown and Balance Crop";
    let alertmessage = this.breakdownalertmessage;

    this.alertController
      .create({
        header: this.breakdownalerttitle,
        message: alertmessage,
        cssClass: "alertmessage",
        backdropDismiss: false,
        inputs: [
          {
            name: "reason",
            type: "textarea",
            cssClass: "alertinput",
            placeholder: this.reasonplaceholder,
          },
          {
            name: "balancecrop",
            type: "number",
            placeholder: this.balancecropplaceholder,
          },
        ],
        buttons: [
          {
            text: this.translate.instant("GENERALBUTTON.cancelbutton"),
            role: "cancel",
            handler: (cancel) => {
              //console.log("Confirm Cancel");
            },
          },
          {
            text: this.translate.instant("GENERALBUTTON.okay"),
            handler: (data: any) => {
              if (data.reason != "" && data.balancecrop != "") {
                this.saveBreakDown(data.reason, data.balancecrop);
              } else {
                return false;
              }
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  startstopProduction(getbalancecrop) {
    if (this.productionflag == 0) {
      this.productioncount = 1;
    }

    if (this.productionflag == 1) {
      this.productioncount = 0;
    }

    var req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      productionstatus: this.productioncount,
      balanceCrop: getbalancecrop,
      language: this.languageService.selected,
    };

    this.service.startstopProduction(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        if (this.productioncount == 1) {
          this.commonservice.presentToast(this.translate.instant("SUPERVISORDASHBOARD.productionstartedsuccessfully"));
        } else {
          this.commonservice.presentToast(this.translate.instant("SUPERVISORDASHBOARD.productionstoppedsuccessfully"));
        }

        this.getProductionStatus();
      } else {
        this.commonservice.presentToast(this.translate.instant("SUPERVISORDASHBOARD.productionstartfailed"));
      }
    });
  }

  confirmMachines(screen, value) {
    let alertmessage = "";

    if (value == 0) {
      alertmessage =
        screen +
        " running hours are monitored when the machinery tabs are green in color.<br><br>" +
        "Kindly tap the button if the machinery are switched off. This will turn the tab into red in color and running hours will not be monitored.";

      this.alertController
        .create({
          header: "ALERT",
          message: alertmessage,
          cssClass: "alertmessage",
          backdropDismiss: false,
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: (cancel) => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: "Okay",
              handler: () => {
                this.startstopMachines(screen);
                console.log("Confirm Okay");
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    } else {
      /*alertmessage = screen + " running hours are monitored when the machinery tabs are green in color.<br><br>"+"Kindly tap the button if the machinery are switched off. This will turn the tab into red in color and running hours will not be monitored.";

      this.alertController
        .create({
          header: "ALERT",
          message: alertmessage,
          cssClass:'alertmessage',
          backdropDismiss: false,
          buttons: [
            {
              text: "Cancel",
              handler: (data: any) => {                
              },
            },
            {
              text: "Okay",
              handler: (data: any) => {
                this.startstopMachines(screen);
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });*/

      this.startstopMachines(screen);
    }
  }

  startstopMachines(screen) {
    var req;

    if (screen == "Fruit handling station") {
      if (this.fruithandlingbuttonflag == 0) {
        this.fruithandlingcount = 1;
      }

      if (this.fruithandlingbuttonflag == 1) {
        this.fruithandlingcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.fruithandlingcount,
        stationid: this.fruithandlingstation,
        language: this.languageService.selected,
      };
    } else if (screen == "Threshing station") {
      if (this.threshingbuttonflag == 0) {
        this.threshingcount = 1;
      }

      if (this.threshingbuttonflag == 1) {
        this.threshingcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.threshingcount,
        stationid: this.threshingstation,
        language: this.languageService.selected,
      };
    } else if (screen == "Pressing station") {
      if (this.pressingbuttonflag == 0) {
        this.pressingcount = 1;
      }

      if (this.pressingbuttonflag == 1) {
        this.pressingcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.pressingcount,
        stationid: this.pressingstation,
        language: this.languageService.selected,
      };
    } else if (screen == "Clarification station") {
      if (this.clarificationbuttonflag == 0) {
        this.clarificationcount = 1;
      }

      if (this.clarificationbuttonflag == 1) {
        this.clarificationcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.clarificationcount,
        stationid: this.clarificationstation,
        language: this.languageService.selected,
      };
    } else if (screen == "Depericarping station") {
      if (this.depericarpingbuttonflag == 0) {
        this.depericarpingcount = 1;
      }

      if (this.depericarpingbuttonflag == 1) {
        this.depericarpingcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.depericarpingcount,
        stationid: this.depericarpingstation,
        language: this.languageService.selected,
      };
    } else if (screen == "Kernel recovery station") {
      if (this.kernelrecoverybuttonflag == 0) {
        this.kernelrecoverycount = 1;
      }

      if (this.kernelrecoverybuttonflag == 1) {
        this.kernelrecoverycount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.kernelrecoverycount,
        stationid: this.kernelrecoverystation,
        language: this.languageService.selected,
      };
    } else if (screen == "Boiler station") {
      if (this.boilerbuttonflag == 0) {
        this.boilercount = 1;
      }

      if (this.boilerbuttonflag == 1) {
        this.boilercount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.boilercount,
        stationid: this.boilerstation,
        language: this.languageService.selected,
      };
    } else if (screen == "Power generation") {
      if (this.powergenerationbuttonflag == 0) {
        this.powergenerationcount = 1;
      }

      if (this.powergenerationbuttonflag == 1) {
        this.powergenerationcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.powergenerationcount,
        stationid: this.powergeneration,
        language: this.languageService.selected,
      };
    } else if (screen == "Administration") {
      if (this.administrationbuttonflag == 0) {
        this.administrationcount = 1;
      }

      if (this.administrationbuttonflag == 1) {
        this.administrationcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.administrationcount,
        stationid: this.administration,
        language: this.languageService.selected,
      };
    } else if (screen == "Sterilisation station") {
      if (this.sterilisationbuttonflag == 0) {
        this.sterilisationcount = 1;
      }

      if (this.sterilisationbuttonflag == 1) {
        this.sterilisationcount = 0;
      }

      req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        designationid: this.userlist.desigId,
        millcode: this.userlist.millcode,
        productionstatus: this.sterilisationcount,
        stationid: this.sterilisationstation,
        language: this.languageService.selected,
      };
    }

    console.log(req);

    this.service.startstopProductionStation(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        if (screen == "Fruit handling station") {
          if (this.fruithandlingcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Threshing station") {
          if (this.threshingcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Pressing station") {
          if (this.pressingcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Clarification station") {
          if (this.clarificationcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Depericarping station") {
          if (this.depericarpingcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Kernel recovery station") {
          if (this.kernelrecoverycount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Boiler station") {
          if (this.boilercount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Power generation") {
          if (this.powergenerationcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Administration") {
          if (this.administrationcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        } else if (screen == "Sterilisation station") {
          if (this.sterilisationcount == 1) {
            this.commonservice.presentToast(screen + " Started Successfully!");
          } else {
            this.commonservice.presentToast(screen + " Stopped Successfully!");
          }
        }

        this.getMachineStatus();
      } else {
        this.commonservice.presentToast("Production Start Failed!");
      }
    });
  }

  getProductionStatus() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getProductionStartStopStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.transactionid = resultdata.data[0].id;
        this.productionflag = resultdata.data[0].status;

        this.mill_startdatetime = resultdata.data[0].start_date;
        this.mill_stopdatetime = resultdata.data[0].stop_date;

        this.millstartdatetime = resultdata.data[0].mill_start_date;
        this.millstopdatetime = resultdata.data[0].mill_stop_date;

        this.productionalerttitle = resultdata.productionalerttitle;
        this.startalertmessage = resultdata.startalertmessage;
        this.stopalertmessage = resultdata.stopalertmessage;
        this.breakdownalerttitle = resultdata.breakdownalerttitle;
        this.breakdownalertmessage = resultdata.breakdownalertmessage;
        this.reasonplaceholder = resultdata.reasonplaceholder;
        this.balancecropplaceholder = resultdata.balancecropplaceholder;
        this.reasonalerttitle = resultdata.reasonalerttitle;
        this.reasonalertmessage = resultdata.reasonalertmessage;
        this.reasonalertplaceholder = resultdata.reasonplaceholder;

        if (this.productionflag == 1) {
          this.uienable = true;
          this.isDisabled = false;
        } else {
          this.uienable = false;
          this.isDisabled = true;
        }

        this.getMachineStatus();

        //this.getDashboardDetails();
      } else {
        this.productionflag = 0;

        this.productionalerttitle = "Amaran";
        this.startalertmessage =
          "Dengan mengklik butang hijau anda mengesahkan bahawa pengeluaran kilang telah bermula";
        this.stopalertmessage =
          "Dengan mengklik butang merah anda mengesahkan bahawa pengeluaran kilang telah berhenti";
        this.breakdownalerttitle = "Amaran";
        this.breakdownalertmessage =
          "Sila masukkan sebab breakdown dan baki buah FFB";
        this.reasonplaceholder = "Sebab Kerosakan";
        this.balancecropplaceholder = "Tanaman Imbangan";
        this.reasonalerttitle = "Masukkan sebab";
        this.reasonalertmessage = "Sila berikan sebab untuk menghentikan";
        this.reasonalertplaceholder = "sebab";

        this.uienable = false;
        this.isDisabled = true;

        this.getMachineStatus();

        //this.getDashboardDetails();
      }

      //console.log(this.fruithandlingbuttonflag);
    });
  }

  getMachineStatus() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getMachineStartStopStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.fruithandlingbuttonflag =
          resultdata.data[0].fruithandlingstationstatus;
        this.threshingbuttonflag = resultdata.data[0].threshingstationstatus;
        this.pressingbuttonflag = resultdata.data[0].pressingstationstatus;
        this.clarificationbuttonflag =
          resultdata.data[0].clarificationstationstatus;
        this.depericarpingbuttonflag =
          resultdata.data[0].depericarpingstationstatus;
        this.kernelrecoverybuttonflag =
          resultdata.data[0].kernelrecoverystationstatus;
        this.boilerbuttonflag = resultdata.data[0].boilerstationstatus;
        this.powergenerationbuttonflag =
          resultdata.data[0].powergenerationstatus;
        this.administrationbuttonflag = resultdata.data[0].administrationstatus;
        this.sterilisationbuttonflag =
          resultdata.data[0].sterilisationstationstatus;

        this.getDashboardDetails();
      } else {
        this.fruithandlingbuttonflag = 0;
        this.threshingbuttonflag = 0;
        this.pressingbuttonflag = 0;
        this.clarificationbuttonflag = 0;
        this.depericarpingbuttonflag = 0;
        this.kernelrecoverybuttonflag = 0;
        this.boilerbuttonflag = 0;
        this.powergenerationbuttonflag = 0;
        this.administrationbuttonflag = 0;
        this.sterilisationbuttonflag = 0;

        this.getDashboardDetails();
      }

      //console.log(this.fruithandlingbuttonflag);
    });
  }

  getDashboardDetails() {
    const req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getProductionDashboardDetails(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        /*Fruit Handling Station*/
        this.fruithandlingstationArr = resultdata.data.fruithandlingstation;

        if (this.fruithandlingstationArr.length > 0) {
          this.fruithandlinguienableflag = true;
          this.fruithandlingstation =
            this.fruithandlingstationArr[0][0].station_id;
        } else {
          this.fruithandlinguienableflag = false;
          this.fruithandlingstation = 0;
        }

        /*Threshing Station*/
        this.threshingstationArr = resultdata.data.threshingstation;

        if (this.threshingstationArr.length > 0) {
          this.threshingstationuienableflag = true;
          this.threshingstation = this.threshingstationArr[0][0].station_id;
        } else {
          this.threshingstationuienableflag = false;
          this.threshingstation = 0;
        }

        /*Pressing Station*/
        this.pressingstationArr = resultdata.data.pressingstation;

        if (this.pressingstationArr.length > 0) {
          this.pressingstationuienableflag = true;
          this.pressingstation = this.pressingstationArr[0][0].station_id;
        } else {
          this.pressingstationuienableflag = false;
          this.pressingstation = 0;
        }

        /*Clarification Station*/
        this.clarificationstationArr = resultdata.data.clarificationstation;

        if (this.clarificationstationArr.length > 0) {
          this.clarificationstationuienableflag = true;
          this.clarificationstation =
            this.clarificationstationArr[0][0].station_id;
        } else {
          this.clarificationstationuienableflag = false;
          this.clarificationstation = 0;
        }

        /*Depericarping Station*/
        this.depericarpingstationArr = resultdata.data.depericarpingstation;

        if (this.depericarpingstationArr.length > 0) {
          this.depericarpingstationuienableflag = true;
          this.depericarpingstation =
            this.depericarpingstationArr[0][0].station_id;
        } else {
          this.depericarpingstationuienableflag = false;
          this.depericarpingstation = 0;
        }

        /*Kernal Recovery Station*/
        this.kernelrecoverystationArr = resultdata.data.kernelrecoverystation;

        if (this.kernelrecoverystationArr.length > 0) {
          this.kernelrecoverystationuienableflag = true;
          this.kernelrecoverystation =
            this.kernelrecoverystationArr[0][0].station_id;
        } else {
          this.kernelrecoverystationuienableflag = false;
          this.kernelrecoverystation = 0;
        }

        /*Boiler Station*/
        this.boilerstationArr = resultdata.data.boilerstation;

        if (this.boilerstationArr.length > 0) {
          this.boilerstationuienableflag = true;
          this.boilerstation = this.boilerstationArr[0][0].station_id;
        } else {
          this.boilerstationuienableflag = false;
          this.boilerstation = 0;
        }

        /*Power Generation*/
        this.powergenerationArr = resultdata.data.powergeneration;

        if (this.powergenerationArr.length > 0) {
          this.powergenerationuienableflag = true;
          this.powergeneration = this.powergenerationArr[0][0].station_id;
        } else {
          this.powergenerationuienableflag = false;
          this.powergeneration = 0;
        }

        /*Administration*/
        this.administrationArr = resultdata.data.administration;

        if (this.administrationArr.length > 0) {
          this.administrationuienableflag = true;
          this.administration = this.administrationArr[0][0].station_id;
        } else {
          this.administrationuienableflag = false;
          this.administration = 0;
        }

        /*Sterilisation Station*/
        this.sterilisationstationArr = resultdata.data.sterilisationstation;

        if (this.sterilisationstationArr.length > 0) {
          this.sterilisationstationuienableflag = true;
          this.sterilisationstation =
            this.sterilisationstationArr[0][0].station_id;
        } else {
          this.sterilisationstationuienableflag = false;
          this.sterilisationstation = 0;
        }
      } else {
        this.fruithandlingstationArr = [];
        this.fruithandlinguienableflag = false;
        this.fruithandlingstation = 0;

        this.threshingstationArr = [];
        this.threshingstationuienableflag = false;
        this.threshingstation = 0;

        this.pressingstationArr = [];
        this.pressingstationuienableflag = false;
        this.pressingstation = 0;

        this.clarificationstationArr = [];
        this.clarificationstationuienableflag = false;
        this.clarificationstation = 0;

        this.depericarpingstationArr = [];
        this.depericarpingstationuienableflag = false;
        this.depericarpingstation = 0;

        this.kernelrecoverystationArr = [];
        this.kernelrecoverystationuienableflag = false;
        this.kernelrecoverystation = 0;

        this.boilerstationArr = [];
        this.boilerstationuienableflag = false;
        this.boilerstation = 0;

        this.powergenerationArr = [];
        this.powergenerationuienableflag = false;
        this.powergeneration = 0;

        this.administrationArr = [];
        this.administrationuienableflag = false;
        this.administration = 0;

        this.sterilisationstationArr = [];
        this.sterilisationstationuienableflag = false;
        this.sterilisationstation = 0;
      }
    });
  }

  updateMachineStatus(screen, value, getreason) {
    var currentmachinestatus;

    if (value.status == "0") {
      currentmachinestatus = "1";
    } else {
      currentmachinestatus = "0";
    }

    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      id: value.id,
      stationid: value.station_id,
      machineid: value.machine_id,
      machinestatus: Number(currentmachinestatus),
      reason: getreason,
      type: "1",
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.saveMachineStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        //this.getDashboardDetails();
        this.getMachineStatus();
      }
    });
  }

  reasonformachineshutdownalert(screen, item) {
    //console.log(item.machine_name);

    //let alertmessage = "Please enter Reason for Breakdown and Balance Crop";
    let alertmessage = this.reasonalertmessage + " " + item.machine_name;

    this.alertController
      .create({
        header: this.reasonalerttitle,
        message: alertmessage,
        cssClass: "managerdashboardmessage",
        backdropDismiss: false,
        inputs: [
          {
            name: "reason",
            type: "textarea",
            cssClass: "alertinput",
            placeholder: this.reasonalertplaceholder,
          },
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (cancel) => {
              //console.log("Confirm Cancel");
            },
          },
          {
            text: "Okay",
            handler: (data: any) => {
              if (data.reason != "") {
                //console.log(data.reason);
                this.updateMachineStatus(screen, item, data.reason);
              } else {
                return false;
              }
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  btn_Action(screen, item) {
    //console.log(item.status);

    /*Individual Machine trying to make it off from status=1 to status=0*/
    if (item.status == 1) {
      this.reasonformachineshutdownalert(screen, item);
    } else {
      /*Individual Machine trying to make it off from status=0 to status=1*/
      this.updateMachineStatus(screen, item, "");
    }
  }

  saveBreakDown(getreason, getbalancecrop) {
    const req = {
      user_id: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      remarks: getreason,
      balanceCrop: getbalancecrop,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.saveBreakDownStatus(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast("Breakdown Saved Successfully!");

        this.getProductionStatus();
      } else {
        this.commonservice.presentToast("Breakdown Saving Failed!");
      }
    });
  }

  async changemillstartstopdatetime(value) {
    if (value != "") {
      const modal = await this.modalController.create({
        component: DateModalPage,
        componentProps: {
          millstart_datetime: this.mill_startdatetime,
          millstop_datetime: this.mill_stopdatetime,
          productionstatus: this.productionflag,
          id: this.transactionid,
        },
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["date-modal"],
      });

      modal.onDidDismiss().then((data) => {
        this.getProductionStatus();
      });

      return await modal.present();
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
