import { Component, OnInit, NgZone } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-production-hourlyreporting",
  templateUrl: "./production-hourlyreporting.page.html",
  styleUrls: ["./production-hourlyreporting.page.scss"],
})
export class ProductionHourlyreportingPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  count = 0;

  productionhourlyreportingArr = [
    [
      {
        title: this.translate.instant(
          "HOURLYPRESSINGREPORTING.pressingstation"
        ),
        name: "Pressing Station",
        path: "/production-hourlypressingstation",
        imgpath: "../../assets/img/pressingstation.png",
      },
      {
        title: this.translate.instant(
          "HOURLYPRESSINGREPORTING.sterilizationstation"
        ),
        name: "Sterilization Station",
        path: "/production-hourlysterilizerstation",
        imgpath: "../../assets/img/sterilisationstation.png",
      },
    ],
    /*[
      {
        title: this.translate.instant("HOURLYPRESSINGREPORTING.kernelstation"),
        name: "Kernel Station",
        path: "/maintenance-report",
        imgpath: "../../assets/img/kernalrecoverystation.png",
      },
    ],
    [
      {
        title: this.translate.instant(
          "HOURLYPRESSINGREPORTING.clarificationstation"
        ),
        name: "Clarification Station",
        path: "/maintenance-report",
        imgpath: "../../assets/img/clarificationstation.png",
      },
    ],*/
  ];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    private notifi: AuthGuardService,
    private router: Router,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  ionViewDidEnter() {
    //this.getPerformanceDetails();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
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

  btn_Action(item) {
    this.router.navigate([item.path]);

    /*if (
      item.name == "Pressing Station" ||
      item.name == "Sterilization Station"
    ) {
      this.router.navigate([item.path]);
    } else {
      this.commonservice.presentToast("Feature to be Upgraded");
    }*/
  }
}
