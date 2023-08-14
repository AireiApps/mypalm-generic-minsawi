import { Component, OnInit, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { appsettings } from "src/app/appsettings";
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { AIREIService } from "src/app/api/api.service";
import {
  AlertController,
  Platform,
  Animation,
  AnimationController,
  ModalController,
  IonSlides,
} from "@ionic/angular";
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
  selector: "app-tabpay-slip",
  templateUrl: "./tabpay-slip.page.html",
  styleUrls: ["./tabpay-slip.page.scss"],
})
export class TabpaySlipPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  mill_name = this.nl2br(this.userlist.millname);
  baseurl = this.userlist.report_url;
  designationid = this.userlist.desigId;
  count = 0;
  pendingcount = 0;
  pendingcountlength = 0;
  productioncount = 0;
  productioncountlength = 0;

  maintenancecount = 0;
  maintenancecountlength = 0;

  getplatform: string;

  weburl;
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private httpservice: HttpserviceService,
    private zone: NgZone,
    private platform: Platform,
    private commonservice: AIREIService,
    private notifi: AuthGuardService,
    private languageService: LanguageService,

    private screenOrientation: ScreenOrientation
  ) {
    this.activatedroute.params.subscribe((val) => {
      if (this.platform.is("android")) {
        this.getplatform = "android";
      } else if (this.platform.is("ios")) {
        this.getplatform = "ios";
      }

      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );

      this.getUrl();
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getUrl();
  }
  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
    this.getUrl();
  }
  ionViewWillEnter() {
    this.getUrl();
  }
  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }
  updateNotification() {
    this.zone.run(() => {
      this.count = parseInt(localStorage.getItem("badge_count"));

      if (
        this.designationid == 2 ||
        this.designationid == 4 ||
        this.designationid == 6 ||
        this.designationid == 17 ||
        this.designationid == 18 ||
        this.designationid == 9
      ) {
        this.getMaintenancePendingCount();
      }
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

  getMaintenancePendingCount() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    //console.log(req);

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
  btn_notification() {
    localStorage.setItem("badge_count", "0");
    if (
      this.designationid == 9 ||
      this.designationid == 18 ||
      this.designationid == 17
    ) {
      this.router.navigate(["/segregatenotification"]);
    }
  }
  getUrl() {
    let formatedurl =
      this.baseurl + "/index.php/Payslip_mobile?user_id=" + this.user_id;

    console.log(formatedurl);

    this.weburl = formatedurl;
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
