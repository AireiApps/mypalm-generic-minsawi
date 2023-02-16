import { Component, OnInit, ViewChild } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  Platform,
  ModalController,
  NavParams,
  AlertController,
  IonSelect,
} from "@ionic/angular";

// Custom Date Picker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
import { Plugins } from "@capacitor/core";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";

@Component({
  selector: "app-production-machineshutdownalert-modal",
  templateUrl: "./production-machineshutdownalert-modal.page.html",
  styleUrls: ["./production-machineshutdownalert-modal.page.scss"],
})
export class ProductionMachineshutdownalertModalPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  step1Form;

  params;

  title = "";

  breakdownArr = [];
  maintenancetypeArr = [];

  // Flags
  breakdownFlag = false;
  isDisabled = false;

  maintenancetypeFlag = false;

  // Variables
  getstationid = "";
  getstationname = "";

  getmachineid = "";
  getmachinename = "";

  notificationno = "";
  breakdownid = "";
  breakdownvalue = "";

  maintenancetypeid = "";
  maintenancetypevalue = "";

  // Ionic Select Header
  public breakdownOptions: any = {
    header: this.translate.instant("SUPERVISORDASHBOARD.problem"),
    cssClass: "multiselect",
  };

  public maintenancetypeOptions: any = {
    header: this.translate.instant("SUPERVISORDASHBOARD.maintetnancetype")    ,
    cssClass: "multiselect",
  };

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private translate: TranslateService,
    private alertController: AlertController,
    public modalController: ModalController,
    public partmodalController: ModalController,
    public otherpartmodalController: ModalController,
    public activitymodalController: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private commonservice: AIREIService,
    private supervisorservice: SupervisorService
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

    //console.log(this.params);

    this.getstationid = this.params.stationid;
    this.getstationname = this.params.stationname;

    this.getmachineid = this.params.machineid;
    this.getmachinename = this.params.machinename;

    this.title = this.getstationname;

    this.step1Form = this.fb.group({
      select_breakdown: new FormControl("", Validators.required),
      //select_maintenancetype: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getBreakdown();
  }

  getBreakdown() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      type: 1,
      language: this.languageService.selected,
    };
    console.log(req);
    this.supervisorservice.getBreakdownCodingList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.breakdownArr = resultdata.data;
        console.log(resultdata.data)
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

        this.getMaintenancetype();

        //console.log(this.breakdownArr);
      } else {
        this.breakdownArr = [];

        this.breakdownFlag = false;

        this.getMaintenancetype();
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
    this.supervisorservice.getMaintenanceTypeList(req).then((result) => {
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
      } else {
        this.maintenancetypeArr = [];
      }
    });
  }

  /*onChangeBreakdown() {
    let breakdownid = JSON.parse(this.step1Form.value.select_breakdown).id;

    if (breakdownid == 0) {
      this.maintenancetypeFlag = false;
    } else {
      this.maintenancetypeFlag = true;
    }
  }*/

  breakdownhandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.breakdownid = JSON.parse(value).id;
      this.breakdownvalue = JSON.parse(value).breakdownCoding;

      if (this.breakdownid == "0") {
        this.maintenancetypeFlag = false;
      } else {
        this.maintenancetypeFlag = true;
      }
    } else {
      this.breakdownid = "";
      this.breakdownvalue = "";
    }
  }

  /*maintenancetypehandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.maintenancetypeid = JSON.parse(value).id;
      this.maintenancetypevalue = JSON.parse(value).maintanence_type;
    } else {
      this.maintenancetypeid = "";
      this.maintenancetypevalue = "";
    }
  }*/

  save() {
    if (this.step1Form.value.select_breakdown == "") {
      this.commonservice.presentToast(this.translate.instant("SUPERVISORDASHBOARD.problemmandatory"));
      return;
    }

    this.breakdownid = JSON.parse(this.step1Form.value.select_breakdown).id;
    this.breakdownvalue = JSON.parse(
      this.step1Form.value.select_breakdown
    ).breakdownCoding;

    /*if (this.breakdownid != "0") {
      if (this.step1Form.value.select_maintenancetype == "") {
        this.commonservice.presentToast(
          "Maintenance Type Selection is Mandatory"
        );
        return;
      }

      this.maintenancetypeid = JSON.parse(
        this.step1Form.value.select_maintenancetype
      ).id;
      this.maintenancetypevalue = JSON.parse(
        this.step1Form.value.select_maintenancetype
      ).maintanence_type;
    }*/

    this.modalController.dismiss({
      dismissed: true,
      breakdown_id: this.breakdownid,
      maintenancetype_id: this.maintenancetypeid,
      breakdown_value: this.breakdownvalue,
      maintenancetype_value: this.maintenancetypevalue,
    });
  }

  btn_back() {
    if (this.maintenancetypeFlag) {
      this.getBreakdown();
    }
  }

  btn_close() {
    this.modalController.dismiss({
      dismissed: true,
      item: [],
    });
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
