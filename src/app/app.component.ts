import { Component, OnInit } from "@angular/core";
import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { LanguageService } from "./services/language-service/language.service";
import { Badge } from "@ionic-native/badge/ngx";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
const { PushNotifications, Network } = Plugins;
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';

import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Inbox",
      url: "/folder/Inbox",
      icon: "mail",
    },
    {
      title: "Outbox",
      url: "/folder/Outbox",
      icon: "paper-plane",
    },
    {
      title: "Favorites",
      url: "/folder/Favorites",
      icon: "heart",
    },
    {
      title: "Archived",
      url: "/folder/Archived",
      icon: "archive",
    },
    {
      title: "Trash",
      url: "/folder/Trash",
      icon: "trash",
    },
    {
      title: "Spam",
      url: "/folder/Spam",
      icon: "warning",
    },
  ];

  constructor(
    private commonservice: AIREIService,
    private platform: Platform,
    private alertController: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localNotifications: LocalNotifications,
    private badge: Badge,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.initializeApp();

    this.languageService.setInitialAppLanguage();

    this.badge.clear();

    if (localStorage.getItem("userlist") == null) {
      this.languageService.setInitialAppLanguage();
    } else {
      this.languageService.setLanguage(
        JSON.parse(localStorage.getItem("userlist")).language
      );
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // firebase.initializeApp(environment.firebase);

      this.platform.backButton.subscribeWithPriority(9999, () => {
        // do on back button click
      });

      this.platform.resume.subscribe((result) => {
        //Foreground
      });
      this.platform.pause.subscribe((result) => {
        //Background
      });
    });
  }

  //  getCurrentLocation() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     console.log(resp);
  //     this.service.createVechicleGEO(this.detailValue.ffbTrans_Id, resp.coords);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });

  //   const watch = this.geolocation.watchPosition();
  //   watch.subscribe((data) => {
  //     console.log(data);
  //     this.service.createVechicleGEO(this.detailValue, data.coords);
  //   });
  // }

  ngOnInit() {
    let ref = this;

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }

    Network.addListener("networkStatusChange", function (val) {
      /*if (val.connected) {
        localStorage.setItem("networkconnection", "Connected");
      } else {
        localStorage.setItem("networkconnection", "Not Connected");
        ref.nointernetconnectionalert();
      }*/

      if (val.connected) {
        //ref.commonservice.presentToast("Network Connected");
      } else {
        ref.commonservice.presentToast("Network Disconnected");
        ref.nointernetconnectionalert();
      }
    });

    this.Initialpushnotification();
  }

  Initialpushnotification() {
    //console.log("Initializing HomePage");

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener(
      "registration",
      (token: PushNotificationToken) => {
        localStorage.setItem("push_token", token.value);

        localStorage.setItem("badge_count", "0");
        //alert("Push registration success, token: " + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {
      //alert("Error on registration: " + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      async (notification: PushNotification) => {
        //alert("Push received: " + JSON.stringify(notification));

        var count = parseInt(localStorage.getItem("badge_count"));
        count = count + 1;

        localStorage.setItem("badge_count", String(count));
        // let notif = this.state.notifications;
        // notif.push({ id: notification.id, title: notification.title, body: notification.body })

        this.localNotifications.schedule({
          id: 1,
          text: notification.title,
          foreground: true,
          led: "FF0000",
          data: { secret: "secret" },
        });
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      async (notification: PushNotificationActionPerformed) => {
        let data, redirectpage;

        if (this.platform.is("ios")) {
          //data = notification.notification.data.aps.alert;

          data = notification.notification.data;

          redirectpage = JSON.stringify(data.redirect);
        } else {
          data = notification.notification.data;

          redirectpage = JSON.stringify(data.redirect);
        }

        //alert(redirectpage);

        if (localStorage.getItem("userlist") != null) {
          var designationid = JSON.parse(
            localStorage.getItem("userlist")
          ).desigId;

          if (
            designationid == "3" ||
            designationid == "5" ||
            designationid == "11" ||
            designationid == "7" ||
            designationid == "8" ||
            designationid == "9"
          ) {
            this.router.navigate(["/segregatenotification"]);
          } else if (
            designationid == "2" ||
            designationid == "4" ||
            designationid == "6"
          ) {
            if (redirectpage == '"MAINTENANCE"') {
              this.router.navigate([
                "/segregatenotification/tabmaintenancenotification",
              ]);
            } else {
              this.router.navigate(["/segregatenotification/tabmillstatus"]);
            }
          } else {
            this.router.navigate(["/segregatenotification"]);
          }
        }
      }
    );
  }

  async nointernetconnectionalert() {
    const alert = await this.alertController.create({
      header: this.translate.instant("NETWORKERROR.noconnection"),
      cssClass: "nointernetconnectionalertmessage",
      message: this.translate.instant("NETWORKERROR.errormessage"),
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.okay"),
          handler: () => {
            alert.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }
}
