import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  FormGroup,
} from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
import { StoreServiceService } from "src/app/services/store-service/store-service.service";
import { StoreMaterialsearchpagePage } from "../store-materialsearchpage/store-materialsearchpage.page";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: "app-store-check-page",
  templateUrl: "./store-check-page.page.html",
  styleUrls: ["./store-check-page.page.scss"],
})
export class StoreCheckPagePage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  storecheckform;
  params;

  stationid = "";
  stationname = "";
  machineid = "";
  machinename = "";
  partid = "";
  partname = "";
  selectedUnit = "";

  stationflag = false;
  machineflag = true;
  partflag = true;
  quantityflag = false;

  stationArr = [];
  locatioArr = [];
  itemsArr = [];
  checkitemdetails = [];

  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  public stationOptions: any = {
    header: "Station",
    cssClass: "multiselect",
  };
  public machineryOptions: any = {
    header: "Machinery",
    cssClass: "multiselect",
  };

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public modalController: ModalController,
    public partmodalController: ModalController,
    private fb: FormBuilder,
    private screenOrientation: ScreenOrientation,
    private commonservice: AIREIService,
    private storeservices: StoreServiceService
  ) {
    this.storecheckform = this.fb.group({
      station_name: new FormControl("", Validators.required),
      select_location: new FormControl("", Validators.required),
      select_unit: new FormControl("", Validators.required),
      qty: new FormControl("", Validators.required),
      itemRows: this.fb.array([]),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this.getStation();
  }

  ionViewDidEnter() {
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );

    this.stationArr = [];
    this.locatioArr = [];
    this.itemsArr = [];
    this.checkitemdetails = [];

    this.storecheckform.reset();

    this.getStation();
  }

  getStation() {
    const req = {
      millcode: this.userlist.millcode,
    };
    this.storeservices.getStationList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      // this.profileForm.reset();
      if (resultdata.httpcode == 200) {
        this.stationArr = resultdata.data;
        this.stationflag = false;
      } else {
        this.stationflag = true;
      }
    });
  }

  getLocation() {
    let station = JSON.parse(this.storecheckform.value.station_name);

    if (typeof station !== "undefined" && station !== null) {
      const req = {
        millcode: this.userlist.millcode,
        stationid: station.station_id,
      };

      this.storeservices.getLocation(req).then((result) => {
        let resultdata: any;
        resultdata = result;
        console.log("Result:", resultdata);
        if (resultdata.httpcode == 200) {
          this.locatioArr = resultdata.data;
          this.machineflag = false;
        } else {
          this.machineflag = true;
        }
      });
    }
  }

  stationtypehandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      console.log("Value:", value);
      this.stationid = JSON.parse(value).station_id;
      this.stationname = JSON.parse(value).station_name;
      this.selectedUnit = "";
      this.locatioArr = [];
      this.storecheckform.controls.select_location.setValue("");
      this.storecheckform.controls.select_unit.setValue("");
      this.machineflag = true;
      this.getLocation();
    } else {
      this.stationid = "";
      this.stationname = "";
      this.selectedUnit = "";
      this.locatioArr = [];
      this.storecheckform.controls.select_location.setValue("");
      this.storecheckform.controls.select_unit.setValue("");
      this.machineflag = false;
      this.getLocation();
    }
  }
  machinetypehandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      this.machineid = JSON.parse(value).location_id;
      this.machinename = JSON.parse(value).location_name;
      this.selectedUnit = "";
      this.storecheckform.controls.select_unit.setValue("");
      this.partflag = false;
    } else {
      this.machineid = "";
      this.machinename = "";
      this.selectedUnit = "";
      this.storecheckform.controls.select_unit.setValue("");
      this.partflag = true;
    }
  }
  async callmodalcontroller(type) {
    if (type == "PartDefect") {
      const partmodal = await this.partmodalController.create({
        component: StoreMaterialsearchpagePage,
        componentProps: {
          type: "0",
          station_id: this.stationid,
          equipment_id: this.machineid,
          title: "Search Part",
        },
      });

      partmodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        if (viewform != "") {
          this.params = JSON.parse(viewform);
          this.partid = this.params.item_id;
          this.partname = this.params.item_name;

          this.selectedUnit = "";

          if (this.params.item_unit == "") {
            this.selectedUnit = "No Unit";
          } else {
            this.selectedUnit = this.params.item_unit;
          }

          this.quantityflag = true;
        }
      });

      return await partmodal.present();
    }
  }

  btn_check() {
    if (this.storecheckform.value.station_name == "") {
      this.commonservice.presentToast("Station name is Mandatory");
      return;
    }
    if (this.storecheckform.value.select_location == "") {
      this.commonservice.presentToast("Machinery name is Mandatory");
      return;
    }
    if (this.partname == "") {
      this.commonservice.presentToast("Part name is Mandatory");
      return;
    }
    const req = {
      partsid: String(this.partid),
      stationid: String(this.stationid),
      locationid: String(this.machineid),
      language: "English",
    };
    console.log(req);

    this.storeservices.getChecklistItems(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      console.log("Resultdata:", resultdata);
      if (resultdata.httpcode == 200) {
        this.checkitemdetails = resultdata.data;
        this.partname = "";
        this.getStation();
      } else {
        this.commonservice.presentToast("Saved Failed!");
      }
    });
  }
  clear(type) {
    if (type == "Part") {
      this.partid = "";
      this.partname = "";
    }
  }
  parseString(item) {
    return JSON.stringify(item);
  }
  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
  cleardata() {
    this.storecheckform.controls.station_name.setValue("");
    this.storecheckform.controls.select_location.setValue("");
    this.stationname = "";
    this.machinename = "";
    this.partname = "";
  }
}
