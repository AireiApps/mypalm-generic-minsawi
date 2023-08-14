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
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";
import { StoreServiceService } from "src/app/services/store-service/store-service.service";
@Component({
  selector: "app-store-dashboard",
  templateUrl: "./store-dashboard.page.html",
  styleUrls: ["./store-dashboard.page.scss"],
})
export class StoreDashboardPage implements OnInit {
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
  getplatform: string;
  uinorecordFlag = true;
  norecordFlag = false;
  newsize;
  newtotalpage;
  recentStore = [];

  department;
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
    private screenOrientation: ScreenOrientation,
    private httpservice: HttpserviceService,
    private storeservices: StoreServiceService
  ) {
    this.activatedroute.params.subscribe((val) => {
      if (this.platform.is("android")) {
        this.getplatform = "android";
      } else if (this.platform.is("ios")) {
        this.getplatform = "ios";
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.httpservice.getContactLogin();
    this.department = this.userlist.department;
    if (this.department == "Store") {
      this.getStoreOrder(true, "0");
    }
  }

  ionViewDidEnter() {
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
    this.forceUpdated();
    if (this.department == "Store") {
      this.getStoreOrder(true, "0");
    }
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

  getStoreOrder(pagerefresh: Boolean, pagenum: string) {
    this.norecordFlag = false;
    this.pleasewaitflag = true;

    if (pagerefresh == true) {
      this.recentStore = [];
    } else {
    }

    let req = {
      department_id: this.userlist.dept_id,
      millcode: this.userlist.millcode,
      page: parseInt(pagenum) + 1,
    };

    console.log(req);

    this.storeservices.getRecentStoreList(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      this.newsize = parseInt(resultdata.size);

      this.newtotalpage = resultdata.total_page * this.newsize;

      console.log("Store Data:", resultdata);

      if (resultdata.httpcode == 200) {
        //this.recentStore = resultdata.data
        if (resultdata.data.length > 0) {
          for (var i = 0; i < resultdata.data.length; i++) {
            this.recentStore.push(resultdata.data[i]);
          }
          this.norecordFlag = false;
        }
        this.pleasewaitflag = false;
      } else {
        this.norecordFlag = true;
        this.pleasewaitflag = false;
      }
    });
  }
  newpagination(event) {
    setTimeout(() => {
      if (this.recentStore.length == this.newtotalpage) {
        event.target.complete();
        return;
      }

      event.target.complete();

      var z = Math.ceil(this.recentStore.length / this.newsize);
      if (this.recentStore.length < this.newtotalpage) {
        this.getStoreOrder(false, String(z));
      }
    }, 500);
  }
  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
  btn_detailAction(value) {
    this.router.navigate([
      "/store-detailsscreen",
      { item: JSON.stringify(value) },
    ]);
  }
  btn_quoteapproval() {
    this.router.navigate(["/store-statusupdate"]);
  }
}
