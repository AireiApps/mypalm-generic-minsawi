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
import * as moment from "moment";

// Custom Date Picker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
import { Plugins } from "@capacitor/core";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-maintenance-preventivemaintenance-assign-modal",
  templateUrl: "./maintenance-preventivemaintenance-assign-modal.page.html",
  styleUrls: ["./maintenance-preventivemaintenance-assign-modal.page.scss"],
})
export class MaintenancePreventivemaintenanceAssignModalPage implements OnInit {
  //@ViewChild("assignedtoSelect", { static: false }) assignedtoRef: IonSelect;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  assignForm;

  params;

  assignedtoArr = [];

  // Variables
  title = "";
  module = "";

  getnotificationid = "";
  getstationid = "";
  getstationname = "";
  getmachineid = "";
  getmachinename = "";
  getstatusid = "";
  partdefectname = "";
  assignedtoid = "";
  assignedtovalue = "";
  assignedtoidArr = [];
  assignedtovalueArr = [];

  // View the details
  view_station = "";
  view_machine = "";
  view_partdefect = "";
  view_assignto = "";

  viewFlag = false;
  confirmDisable = false;

  // Ionic Select Header
  public assignedtoOptions: any = {
    header:
      this.userlist.desigId == 4
        ? this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.fitterlist"
          )
        : this.translate.instant(
            "MAINTENANCEENGINEERINGNOTIFICATIONMODAL.wiremanlist"
          ),
    cssClass: "singleselect",
  };

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
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

    this.getnotificationid = this.params.id;
    this.getstationid = this.params.stationid;
    this.getstationname = this.params.stationname;
    this.getmachineid = this.params.equipmentid;
    this.getmachinename = this.params.equipmentname;
    this.getstatusid = this.params.statusId;
    this.partdefectname = this.params.partdefect;

    //console.log("param:", this.params);

    this.assignForm = this.fb.group({
      select_assignedto: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getAssignedTo();
  }

  getAssignedTo() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      desig_id: this.userlist.desigId,
      language: this.languageService.selected,
    };

    //console.log(req);

    this.maintenanceservice.getAssignedToList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.assignedtoArr = resultdata.data;
      } else {
        this.assignedtoArr = [];
      }
    });
  }

  /*openAssignedTo() {
    this.assignedtoRef.open();
  }*/

  assignedtohandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      /*this.assignedtoidArr = [];
      this.assignedtovalueArr = [];
      for (let i = 0; i < value.length; i++) {
        this.assignedtoidArr.push(JSON.parse(value[i]).userId);
        this.assignedtovalueArr.push(JSON.parse(value[i]).name);
      }

      this.assignedtoid = this.assignedtoidArr.join(",");
      this.assignedtovalue = this.nl2br(this.assignedtovalueArr.join(", "));*/

      this.assignedtoid = JSON.parse(value).userId;
      this.assignedtovalue = JSON.parse(value).name;
    } else {
      //this.assignedtoidArr = [];
      //this.assignedtovalueArr = [];
      this.assignedtoid = "";
      this.assignedtovalue = "";
    }
  }

  btn_next() {
    if (this.assignedtoid == "") {
      this.commonservice.presentToast(
        this.translate.instant("PREVENTIVEMAINTENANCEASSIGN.activitymandatory")
      );
      return;
    }

    if (this.getstationname != "") {
      this.view_station = this.getstationname;
    }

    if (this.getmachinename != "") {
      this.view_machine = this.getmachinename;
    }

    if (this.partdefectname != "") {
      this.view_partdefect = this.partdefectname;
    }

    //this.view_assignto = this.assignedtovalueArr.join(", ");
    this.view_assignto = JSON.parse(
      this.assignForm.value.select_assignedto
    ).name;

    this.viewFlag = true;
  }

  btn_back() {
    this.viewFlag = false;
  }

  async showalert() {
    const alert = await this.alertController.create({
      header: this.translate.instant("PREVENTIVEMAINTENANCEASSIGN.alert"),
      cssClass: "alertmessage",
      message: this.translate.instant(
        "PREVENTIVEMAINTENANCEASSIGN.alertmessage"
      ),
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.cancelbutton"),
          role: "cancel",
          cssClass: "secondary",
          handler: (cancel) => {},
        },
        {
          text: this.translate.instant("GENERALBUTTON.sure"),
          handler: () => {
            this.save();
          },
        },
      ],
    });

    await alert.present();
  }

  save() {
    var getcurrentdate = moment(new Date().toISOString()).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    this.confirmDisable = true;

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      notification_id: this.getnotificationid,
      station: this.getstationid,
      equipment: this.getmachineid,
      id: "",
      partscode: "",
      partsid: "",
      partsname: "",
      quantity: "",
      unit: "",
      statusid: this.getstatusid,
      assignedto: this.assignedtoid,
      date: getcurrentdate,
      pvflag: 1,
      tasklistid: "",
      language: this.languageService.selected,
    };

    this.maintenanceservice.saveAssignedTo(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.assignForm.reset();

        this.confirmDisable = false;

        this.commonservice.presentToast(
          this.translate.instant("PREVENTIVEMAINTENANCEASSIGN.routinesuccess")
        );

        this.btn_close();
      } else {
        this.confirmDisable = false;

        this.commonservice.presentToast(
          this.translate.instant("PREVENTIVEMAINTENANCEASSIGN.routinefailed")
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
