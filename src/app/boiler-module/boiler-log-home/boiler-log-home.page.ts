import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BoilerServiceService } from "src/app/services/boiler-service/boiler-service.service";
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";
import { AIREIService } from "src/app/api/api.service";
import { Platform, AlertController } from "@ionic/angular";
import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { ModalController } from "@ionic/angular";

import { OnehourentryPage } from "src/app/boiler-module/onehourentry/onehourentry.page";
import { TwohoursentryPage } from "src/app/boiler-module/twohoursentry/twohoursentry.page";
import { FourhoursentryPage } from "src/app/boiler-module/fourhoursentry/fourhoursentry.page";
import { TwelvehoursentryPage } from "src/app/boiler-module/twelvehoursentry/twelvehoursentry.page";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;
import { LanguageService } from "src/app/services/language-service/language.service";

import { TranslateService } from "@ngx-translate/core";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";

import { GeneralserviceService } from "src/app/services/generalservice/generalservice.service";

@Component({
  selector: "app-boiler-log-home",
  templateUrl: "./boiler-log-home.page.html",
  styleUrls: ["./boiler-log-home.page.scss"],
})
export class BoilerLogHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  mill_name = this.nl2br(this.userlist.millname);

  count = 0;
  productionflag = "0";

  itemsArr = [
    [
      {
        title: this.translate.instant("BOILERLOGENTRY.1hourlog"),
        name: "1 Hour Log",
        path: "/onehourentry",
        imgpath: "../../assets/img/boilerlogentry.png",
      },
      {
        title: this.translate.instant("BOILERLOGENTRY.2hourslog"),
        name: "2 Hours Log",
        path: "/twohoursentry",
        imgpath: "../../assets/img/boilerlogentry.png",
      },
    ],
    [
      {
        title: this.translate.instant("BOILERLOGENTRY.4hourslog"),
        name: "4 Hours Log",
        path: "/fourhoursentry",
        imgpath: "../../assets/img/boilerlogentry.png",
      },
      {
        title: this.translate.instant("BOILERLOGENTRY.12hourslog"),
        name: "12 Hours Log",
        path: "/twelvehoursentry",
        imgpath: "../../assets/img/boilerlogentry.png",
      },
    ],
    [
      {
        title: this.translate.instant("BOILERLOGENTRY.levels"),
        name: "Levels",
        path: "/boilerlevels",
        imgpath: "../../assets/img/boilerlevels.png",
      },
    ],
  ];

  constructor(
    private translate: TranslateService,
    private zone: NgZone,
    private router: Router,
    private fb: FormBuilder,
    private notifi: AuthGuardService,
    private commonservice: AIREIService,
    public modalController: ModalController,
    private supervisorservice: SupervisorService,
    private languageService: LanguageService,
    private generalservice: GeneralserviceService
  ) {
    //generalservice.loginstate = true;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
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

    this.getProductionStatus();
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/notification"]);
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

  btn_Action(item) {
    if(this.productionflag == "1"){
        if ((item.name == "1 Hour Log") || (item.name == "2 Hours Log") || (item.name == "4 Hours Log") || (item.name == "12 Hours Log")) {
          this.callmodalcontroller(item.name);
        }else
        {
          this.router.navigate([item.path]);
        }   
    }else{
      this.commonservice.presentToast("Mill Stopped");
    }
  }
  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
  getProductionStatus() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    this.supervisorservice.getProductionStartStopStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.productionflag = resultdata.data[0].status;
      } else {
        this.productionflag = "0";
      }
    });
  }
  async callmodalcontroller(value) {
    if (value == "1 Hour Log") {
      const modal = await this.modalController.create({
        component: OnehourentryPage
      });

      return await modal.present();
    }

    if (value == "2 Hours Log") {
      const modal = await this.modalController.create({
        component: TwohoursentryPage,
      });

      return await modal.present();
    }

    if (value == "4 Hours Log") {
      const modal = await this.modalController.create({
        component: FourhoursentryPage,
      });

      return await modal.present();
    }

    if (value == "12 Hours Log") {
      const modal = await this.modalController.create({
        component: TwelvehoursentryPage,
      });

      return await modal.present();
    }
  }
}
