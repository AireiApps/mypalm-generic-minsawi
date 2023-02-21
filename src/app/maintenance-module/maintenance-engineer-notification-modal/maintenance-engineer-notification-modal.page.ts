import { Component, OnInit, ViewChild } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  Platform,
  ModalController,
  NavParams,
  AlertController,
  IonSelect,
} from "@ionic/angular";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";

// Custom Date Picker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
import { Plugins } from "@capacitor/core";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

import { MaintenanceMaterialsearchPage } from "src/app/maintenance-module/maintenance-materialsearch/maintenance-materialsearch.page";
import { MaintenanceActivitysearchPage } from "src/app/maintenance-module/maintenance-activitysearch/maintenance-activitysearch.page";

@Component({
  selector: "app-maintenance-engineer-notification-modal",
  templateUrl: "./maintenance-engineer-notification-modal.page.html",
  styleUrls: ["./maintenance-engineer-notification-modal.page.scss"],
})
export class MaintenanceEngineerNotificationModalPage implements OnInit {
  //@ViewChild("damagetypeSelect", { static: false }) damagetypeRef: IonSelect;
  //@ViewChild("breakdowncausesSelect", { static: false }) breakdowncausesRef: IonSelect;
  @ViewChild("assignedtoSelect", { static: false }) assignedtoRef: IonSelect;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  designationid = this.userlist.desigId;

  step1Form;

  params;

  title = this.translate.instant(
    "CORRECTIVEMAINTENACE.correctivemaintenancenotification"
  );
  module = "";

  breakdownArr = [];
  //maintenancetypeArr = [];
  //damageArr = [];
  //breakdowncausesArr = [];
  activityArr = [];
  assignedtoArr = [];

  // Flags
  stepFlag = true;
  step1completedFlag = false;
  step2completedFlag = false;

  viewFlag = false;

  breakdownFlag = false;
  activityFlag = false;
  otheractivityFlag = false;

  confirmDisable = false;

  // Variables
  getstationid = "";
  getmachineid = "";

  notificationno = "";
  breakdownid = "";
  breakdownvalue = "";

  maintenancetypeid = "";
  maintenancetypevalue = "";

  partid = "";
  partvalue = "";
  partidArr = [];
  partvalueArr = [];

  additionalpartid = "";
  additionalpartvalue = "";
  additionalpartidArr = [];
  additionalpartvalueArr = [];

  damagetypeid = "";
  damagetypevalue = "";
  damagetypeidArr = [];
  damagetypevalueArr = [];

  breakdowncausesid = "";
  breakdowncausesvalue = "";
  breakdowncausesidArr = [];
  breakdowncausesvalueArr = [];

  activityid = "";
  activityvalue = "";
  activityidArr = [];
  activityvalueArr = [];

  // View the details
  view_breakdown = "";
  view_activity = "";

  // Ionic Select Header
  public breakdownOptions: any = {
    header: this.translate.instant(
      "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.problem"
    ),
    cssClass: "singleselect",
  };

