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
  IonContent,
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

@Component({
  selector: "app-maintenance-fitterwireman-verify-acknowledge",
  templateUrl: "./maintenance-fitterwireman-verify-acknowledge.page.html",
  styleUrls: ["./maintenance-fitterwireman-verify-acknowledge.page.scss"],
})
export class MaintenanceFitterwiremanVerifyAcknowledgePage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;
  @ViewChild("damagetypeSelect", { static: false }) damagetypeRef: IonSelect;
  @ViewChild("breakdowncausesSelect", { static: false })
  breakdowncausesRef: IonSelect;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  verifyacknowledgeForm;

  params;
  screen;

  title = this.translate.instant(
    "MAINTENANCEACCEPTMODAL.correctivemaintenance"
  );

  // Variables
  generalArr = [];
  reasonArr = [];
  materialrequiredArr = [
    {
      id: 1,
      name: this.translate.instant("MAINTENANCEACCEPTMODAL.yes"),
      selected: 0,
    },
    {
      id: 2,
      name: this.translate.instant("MAINTENANCEACCEPTMODAL.no"),
      selected: 0,
    },
  ];

  workordercompletedArr = [
    {
      id: 1,
      name: this.translate.instant("MAINTENANCEACCEPTMODAL.yes"),
      selected: 0,
    },
    {
      id: 2,
      name: this.translate.instant("MAINTENANCEACCEPTMODAL.no"),
      selected: 0,
    },
  ];

  conditionArr = [
    {
      condition_id: 1,
      condition: this.translate.instant("MAINTENANCEACCEPTMODAL.yes"),
    },
    {
      condition_id: 0,
      condition: this.translate.instant("MAINTENANCEACCEPTMODAL.no"),
    },
  ];
  maintenancetypeArr = [];
  damageArr = [];
  breakdowncausesArr = [];

  getnotificationid = "";
  getnotificationnumber = "";
  getstationid = "";
  getstationname = "";
  getmachineid = "";
  getmachinename = "";
  getnotificationtype = "";
  getbreakdown = "";
  getstatusid = "";
  getstatus = "";
  getdamageid = "";
  getdamagevalue = "";
  getpartdefectid = "";
  getpartdefectvalue = "";

  getrunninghours = "";
  getcreateddatetime = "";
  getreportedby = "";
  getactivity = "";
  getpartreceiveddatetime = "";
  getactivitycompletiondatetime = "";
  getcarriedoutby = "";
  getverifiedby = "";
  getauthorizedby = "";
  getauthorizeddatetime = "";
  optionSelected = "";
  conditionoptionSelected = "";
  reasonid = "";
  reason = "";
  cssenable = 0;
  createcmFlag = 0;

  maintenancetypeid = "";
  maintenancetypevalue = "";

  damagetypeid = "";
  damagetypevalue = "";
  damagetypeidArr = [];
  damagetypevalueArr = [];

  existdamagetypeidArr = [];
  existdamagetypevalueArr = [];

  breakdowncausesid = "";
  breakdowncausesvalue = "";
  breakdowncausesidArr = [];
  breakdowncausesvalueArr = [];

  partid = "";
  partvalue = "";
  partidArr = [];
  partvalueArr = [];

  // Flag
  step1Flag = true;
  step2Flag = false;
  viewFlag = false;

  step1completedFlag = false;
  step2completedFlag = false;
  step3completedFlag = false;
  step4completedFlag = false;

  repairactivitynorecordFlag = false;
  jobauthorizationnorecordFlag = false;

  reasonFlag = false;
  conditionFlag = false;
  verifyFlag = false;
  maintenancetypeFlag = false;
  partFlag = false;
  otherFlag = false;
  damageFlag = false;
  breakdowncausesFlag = false;

  abnormaldamageFlag = false;

  yesradiobuttonchecked = false;
  noradiobuttonchecked = false;
  goodradiobuttonchecked = false;
  abnormalradiobuttonchecked = false;

  saveDisable = false;

  // Ionic Select Header
  public maintenancetypeOptions: any = {
    header: this.translate.instant(
      "MAINTENANCEACKNOWLEDGEMODAL.maintenancetype"
    ),
    cssClass: "multiselect",
  };

  public damagetypeOptions: any = {
    header: this.translate.instant("MAINTENANCEACKNOWLEDGEMODAL.damagetype"),
    cssClass: "multiselect",
  };

  public breakdowncausesOptions: any = {
    header: this.translate.instant(
      "MAINTENANCEACKNOWLEDGEMODAL.breakdowncauses"
    ),
    cssClass: "multiselect",
  };

  public reasonOptions: any = {
    header: this.translate.instant("MAINTENANCEACCEPTMODAL.reason"),
    cssClass: "singleselect",
  };

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
    public materialmodalController: ModalController,
    public partmodalController: ModalController,
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

    this.title = "ID: " + this.params.notificationno;

    this.getstationid = this.params.stationid;
    this.getstationname = this.params.stationname;
    this.getmachineid = this.params.equipmentid;
    this.getmachinename = this.params.equipmentname;
    this.getbreakdown = this.params.breakdowncoding;
    this.getstatusid = this.params.statusId;
    this.getnotificationid = this.params.id;
    this.getpartdefectvalue = this.params.partdefect;
    this.getpartdefectid = this.params.partdefectid;
    this.screen = this.params.type;

    //console.log(this.screen);

    if (this.getpartdefectvalue != "") {
      this.step2completedFlag = true;
    } else {
      this.step2completedFlag = false;
    }

    this.verifyacknowledgeForm = this.fb.group({
      select_reason: new FormControl(""),
      select_breakdown: new FormControl("", Validators.required),
      select_maintenancetype: new FormControl("", Validators.required),
      txt_partname: new FormControl(""),
      select_damagetype: new FormControl("", Validators.required),
      select_breakdowncauses: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getNotificationReason();
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
    } else if (type == "STEP3") {
      if (!this.step3completedFlag) {
        color = "#ff0000";
      } else if (this.step3completedFlag) {
        color = "#008000";
      } else {
        color = "#ff0000";
      }
    } else if (type == "STEP4") {
      if (!this.step4completedFlag) {
        color = "#ff0000";
      } else if (this.step4completedFlag) {
        color = "#008000";
      } else {
        color = "#ff0000";
      }
    } else {
      color = "#ff0000";
    }

    return color;
  }

  getNotificationReason() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      desig_id: this.userlist.desigId,
      language: this.languageService.selected,
    };

    this.maintenanceservice.getReason(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.reasonArr = resultdata.data;

        this.getNotificationView();
      } else {
        this.reasonArr = [];

        this.getNotificationView();
      }
    });
  }

  getNotificationView() {
    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: this.getnotificationid,
      language: this.languageService.selected,
    };

    this.maintenanceservice.getNotificationView(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.generalArr = resultdata.data.general;

        this.getdamageid = this.generalArr[0].damagesid;
        this.getdamagevalue = this.generalArr[0].damages;

        if (this.getdamagevalue != "") {
          var damageid = this.getdamageid.split(",");
          var damagevalue = this.getdamagevalue.split(",");

          for (let i = 0; i < damageid.length; i++) {
            this.existdamagetypeidArr.push(parseInt(damageid[i]));
            this.existdamagetypevalueArr.push(damagevalue[i]);
            //this.damagetypeidArr.push(damageid[i]);
            //this.damagetypevalueArr.push(damagevalue[i]);
          }

          //console.log(this.existdamagetypeidArr);

          this.step3completedFlag = true;
        } else {
          this.step3completedFlag = false;
        }

        this.getrunninghours = this.generalArr[0].runningHours;
        this.getcreateddatetime = this.generalArr[0].insDate;
        this.getreportedby = this.generalArr[0].reportBy;

        this.getactivity = this.generalArr[0].activity;
        this.getpartreceiveddatetime = this.generalArr[0].partreceiveddatetime;
        this.getactivitycompletiondatetime =
          this.generalArr[0].workcompletiondatetime;
        this.getcarriedoutby = this.generalArr[0].carriedoutby;
        if (
          this.getactivity == "" &&
          this.getpartreceiveddatetime == "" &&
          this.getactivitycompletiondatetime == "" &&
          this.getcarriedoutby == "" &&
          this.getverifiedby == ""
        ) {
          this.repairactivitynorecordFlag = true;
        }

        this.getauthorizedby = this.generalArr[0].authorisedBy;
        this.getauthorizeddatetime = this.generalArr[0].acknowledgeddatetime;

        if (this.getauthorizedby == "" && this.getauthorizeddatetime == "") {
          this.jobauthorizationnorecordFlag = true;
        }
      } else {
        this.generalArr = [];

        this.getrunninghours = "";
        this.getcreateddatetime = "";
        this.getactivity = "";
        this.getpartreceiveddatetime = "";
        this.getactivitycompletiondatetime = "";
        this.getcarriedoutby = "";
        this.getverifiedby = "";
        this.getreportedby = "";
        this.getauthorizedby = "";
        this.getauthorizeddatetime = "";
      }
    });
  }

  getMaintenancetype() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };
    this.maintenanceservice.getMaintenanceTypeList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.maintenancetypeArr = resultdata.data;

        let eachArr = [];

        for (let i = 0; i < this.maintenancetypeArr.length; i++) {
          let eachitem = this.maintenancetypeArr[i];
          let eachreq = {
            id: eachitem.id,
            maintanence_type: eachitem.maintanence_type,
            selected: 0,
          };
          eachArr.push(eachreq);

          if (this.maintenancetypeid != "") {
            if (eachitem.id == this.maintenancetypeid) {
              eachArr[i]["selected"] = 1;
            }
          }
        }

        this.maintenancetypeArr = eachArr;

        this.maintenancetypeFlag = true;

        this.partFlag = true;

        this.getDamage();
      } else {
        this.maintenancetypeArr = [];

        this.maintenancetypeFlag = false;

        this.partFlag = true;

        this.getDamage();
      }
    });
  }

  getDamage() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };
    this.maintenanceservice.getDamageList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.damageArr = resultdata.data;

        let eachArr = [];

        for (let i = 0; i < this.damageArr.length; i++) {
          let existFlag = false;
          let eachitem = this.damageArr[i];

          if (this.getdamageid != "" && this.getdamageid != "0") {
            for (let j = 0; j < this.existdamagetypeidArr.length; j++) {
              if (eachitem.id == this.existdamagetypeidArr[j]) {
                existFlag = true;
              }
            }
          }

          if (!existFlag) {
            let eachreq = {
              id: eachitem.id,
              damage: eachitem.damage,
              selected: 0,
            };
            eachArr.push(eachreq);
          }

          if (this.damagetypeid != "") {
            if (eachitem.id == this.damagetypeid) {
              eachArr[i]["selected"] = 1;
            }
          }
        }

        this.damageArr = eachArr;

        if (this.screen == "ROUT") {
          this.abnormaldamageFlag = true;
        } else {
          this.damageFlag = true;

          this.getBreakDownCauses();
        }
      } else {
        this.damageArr = [];

        if (this.screen == "ROUT") {
          this.abnormaldamageFlag = false;
        } else {
          this.damageFlag = false;

          this.getBreakDownCauses();
        }
      }
    });
  }

  getBreakDownCauses() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };
    this.maintenanceservice.getBreakDownCausesList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.breakdowncausesArr = resultdata.data;

        let eachArr = [];

        for (let i = 0; i < this.breakdowncausesArr.length; i++) {
          let eachitem = this.breakdowncausesArr[i];
          let eachreq = {
            cause_id: eachitem.cause_id,
            BreakdownCause: eachitem.BreakdownCause,
            selected: 0,
          };
          eachArr.push(eachreq);

          if (this.breakdowncausesid != "") {
            if (eachitem.cause_id == this.breakdowncausesid) {
              eachArr[i]["selected"] = 1;
            }
          }
        }

        this.breakdowncausesArr = eachArr;

        this.breakdowncausesFlag = true;
      } else {
        this.breakdowncausesArr = [];

        this.breakdowncausesFlag = false;
      }
    });
  }

  onOptionChange(value) {
    this.optionSelected = value;

    if (
      (this.getstatusid == "2" || this.getstatusid == "4") &&
      this.screen == "ROUT"
    ) {
      if (this.optionSelected == "Yes") {
        this.cssenable = 1;
        this.conditionFlag = true;
      } else {
        this.cssenable = 0;
        this.conditionFlag = false;
      }
    } else if (
      (this.getstatusid == "2" || this.getstatusid == "4") &&
      this.screen != "ROUT"
    ) {
      this.conditionFlag = false;

      if (this.optionSelected == "Yes") {
        this.cssenable = 0;
        this.verifyFlag = true;

        this.getMaintenancetype();
      } else {
        this.cssenable = 0;
        this.verifyFlag = false;
      }
    } else if (this.getstatusid == "3" || this.getstatusid == "10") {
      if (this.optionSelected == "No") {
        this.cssenable = 1;
        this.reasonFlag = true;
      } else {
        this.cssenable = 0;
        this.reasonFlag = false;
      }
    }
  }

  onConditionOptionChange(value) {
    this.conditionoptionSelected = value;

    if (this.getstatusid == "2" || this.getstatusid == "4") {
      if (this.conditionoptionSelected == "Abnormal") {
        this.getDamage();

        this.createcmFlag = 1;
      } else {
        this.abnormaldamageFlag = false;
      }
    }
  }

  reasonhandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.reasonid = JSON.parse(value).reason_id;
      this.reason = JSON.parse(value).reason_name;
    } else {
      this.reasonid = "";
      this.reason = "";
    }
  }

  btn_maintenancetype(value, index) {
    for (let i = 0; i < this.maintenancetypeArr.length; i++) {
      if (this.maintenancetypeArr[i].selected == 1) {
        this.maintenancetypeArr[i]["selected"] = 0;
      }
    }

    if (value.selected == 0) {
      this.maintenancetypeid = value.id;
      this.maintenancetypevalue = value.maintanence_type;

      this.maintenancetypeArr[index]["selected"] = 1;
    } else {
      this.maintenancetypeid = "";
      this.maintenancetypevalue = "";
      this.maintenancetypeArr[index]["selected"] = 0;
    }
  }

  btn_damagetype(value, index) {
    for (let i = 0; i < this.damageArr.length; i++) {
      if (this.damageArr[i].selected == 1) {
        this.damageArr[i]["selected"] = 0;
      }
    }

    if (value.selected == 0) {
      this.damagetypeid = value.id;
      this.damagetypevalue = value.damage;

      this.damageArr[index]["selected"] = 1;
    } else {
      this.damagetypeid = "";
      this.damagetypevalue = "";
      this.damageArr[index]["selected"] = 0;
    }
  }

  openDamageType() {
    this.damagetypeRef.open();
  }

  openBreakdownCauses() {
    this.breakdowncausesRef.open();
  }

  maintenancetypehandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.maintenancetypeid = JSON.parse(value).id;
      this.maintenancetypevalue = JSON.parse(value).maintanence_type;

      this.step1completedFlag = true;
      this.getStatusColor("STEP1");
    } else {
      this.maintenancetypeid = "";
      this.maintenancetypevalue = "";

      this.step1completedFlag = false;
      this.getStatusColor("STEP1");
    }
  }

  damagehandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.damagetypeidArr = [];
      this.damagetypevalueArr = [];

      if (this.getdamageid != "" && this.getdamageid != "0") {
        this.damagetypeidArr.push(this.getdamageid);
        this.damagetypevalueArr.push(this.getdamagevalue);
      }

      for (let i = 0; i < value.length; i++) {
        this.damagetypeidArr.push(JSON.parse(value[i]).id);
        this.damagetypevalueArr.push(JSON.parse(value[i]).damage);
      }

      this.damagetypeid = this.damagetypeidArr.join(",");
      this.damagetypevalue = this.nl2br(this.damagetypevalueArr.join(", "));

      if (this.screen != "ROUT") {
        this.step3completedFlag = true;
        this.getStatusColor("STEP3");
      }
    } else {
      this.damagetypeidArr = [];
      this.damagetypevalueArr = [];
      this.damagetypeid = "";
      this.damagetypevalue = "";

      if (this.screen != "ROUT") {
        this.step3completedFlag = false;
        this.getStatusColor("STEP3");
      }
    }
  }

  breakdowncauseshandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.breakdowncausesidArr = [];
      this.breakdowncausesvalueArr = [];
      for (let i = 0; i < value.length; i++) {
        this.breakdowncausesidArr.push(JSON.parse(value[i]).cause_id);
        this.breakdowncausesvalueArr.push(JSON.parse(value[i]).BreakdownCause);
      }

      this.breakdowncausesid = this.breakdowncausesidArr.join(",");
      this.breakdowncausesvalue = this.nl2br(
        this.breakdowncausesvalueArr.join(", ")
      );

      this.step4completedFlag = true;
      this.getStatusColor("STEP4");
    } else {
      this.breakdowncausesidArr = [];
      this.breakdowncausesvalueArr = [];
      this.breakdowncausesid = "";
      this.breakdowncausesvalue = "";

      this.step4completedFlag = false;
      this.getStatusColor("STEP4");
    }
  }

  btn_next(type) {
    if (type == "STEP1") {
      this.cssenable = 1;

      this.step1Flag = false;
      this.step2Flag = true;
      this.viewFlag = false;
    } else if (type == "STEP2") {
      let partid = [];
      let partvalue = [];
      let otherpartname = [];

      if (this.verifyacknowledgeForm.value.select_maintenancetype == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.maintenancetypeselection"
          )
        );
        return;
      }

      if (this.getpartdefectid != "" && this.getpartdefectid != "0") {
        partid.push(this.getpartdefectid);
        partvalue.push(this.getpartdefectvalue);
      } else {
        if (this.partidArr.length <= 0) {
          if (this.screen == "CM") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partdefectmandatory"
              )
            );
          } else if (this.screen == "REPL") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partselection"
              )
            );
          } else if (this.screen == "ROUT") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partreplacedselection"
              )
            );
          } else {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partselection"
              )
            );
          }

          return;
        }
      }

      if (this.getdamageid != "" && this.getdamageid != "0") {
        if (this.damagetypeidArr.length <= 0) {
          this.damagetypeidArr.push(this.getdamageid);
          this.damagetypevalueArr.push(this.getdamagevalue);
        }
      } else {
        if (this.verifyacknowledgeForm.value.select_damagetype == "") {
          this.commonservice.presentToast(
            this.translate.instant(
              "MAINTENANCEACKNOWLEDGEMODAL.damagetypeselection"
            )
          );
          return;
        }
      }

      if (this.verifyacknowledgeForm.value.select_breakdowncauses == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.breakdowncausesselection"
          )
        );
        return;
      }

      for (let i = 0; i < this.partidArr.length; i++) {
        if (this.partidArr[i] == 0) {
          otherpartname.push(this.partvalueArr[i]);
        } else {
          partid.push(this.partidArr[i]);
        }
      }

      partvalue.push(this.partvalueArr);

      //this.view(partid, partvalue, otherpartname);
    }
  }

  btn_back(type) {
    if (type == "STEP1") {
      this.cssenable = 0;

      //this.pageTop.scrollToTop();

      if (this.optionSelected == "Yes") {
        this.yesradiobuttonchecked = true;
        this.noradiobuttonchecked = false;
      } else {
        this.yesradiobuttonchecked = false;
        this.noradiobuttonchecked = true;
      }

      this.step1Flag = true;
      this.step2Flag = false;
      this.viewFlag = false;
    }
  }

  btn_add(type) {
    if (type == "Part") {
      if (this.verifyacknowledgeForm.value.txt_partname == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.partnamemandatory"
          )
        );
        return;
      }

      this.partid = "0";

      this.partidArr.push(this.partid);

      this.partvalueArr.push(this.verifyacknowledgeForm.value.txt_partname);

      this.partvalue = this.nl2br(this.partvalueArr.join("\n"));

      this.otherFlag = false;

      this.verifyacknowledgeForm.controls.txt_partname.setValue("");

      if (this.partvalue.length > 0) {
        this.step2completedFlag = true;
        this.getStatusColor("STEP2");
      } else {
        if (this.partvalue.length <= 0) {
          this.step2completedFlag = false;
          this.getStatusColor("STEP2");
        }
      }
    }
  }

  clear(type) {
    if (type == "Part") {
      this.partidArr.splice(-1);
      this.partvalueArr.splice(-1);

      if (this.partvalueArr.length > 0) {
        this.partvalue = this.nl2br(this.partvalueArr.join("\n"));
      } else {
        this.partid = "";
        this.partvalue = "";
        this.partidArr = [];
        this.partvalueArr = [];
        if (this.otherFlag) {
          this.otherFlag = false;
          this.verifyacknowledgeForm.controls.txt_partname.setValue("");
        }

        if (this.partvalue.length <= 0) {
          this.step2completedFlag = false;
          this.getStatusColor("STEP2");
        }
      }
    }
  }

  remarksalert() {
    if (this.optionSelected == "") {
      if (this.getstatusid == "3" || this.getstatusid == "10") {
        this.commonservice.presentToast(
          this.translate.instant("MAINTENANCEACCEPTMODAL.jobselectionmandatory")
        );
        return;
      }

      if (this.getstatusid == "2" || this.getstatusid == "4") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACCEPTMODAL.workorderselectionmandatory"
          )
        );
        return;
      }
    }

    if (
      this.optionSelected == "Yes" &&
      (this.getstatusid == "2" || this.getstatusid == "4") &&
      this.screen == "ROUT"
    ) {
      if (this.conditionoptionSelected == "") {
        this.commonservice.presentToast(
          this.translate.instant("MAINTENANCEACCEPTMODAL.conditionmandatory")
        );
        return;
      }
    }

    let partid = [];
    let partvalue = [];
    let otherpartname = [];

    if (this.verifyFlag) {
      if (this.verifyacknowledgeForm.value.select_maintenancetype == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.maintenancetypeselection"
          )
        );
        return;
      }

      if (this.getpartdefectid != "" && this.getpartdefectid != "0") {
        partid.push(this.getpartdefectid);
        partvalue.push(this.getpartdefectvalue);
      } else {
        if (this.partidArr.length <= 0) {
          if (this.screen == "CM") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partdefectmandatory"
              )
            );
          } else if (this.screen == "ROUT") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partselection"
              )
            );
          } else if (this.screen == "REPL") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partreplacedselection"
              )
            );
          } else {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partselection"
              )
            );
          }

          return;
        }
      }

      if (this.getdamageid != "" && this.getdamageid != "0") {
        if (this.damagetypeidArr.length <= 0) {
          this.damagetypeidArr.push(this.getdamageid);
          this.damagetypevalueArr.push(this.getdamagevalue);
        }
      } else {
        if (this.verifyacknowledgeForm.value.select_damagetype == "") {
          this.commonservice.presentToast(
            this.translate.instant(
              "MAINTENANCEACKNOWLEDGEMODAL.damagetypeselection"
            )
          );
          return;
        }
      }

      if (this.verifyacknowledgeForm.value.select_breakdowncauses == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.breakdowncausesselection"
          )
        );
        return;
      }

      for (let i = 0; i < this.partidArr.length; i++) {
        if (this.partidArr[i] == 0) {
          otherpartname.push(this.partvalueArr[i]);
        } else {
          partid.push(this.partidArr[i]);
        }
      }

      partvalue.push(this.partvalueArr);
    }

    if (this.screen != "ROUT") {
      let alertmessage = this.translate.instant(
        "MAINTENANCEACCEPTMODAL.enterremark"
      );

      this.alertController
        .create({
          header: "",
          message: alertmessage,
          cssClass: "alertmessage",
          backdropDismiss: false,
          inputs: [
            {
              name: "remarks",
              type: "textarea",
              cssClass: "alertinput",
              placeholder: this.translate.instant(
                "MAINTENANCEACCEPTMODAL.optional"
              ),
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
                this.save(data.remarks, partid, partvalue, otherpartname);
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    } else {
      if (
        this.conditionoptionSelected != "" &&
        this.conditionoptionSelected == "Good"
      ) {
        let alertmessage = this.translate.instant(
          "MAINTENANCEACCEPTMODAL.enterremark"
        );

        this.alertController
          .create({
            header: "",
            message: alertmessage,
            cssClass: "alertmessage",
            backdropDismiss: false,
            inputs: [
              {
                name: "remarks",
                type: "textarea",
                cssClass: "alertinput",
                placeholder: this.translate.instant(
                  "MAINTENANCEACCEPTMODAL.optional"
                ),
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
                  this.save(data.remarks, partid, partvalue, otherpartname);
                },
              },
            ],
          })
          .then((res) => {
            res.present();
          });
      } else {
        if (this.conditionoptionSelected == "Abnormal") {
          if (this.damagetypeid.length <= 0) {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACCEPTMODAL.damagetypemandatory"
              )
            );
            return;
          }
        }

        let alertmessage;

        alertmessage = this.translate.instant(
          "MAINTENANCENOTIFICATIONVIEW.alert"
        );

        this.alertController
          .create({
            header: this.translate.instant(
              "MAINTENANCENOTIFICATIONVIEW.header"
            ),
            message: alertmessage,
            cssClass: "alertmessage",
            backdropDismiss: true,
            buttons: [
              {
                text: this.translate.instant("MAINTENANCENOTIFICATIONVIEW.no"),
                role: "no",
                cssClass: "secondary",
                handler: (no) => {
                  this.createcmFlag = 0;
                  this.save("", partid, partvalue, otherpartname);
                },
              },
              {
                text: this.translate.instant("MAINTENANCENOTIFICATIONVIEW.yes"),
                handler: () => {
                  this.createcmFlag = 1;
                  this.save("", partid, partvalue, otherpartname);
                },
              },
            ],
          })
          .then((res) => {
            res.present();
          });
      }
    }
  }

  save(getremarks, getpartid, getpart, getotherpartname) {
    if (this.optionSelected == "") {
      if (this.getstatusid == "3" || this.getstatusid == "10") {
        this.commonservice.presentToast(
          this.translate.instant("MAINTENANCEACCEPTMODAL.jobselectionmandatory")
        );
        return;
      }
    }

    if (
      this.optionSelected == "No" &&
      (this.getstatusid == "3" || this.getstatusid == "10")
    ) {
      if (this.reasonid == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACCEPTMODAL.reasonselectionmandatory"
          )
        );
        return;
      }
    }

    this.saveDisable = true;

    var req;

    if (this.getstatusid == "3" || this.getstatusid == "10") {
      req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        dept_id: this.userlist.dept_id,
        design_id: this.userlist.desigId,
        id: this.getnotificationid,
        stationid: this.getstationid,
        equipment: this.getmachineid,
        maintanence_type: "",
        part_defect: "",
        other_part_name: "",
        damage: "",
        breakdown_cause: "",
        flag: this.screen,
        reason_id: this.reasonid,
        acceptmaterial: this.optionSelected,
        workordercompleted: "",
        condition: "",
        remarks: getremarks,
        cmflag: this.createcmFlag,
        language: this.languageService.selected,
      };
    } else {
      if (this.verifyFlag) {
        req = {
          userid: this.userlist.userId,
          millcode: this.userlist.millcode,
          dept_id: this.userlist.dept_id,
          design_id: this.userlist.desigId,
          id: this.getnotificationid,
          stationid: this.getstationid,
          equipment: this.getmachineid,
          maintanence_type: String(
            JSON.parse(this.verifyacknowledgeForm.value.select_maintenancetype)
              .id
          ),
          part_defect: getpartid.join(","),
          other_part_name: getotherpartname.join(","),
          damage: this.damagetypeidArr.join(","),
          breakdown_cause: this.breakdowncausesidArr.join(","),
          flag: this.screen,
          reason_id: "",
          acceptmaterial: "",
          workordercompleted: this.optionSelected,
          condition: this.conditionoptionSelected,
          remarks: getremarks,
          cmflag: this.createcmFlag,
          language: this.languageService.selected,
        };
      } else {
        var getdamagetype = "";
        if (this.screen == "ROUT") {
          getdamagetype = this.damagetypeidArr.join(",");
        }

        req = {
          userid: this.userlist.userId,
          millcode: this.userlist.millcode,
          dept_id: this.userlist.dept_id,
          design_id: this.userlist.desigId,
          id: this.getnotificationid,
          stationid: this.getstationid,
          equipment: this.getmachineid,
          maintanence_type: "",
          part_defect: "",
          other_part_name: "",
          damage: getdamagetype,
          breakdown_cause: "",
          flag: this.screen,
          reason_id: this.reasonid,
          acceptmaterial: "",
          workordercompleted: this.optionSelected,
          condition: this.conditionoptionSelected,
          remarks: getremarks,
          cmflag: this.createcmFlag,
          language: this.languageService.selected,
        };
      }
    }

    console.log(req);

    this.maintenanceservice
      .saveFitterVerificationAcknowledgeNotification(req)
      .then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          this.saveDisable = false;

          if (this.screen == "REPL") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACCEPTMODAL.replacementsuccess"
              )
            );
          }

          if (this.screen == "CM") {
            this.commonservice.presentToast(
              this.translate.instant("MAINTENANCEACCEPTMODAL.correctivesuccess")
            );
          }

          this.modalController.dismiss({
            dismissed: true,
            screen: this.screen,
          });
        } else {
          this.saveDisable = false;

          if (this.screen == "REPL") {
            this.commonservice.presentToast(
              this.translate.instant("MAINTENANCEACCEPTMODAL.replacementfailed")
            );
          }

          if (this.screen == "CM") {
            this.commonservice.presentToast(
              this.translate.instant("MAINTENANCEACCEPTMODAL.correctivefailed")
            );
          }
        }
      });
  }

  async callmodalcontroller(type, value) {
    if (type == "PartDefect") {
      const partmodal = await this.partmodalController.create({
        component: MaintenanceMaterialsearchPage,
        componentProps: {
          type: "0",
          station_id: this.getstationid,
          equipment_id: this.getmachineid,
          title: this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.searchpartname"
          ),
        },
      });

      partmodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          this.partid = this.params.item_id;
          this.partvalue = this.params.item_name;

          if (this.partid == "0") {
            this.otherFlag = true;
          } else {
            let part_validate = false;

            this.otherFlag = false;

            this.verifyacknowledgeForm.controls.txt_partname.setValue("");

            if (this.partidArr.length > 0) {
              for (let i = 0; i < this.partidArr.length; i++) {
                if (this.partidArr[i] == this.partid) {
                  part_validate = true;
                }
              }
            }

            if (!part_validate) {
              if (this.partid != "") {
                this.partidArr.push(this.partid);
              }

              if (this.partvalue != "") {
                this.partvalueArr.push(this.partvalue);
              }
            } else {
              this.commonservice.presentToast(
                this.partvalue +
                  this.translate.instant(
                    "MAINTENANCEACKNOWLEDGEMODAL.alreadyexist"
                  )
              );
            }
          }
          this.partvalue = this.nl2br(this.partvalueArr.join("\n"));

          if (this.partvalue.length > 0) {
            this.step2completedFlag = true;
            this.getStatusColor("STEP2");
          } else {
            if (this.partvalue.length <= 0) {
              this.step2completedFlag = false;
              this.getStatusColor("STEP2");
            }
          }
        }
      });

      return await partmodal.present();
    }
  }

  btn_close() {
    this.modalController.dismiss({
      dismissed: true,
      screen: "",
    });
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
