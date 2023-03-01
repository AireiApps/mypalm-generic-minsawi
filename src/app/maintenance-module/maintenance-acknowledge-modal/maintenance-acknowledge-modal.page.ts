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
  selector: "app-maintenance-acknowledge-modal",
  templateUrl: "./maintenance-acknowledge-modal.page.html",
  styleUrls: ["./maintenance-acknowledge-modal.page.scss"],
})
export class MaintenanceAcknowledgeModalPage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;
  @ViewChild("damagetypeSelect", { static: false }) damagetypeRef: IonSelect;
  @ViewChild("breakdowncausesSelect", { static: false })
  breakdowncausesRef: IonSelect;
  @ViewChild("assignedtoSelect", { static: false }) assignedtoRef: IonSelect;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  step1Form;

  params;

  title = this.translate.instant(
    "MAINTENANCEACKNOWLEDGEMODAL.correctivemaintenance"
  );
  module = "";

  breakdownArr = [];
  maintenancetypeArr = [];

  damageArr = [];
  breakdowncausesArr = [];
  activityArr = [];
  assignedtoArr = [];

  // Flags
  previewFlag = true;
  stepFlag = false;
  step1completedFlag = false;
  step2completedFlag = false;
  step3completedFlag = false;
  step4completedFlag = false;
  viewFlag = false;

  breakdownFlag = false;
  maintenancetypeFlag = false;
  partFlag = false;
  otherFlag = false;
  damageFlag = false;
  breakdowncausesFlag = false;
  activityFlag = false;
  otheractivityFlag = false;
  assignedtoFlag = false;

  confirmDisable = false;

  // Variables
  getnotificationid = "";
  getnotificationnumber = "";
  getstationid = "";
  getstationname = "";
  getmachineid = "";
  getequipmentname = "";
  getnotificationtype = "";
  getbreakdown = "";
  getstatus = "";
  getstatusid = "";
  getdamageid = "";
  getdamagevalue = "";
  getpartdefectid = "";
  getpartdefectvalue = "";

  getrunninghours = "";
  getremarks = "";
  getcreateddatetime = "";
  getreportedby = "";
  getactivity = "";
  getpartreceiveddatetime = "";
  getactivitycompletiondatetime = "";
  getcarriedoutby = "";
  getverifiedby = "";
  getauthorizedby = "";
  getauthorizeddatetime = "";

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

  existdamagetypeidArr = [];
  existdamagetypevalueArr = [];

  breakdowncausesid = "";
  breakdowncausesvalue = "";
  breakdowncausesidArr = [];
  breakdowncausesvalueArr = [];

  activityid = "";
  activityvalue = "";
  activityidArr = [];
  activityvalueArr = [];

  assignedtoid = "";
  assignedtovalue = "";
  assignedtoidArr = [];
  assignedtovalueArr = [];

  // View the details
  view_notificationnumber = "";
  view_notificationtype = "";
  view_stationname = "";
  view_equipmentname = "";
  view_breakdown = "";
  view_status = "";
  view_statusid = "";
  view_maintanence_type = "";
  view_maintanence_typeid = "";
  view_part_defect_id = "";
  view_other_part_name = "";
  view_part_defect = "";
  view_damage_type = "";
  view_damage_typeid = "";
  view_breakdown_causes = "";
  view_breakdown_causesid = "";

  // Notification View
  generalArr = [];

  // Flag
  repairactivitynorecordFlag = false;
  jobauthorizationnorecordFlag = false;

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

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
    public notificationviewmodalController: ModalController,
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

    this.title = "ID: " + this.params.notificationno;
    this.module = navParams.get("module");

    //console.log(this.module);

    this.getnotificationid = this.params.id;
    this.getnotificationnumber = this.params.notificationno;
    this.getstationid = this.params.stationid;
    this.getstationname = this.params.stationname;
    this.getmachineid = this.params.equipmentid;
    this.getequipmentname = this.params.equipmentname;
    this.getnotificationtype = this.params.notificationtype;
    this.getbreakdown = this.params.breakdowncoding;
    this.getstatus = this.params.statusname;
    this.getstatusid = this.params.statusId;
    this.getdamageid = this.params.damagesid;
    this.getdamagevalue = this.nl2br(this.params.damages);
    this.getpartdefectid = this.params.partdefectid;
    this.getpartdefectvalue = this.params.partdefect;

    //console.log(this.getstatusid);

    if (this.getpartdefectvalue != "") {
      this.step2completedFlag = true;
    } else {
      this.step2completedFlag = false;
    }

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

    this.step1Form = this.fb.group({
      select_breakdown: new FormControl("", Validators.required),
      select_maintenancetype: new FormControl("", Validators.required),
      txt_partname: new FormControl(""),
      select_damagetype: new FormControl("", Validators.required),
      select_breakdowncauses: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getMaintenancetype();
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

        this.damageFlag = true;

        this.getBreakDownCauses();
      } else {
        this.damageArr = [];

        this.damageFlag = false;

        this.getBreakDownCauses();
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

        this.getNotificationView();
      } else {
        this.breakdowncausesArr = [];

        this.breakdowncausesFlag = false;

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

        this.getrunninghours = this.generalArr[0].runningHours;
        this.getremarks = this.generalArr[0].remarks;
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
        this.getremarks = "";
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

  openAssignedTo() {
    this.assignedtoRef.open();
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

      this.step3completedFlag = true;
      this.getStatusColor("STEP3");
    } else {
      this.damagetypeidArr = [];
      this.damagetypevalueArr = [];
      this.damagetypeid = "";
      this.damagetypevalue = "";

      this.step3completedFlag = false;
      this.getStatusColor("STEP3");
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
    if (type == "PREVIEW") {
      this.previewFlag = false;
      this.viewFlag = false;

      this.pageTop.scrollToTop();
      this.stepFlag = true;
    } else if (type == "STEP1") {
      let partid = [];
      let partvalue = [];
      let otherpartname = [];

      if (this.step1Form.value.select_maintenancetype == "") {
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
          if (this.module == "CM" || this.module == "CMACK") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partdefectmandatory"
              )
            );
          } else if (this.module == "RoPM") {
            this.commonservice.presentToast(
              this.translate.instant(
                "MAINTENANCEACKNOWLEDGEMODAL.partselection"
              )
            );
          } else if (this.module == "RePM" || this.module == "RePMACK") {
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
        if (this.step1Form.value.select_damagetype == "") {
          this.commonservice.presentToast(
            this.translate.instant(
              "MAINTENANCEACKNOWLEDGEMODAL.damagetypeselection"
            )
          );
          return;
        }
      }

      if (this.step1Form.value.select_breakdowncauses == "") {
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

      this.view(partid, partvalue, otherpartname);
    }
  }

  btn_back(type) {
    if (type == "PREVIEW") {
      this.stepFlag = false;
      this.viewFlag = false;

      this.pageTop.scrollToTop();
      this.previewFlag = true;
    } else if (type == "STEP1") {
      this.previewFlag = false;
      this.viewFlag = false;

      this.pageTop.scrollToTop();
      this.stepFlag = true;
    }
  }

  btn_add(type) {
    if (type == "Part") {
      if (this.step1Form.value.txt_partname == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "MAINTENANCEACKNOWLEDGEMODAL.partnamemandatory"
          )
        );
        return;
      }

      this.partid = "0";

      this.partidArr.push(this.partid);

      this.partvalueArr.push(this.step1Form.value.txt_partname);

      this.partvalue = this.nl2br(this.partvalueArr.join("\n"));

      this.otherFlag = false;

      this.step1Form.controls.txt_partname.setValue("");

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

            this.step1Form.controls.txt_partname.setValue("");

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
          this.step1Form.controls.txt_partname.setValue("");
        }

        if (this.partvalue.length <= 0) {
          this.step2completedFlag = false;
          this.getStatusColor("STEP2");
        }
      }
    }
  }

  view(partid, part, otherpartname) {
    this.view_notificationnumber = this.getnotificationnumber;
    this.view_notificationtype = this.getnotificationtype;
    this.view_stationname = this.getstationname;
    this.view_equipmentname = this.getequipmentname;
    this.view_breakdown = this.getbreakdown;
    this.view_status = this.getstatus;
    this.view_statusid = this.getstatusid;
    this.view_maintanence_type = String(
      JSON.parse(this.step1Form.value.select_maintenancetype).maintanence_type
    );
    this.view_maintanence_typeid = String(
      JSON.parse(this.step1Form.value.select_maintenancetype).id
    );
    this.view_part_defect_id = partid.join(",");
    this.view_other_part_name = otherpartname.join(",");
    this.view_part_defect = part;
    this.view_damage_type = this.damagetypevalueArr.join(", ");
    this.view_damage_typeid = this.damagetypeidArr.join(",");
    this.view_breakdown_causes = this.breakdowncausesvalueArr.join(", ");
    this.view_breakdown_causesid = this.breakdowncausesidArr.join(",");

    this.previewFlag = false;
    this.stepFlag = false;

    this.pageTop.scrollToTop();
    this.viewFlag = true;
  }

  showAuthorize() {
    let alertmessage;

    if (this.module == "RoPM") {
      alertmessage = this.translate.instant(
        "MAINTENANCEACKNOWLEDGEMODAL.alertroutine"
      );
    }

    if (this.module == "RePM") {
      alertmessage = this.translate.instant(
        "MAINTENANCEACKNOWLEDGEMODAL.alertreplacement"
      );
    }

    if (this.module == "CM") {
      alertmessage = this.translate.instant(
        "MAINTENANCEACKNOWLEDGEMODAL.alertcorrective"
      );
    }

    this.alertController
      .create({
        header: this.translate.instant("MAINTENANCEACKNOWLEDGEMODAL.alert"),
        message: alertmessage,
        cssClass: "alertmessage",
        backdropDismiss: false,
        buttons: [
          {
            text: this.translate.instant("MAINTENANCEACKNOWLEDGEMODAL.no"),
            role: "no",
            cssClass: "secondary",
            handler: (no) => {
              //console.log("No");
            },
          },
          {
            text: this.translate.instant("MAINTENANCEACKNOWLEDGEMODAL.yes"),
            handler: () => {
              this.authorizecorrectivemaintenance();
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  authorizecorrectivemaintenance() {
    this.confirmDisable = true;

    let setverifyflag = 0;

    if (this.getstatusid == "12") {
      setverifyflag = 1;
    }

    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      stationid: this.getstationid,
      equipment: this.getmachineid,
      maintanence_type: this.view_maintanence_typeid,
      part_defect: this.view_part_defect_id,
      other_part_name: this.view_other_part_name,
      damage: this.view_damage_typeid,
      breakdown_cause: this.view_breakdown_causesid,
      cmflag: 0,
      verifyflag: setverifyflag,
      id: this.getnotificationid,
      language: this.languageService.selected,
    };

    this.maintenanceservice
      .updateCorrectiveMaintenanceAuthorize(req)
      .then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("MAINTENANCEACKNOWLEDGEMODAL.success")
          );

          this.btn_close();
        } else {
          this.confirmDisable = false;

          this.commonservice.presentToast(
            this.translate.instant("MAINTENANCEACKNOWLEDGEMODAL.failed")
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