  public assignedtoOptions: any = {
    header:
      this.userlist.desigId == 4
        ? this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.fitterlist"
          )
        : this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.wiremanlist"
          ),
    cssClass: "multiselect",
  };

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
    public partmodalController: ModalController,
    public otherpartmodalController: ModalController,
    public activitymodalController: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private commonservice: AIREIService,
    private maintenanceservice: MaintenanceServiceService
  ) {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.modalController.getTop().then((modal) => {
        if (modal != null) {
          return;
        } // Don't go back if there's a modal opened
      });
    });

    let viewform = navParams.get("item");
    this.params = JSON.parse(viewform);

    this.title = this.params.machinename;
    this.module = navParams.get("module");

    console.log(this.module);

    this.getstationid = this.params.stationid;
    this.getmachineid = this.params.machineid;

    this.step1Form = this.fb.group({
      select_breakdown: new FormControl("", Validators.required),
      txt_activityname: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getNotificationNumber();
  }

  getStatusColor(type) {
    let color;

    if (type == "STEP1") {
      if (!this.step1completedFlag) {
        color = "#ff0000";
      } else if (this.step1completedFlag) {
        color = "#008000";
      } else {
        color = "#ff0000";
      }
    } else if (type == "STEP2") {
      if (!this.step2completedFlag) {
        color = "#ff0000";
      } else if (this.step2completedFlag) {
        color = "#008000";
      } else {
        color = "#ff0000";
      }
    } else {
      color = "#ff0000";
    }

    return color;
  }

  getNotificationNumber() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };
    this.maintenanceservice.getSequenceNumber(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.notificationno = resultdata.data[0].workorder;

        this.getBreakdown();
      } else {
        this.getBreakdown();
      }
    });
  }

  getBreakdown() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      type: 2,
      language: this.languageService.selected,
    };

    this.maintenanceservice.getBreakdownCodingList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.breakdownArr = resultdata.data;

        let eachArr = [];

        for (let i = 0; i < this.breakdownArr.length; i++) {
          let eachitem = this.breakdownArr[i];
          let eachreq = {
            id: eachitem.id,
            breakdownCoding: eachitem.breakdownCoding,
            selected: 0,
          };
          eachArr.push(eachreq);

          if (this.breakdownid != "") {
            if (eachitem.id == this.breakdownid) {
              eachArr[i]["selected"] = 1;
            }
          }
        }

        this.breakdownArr = eachArr;

        this.breakdownFlag = true;

        this.activityFlag = true;
      } else {
        this.breakdownArr = [];

        this.breakdownFlag = false;

        this.activityFlag = false;
      }
    });
  }

  breakdownhandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.breakdownid = JSON.parse(value).id;
      this.breakdownvalue = JSON.parse(value).breakdownCoding;

      this.step1completedFlag = true;
      this.getStatusColor("STEP1");
    } else {
      this.breakdownid = "";
      this.breakdownvalue = "";

      this.step1completedFlag = false;
      this.getStatusColor("STEP1");
    }
  }

  btn_next(type) {
    if (type == "STEP1") {
      if (this.step1Form.value.select_breakdown == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.problemmandatory"
          )
        );
        return;
      }

      if (this.activityidArr.length <= 0) {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.activitymandatory"
          )
        );
        return;
      }

      this.view();
    }
  }

  btn_back() {
    this.stepFlag = true;
    this.viewFlag = false;
  }

  btn_add(type) {
    if (type == "Activity") {
      if (this.step1Form.value.txt_activityname == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.activitynamemandatory"
          )
        );
        return;
      }

      this.activityid = "0";

      this.activityidArr.push(this.activityid);

      this.activityvalueArr.push(this.step1Form.value.txt_activityname);

      this.activityvalue = this.nl2br(this.activityvalueArr.join(", "));

      this.otheractivityFlag = false;

      this.step1Form.controls.txt_activityname.setValue("");

      if (this.activityvalue.length > 0) {
        this.step2completedFlag = true;
        this.getStatusColor("STEP2");
      } else {
        if (this.activityvalue.length <= 0) {
          this.step2completedFlag = false;
          this.getStatusColor("STEP2");
        }
      }
    }
  }

  async callmodalcontroller(type) {
    if (type == "Activity") {
      const activitymodal = await this.activitymodalController.create({
        component: MaintenanceActivitysearchPage,
        componentProps: {
          type: "0",
          station_id: this.getstationid,
          equipment_id: this.getmachineid,
        },
      });

      activitymodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          this.activityid = this.params.activity_id;
          this.activityvalue = this.params.activity_name;

          if (this.activityid == "0") {
            this.otheractivityFlag = true;
          } else {
            let activity_validate = false;
            this.otheractivityFlag = false;

            this.step1Form.controls.txt_activityname.setValue("");

            if (this.activityidArr.length > 0) {
              for (let i = 0; i < this.activityidArr.length; i++) {
                if (this.activityidArr[i] == this.activityid) {
                  activity_validate = true;
                }
              }
            }

            if (!activity_validate) {
              if (this.activityid != "") {
                this.activityidArr.push(this.activityid);
              }

              if (this.activityvalue != "") {
                this.activityvalueArr.push(this.activityvalue);
              }
            } else {
              this.commonservice.presentToast(
                this.activityvalue +
                  this.translate.instant(
                    "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.alreadyexist"
                  )
              );
            }
          }
          this.activityvalue = this.nl2br(this.activityvalueArr.join(", "));

          if (this.activityvalue.length > 0) {
            this.step2completedFlag = true;
            this.getStatusColor("STEP2");
          } else {
            if (this.activityvalue.length <= 0) {
              this.step2completedFlag = false;
              this.getStatusColor("STEP2");
            }
          }
        }
      });

      return await activitymodal.present();
    }
  }

  clear(type) {
    if ("Activity") {
      this.activityidArr.splice(-1);
      this.activityvalueArr.splice(-1);

      if (this.activityvalueArr.length > 0) {
        this.activityvalue = this.nl2br(this.activityvalueArr.join("\n"));
      } else {
        this.activityid = "";
        this.activityvalue = "";
        this.activityidArr = [];
        this.activityvalueArr = [];

        if (this.activityvalue.length <= 0) {
          this.step2completedFlag = false;
          this.getStatusColor("STEP2");
        }
      }
    }
  }

  view() {
    this.view_breakdown = JSON.parse(
      this.step1Form.value.select_breakdown
    ).breakdownCoding;
    this.view_activity = this.activityvalueArr.join(", ");

    this.stepFlag = false;

    this.viewFlag = true;
  }

  async showalert() {
    if (this.view_breakdown == "") {
      this.commonservice.presentToast(
        this.translate.instant(
          "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.breakdownmandatory"
        )
      );
      return;
    }

    if (this.view_activity == "") {
      this.commonservice.presentToast(
        this.translate.instant(
          "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.activitysmandatory"
        )
      );
      return;
    }

    const alert = await this.alertController.create({
      header: this.translate.instant(
        "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.header"
      ),
      cssClass: "alertmessage",
      message: this.translate.instant(
        "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.alertmessage"
      ),
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.cancelbutton"),
          role: "cancel",
          cssClass: "secondary",
          handler: (cancel) => {},
        },
        {
          text: this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.sure"
          ),
          handler: () => {
            this.save();
          },
        },
      ],
    });

    await alert.present();
  }

  save() {
    let activityid = [];
    let activityname = [];

    for (let i = 0; i < this.activityidArr.length; i++) {
      if (this.activityidArr[i] == 0) {
        activityname.push(this.activityvalueArr[i]);
      } else {
        activityid.push(this.activityidArr[i]);
      }
    }

    this.confirmDisable = true;

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: 0,
      stationid: String(this.getstationid),
      equipment: String(this.getmachineid),
      problem: "",
      notificationnumber: this.notificationno,
      malfunctionstarttime: "",
      malfunctionstoptime: "",
      notificationtype: "",
      breakdown_coding: String(this.breakdownid),
      maintanence_type: "",
      part_defect: "",
      other_partdefectflag: "",
      other_part_name: "",
      damage: "",
      breakdown_cause: "",
      activity: activityid.join("~"),
      other_activity_name: activityname.join("~"),
      operation: "",
      carryoutby: "",
      materialid: "",
      quantity: "",
      assignedto: "",
      pvflag: 0,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.saveMaintenanceNotification(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.confirmDisable = false;

        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.success"
          )
        );

        this.btn_close();

        /*if (this.module == "MAINTENANCE") {
          this.router.navigate(["/report-maintenance-notification"]);
        }*/

        if (this.module == "PRODUCTION") {
          this.router.navigate(["/report-production-maintenance-notification"]);
        }
      } else {
        this.confirmDisable = false;

        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.failed"
          )
        );
      }
    });
  }

  btn_close() {
    this.modalController.dismiss({
      dismissed: true,
      item: "",
    });
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
