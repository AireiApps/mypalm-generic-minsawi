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

import { GradingserviceService } from "src/app/services/grading-service/gradingservice.service";

import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

import { Market } from "@ionic-native/market/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

import { GradingVehicleSearchPage } from "src/app/grading-module/grading-vehicle-search/grading-vehicle-search.page";

@Component({
  selector: "app-grading-home",
  templateUrl: "./grading-home.page.html",
  styleUrls: ["./grading-home.page.scss"],
})
export class GradingHomePage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  gradingForm;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  count = 0;

  // Variables
  params;
  receivenewloadFlag = false;
  selectvehicleFlag = true;
  entervehicleFlag = false;
  confirmDisable = false;
  pleasewaitflag = false;
  norecordFlag = false;

  vehicleid;
  vehiclenumber;
  receivenewloadclick = 0;

  gradinglistArr = [];

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private alertController: AlertController,
    private zone: NgZone,
    private notifi: AuthGuardService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private platform: Platform,
    private appVersion: AppVersion,
    private market: Market,
    private animationCtrl: AnimationController,
    private gradingservice: GradingserviceService,
    public vehiclemodalController: ModalController
  ) {
    this.gradingForm = this.fb.group({
      txt_searchvehicle: new FormControl(""),
      txt_vehiclenumber: new FormControl(""),
      txt_hardbunches: new FormControl("", Validators.required),
      txt_underripebunches: new FormControl("", Validators.required),
      txt_ripeness: new FormControl("", Validators.required),
      txt_loosefruits: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(this.myElementRef.nativeElement)
      .duration(1000)
      .fromTo("opacity", "0", "1");

    animation.play();

    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();

    this.getGrading();
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

  getGrading() {
    if (this.receivenewloadclick == 1) {
      this.receivenewloadclick = 0;
      this.receivenewloadFlag = false;
      this.gradingForm.reset();
    }

    this.pleasewaitflag = true;

    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      fromdate: "",
      todate: "",
      language: this.languageService.selected,
    };

    this.gradingservice.getGradingList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.gradinglistArr = resultdata.data;
        this.norecordFlag = false;
        this.pleasewaitflag = false;
      } else {
        this.gradinglistArr = [];
        this.norecordFlag = true;
        this.pleasewaitflag = false;
      }
    });
  }

  btn_receivenewload() {
    this.gradingForm.reset();

    if (this.receivenewloadclick == 0) {
      this.receivenewloadclick = 1;
      this.receivenewloadFlag = true;
    } else {
      this.receivenewloadclick = 0;
      this.receivenewloadFlag = false;
    }

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  btn_save() {
    if (this.gradingForm.valid) {
      var get_vehiclenumber = "";

      if (this.vehicleid != 0) {
        if (this.vehiclenumber != "") {
          get_vehiclenumber = this.vehiclenumber;
        } else {
          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.vehiclenumbermandatory")
          );
          return;
        }
      } else {
        get_vehiclenumber = this.gradingForm.value.txt_vehiclenumber;
      }

      this.confirmDisable = true;

      var req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        dept_id: this.userlist.dept_id,
        design_id: this.userlist.desigId,
        id: 0,
        vehicle_no: get_vehiclenumber,
        hard_bunch_percent: this.gradingForm.value.txt_hardbunches,
        under_ripe_bunch_percent: this.gradingForm.value.txt_underripebunches,
        ripeness_percent: this.gradingForm.value.txt_ripeness,
        loose_fruit_percent: this.gradingForm.value.txt_loosefruits,
        language: this.languageService.selected,
      };

      console.log(req);

      this.gradingservice.saveGrading(req).then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.receivedloadsuccessfully")
          );

          if (this.receivenewloadclick == 0) {
            this.receivenewloadclick = 1;
          } else {
            this.receivenewloadclick = 0;
          }

          this.receivenewloadFlag = false;

          this.getGrading();
        } else {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("GRADINGHOME.receivedloadfailed")
          );
        }
      });
    } else {
      this.commonservice.presentToast(
        this.translate.instant("GENERALBUTTON.pleasefilltheform")
      );
    }
  }

  btn_Action(item) {
    this.router.navigate([item.path]);
  }

  backtoselect() {
    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  async callmodalcontroller(type) {
    if (type == "Vehicle") {
      const vehiclemodal = await this.vehiclemodalController.create({
        component: GradingVehicleSearchPage,
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["vehicle-modal"],
      });

      vehiclemodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;
        this.params = JSON.parse(viewform);
        //console.log(this.params.id);
        if (this.params.id != 0) {
          this.vehicleid = this.params.id;
          this.vehiclenumber = this.params.vehicle_no;

          //console.log(this.vehiclenumber);

          this.gradingForm.controls.txt_searchvehicle.setValue(
            this.vehiclenumber
          );
        } else {
          this.vehicleid = this.params.id;
          this.vehiclenumber = this.params.vehicle_no;

          this.gradingForm.controls.txt_searchvehicle.setValue("");

          this.selectvehicleFlag = false;
          this.entervehicleFlag = true;
        }
      });

      return await vehiclemodal.present();
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }

  alphanumberFilter(event: any) {
    const reg = /^[a-zA-Z0-9\s]{0,15}$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }
}
