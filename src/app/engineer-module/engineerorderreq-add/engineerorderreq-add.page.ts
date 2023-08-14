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
import { EngineerServiceService } from "src/app/services/engineer-service/engineer-service.service";
import { Router } from "@angular/router";
import { StoreMaterialsearchpagePage } from "../../store-module/store-materialsearchpage/store-materialsearchpage.page";
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: "app-engineerorderreq-add",
  templateUrl: "./engineerorderreq-add.page.html",
  styleUrls: ["./engineerorderreq-add.page.scss"],
})
export class EngineerorderreqAddPage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  filterForm;
  storeform;
  requestList = [];

  selectedUnit = "";
  qrcode;
  barcodelength = 0;

  typeArr = [
    {
      id: 1,
      type: "Normal",
    },
    {
      id: 2,
      type: "Urgent",
    },
  ];
  stationArr = [];
  locationArr = [];
  itemsArr = [];
  issuedtoArr = [];

  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  typeid = "";
  typename = "";
  request_id = "";
  request_name = "";
  stationid = "";
  stationname = "";
  machineid = "";
  machinename = "";
  partid = "";
  partname = "";
  partprice = "";
  partbal = "";

  stationflag = true;
  machineflag = true;
  partflag = true;
  quantityflag = false;
  typeflag = false;
  requesttypeflag = true;

  params;

  public stationOptions: any = {
    header: "Station",
    cssClass: "multiselect",
  };
  public machineryOptions: any = {
    header: "Machinery",
    cssClass: "multiselect",
  };
  public typeOptions: any = {
    header: "Type",
    cssClass: "multiselect",
  };
  public requesttypeOptions: any = {
    header: "Item Request Type",
    cssClass: "multiselect",
  };
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public modalController: ModalController,
    public partmodalController: ModalController,
    private fb: FormBuilder,
    private router: Router,
    private service: EngineerServiceService,
    private commonservice: AIREIService,
    private storeservices: StoreServiceService,
    private barcodeScanner: BarcodeScanner
  ) {
    this.storeform = this.fb.group({
      type: new FormControl("", Validators.required),
      item_request_type: new FormControl("", Validators.required),
      station_name: new FormControl("", Validators.required),
      select_location: new FormControl("", Validators.required),
      select_unit: new FormControl("", Validators.required),
      qty: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getRequestList();
  }
  ionViewDidEnter() {
    this.getRequestList();
  }
  getRequestList() {
    const req = {
      millcode: this.userlist.millcode,
    };

    this.service.getRequestList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      // this.profileForm.reset();
      if (resultdata.httpcode == 200) {
        this.requestList = resultdata.data;
      }
    });
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
      }
    });
  }

  getLocation() {
    //let station = JSON.parse(this.storeform.value.station_name);

    const req = {
      millcode: this.userlist.millcode,
      stationid: this.stationid,
    };

    this.storeservices.getLocation(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      // this.profileForm.reset();
      if (resultdata.httpcode == 200) {
        this.locationArr = resultdata.data;
        this.machineflag = false;
      } else {
        this.machineflag = true;
      }
    });
  }

  typehandleChange(e) {
    let value = e.detail.value;
    console.log("Value:", value);
    if (value.length > 0) {
      var splitdata = value.split("~");
      this.typeid = splitdata[0];
      this.typename = splitdata[1];
      this.stationid = "";
      this.stationname = "";
      this.machineid = "";
      this.machinename = "";
      this.partid = "";
      this.partname = "";
      this.partprice = "";
      this.partbal = "";
      this.selectedUnit = "";
      this.locationArr = [];
      this.requesttypeflag = false;
    } else {
      this.stationid = "";
      this.stationname = "";
      this.machineid = "";
      this.machinename = "";
      this.partid = "";
      this.partname = "";
      this.partprice = "";
      this.partbal = "";
      this.selectedUnit = "";
      this.requesttypeflag = true;
      this.locationArr = [];
      this.machineflag = true;
    }
  }
  requesttypehandleChange(e) {
    let value = e.detail.value;
    console.log("Value:", value.length);
    if (value.length > 0) {
      var splitdata = value.split("~");
      this.request_id = splitdata[0];
      this.request_name = splitdata[1];
      this.stationid = "";
      this.stationname = "";
      this.machineid = "";
      this.machinename = "";
      this.partid = "";
      this.partname = "";
      this.partprice = "";
      this.partbal = "";
      this.selectedUnit = "";
      this.locationArr = [];
      this.stationflag = false;
      this.getStation();
    } else {
      this.stationid = "";
      this.stationname = "";
      this.machineid = "";
      this.machinename = "";
      this.partid = "";
      this.partname = "";
      this.partprice = "";
      this.partbal = "";
      this.storeform.controls.select_location.setValue("");
      this.storeform.controls.qty.setValue("");
      this.storeform.controls.select_unit.setValue("");
      this.storeform.controls.issued_to.setValue("");
      this.selectedUnit = "";
      this.stationflag = true;
      this.locationArr = [];
      this.machineflag = true;
      this.getStation();
    }
  }

  stationtypehandleChange(e) {
    let value = e.detail.value;
    console.log("Value:", value.length);
    if (value.length > 0) {
      var splitdata = value.split("~");
      this.stationid = splitdata[0];
      this.stationname = splitdata[1];
      this.machineid = "";
      this.machinename = "";
      this.partid = "";
      this.partname = "";
      this.partprice = "";
      this.partbal = "";
      this.selectedUnit = "";
      this.locationArr = [];
      this.machineflag = false;
      this.getLocation();
    } else {
      this.stationid = "";
      this.stationname = "";
      this.machineid = "";
      this.machinename = "";
      this.partid = "";
      this.partname = "";
      this.partprice = "";
      this.partbal = "";
      this.selectedUnit = "";
      this.locationArr = [];
      this.machineflag = true;
    }
  }

  machinetypehandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      var splitdata = value.split("~");
      this.machineid = splitdata[0];
      this.machinename = splitdata[1];
      this.selectedUnit = "";
      this.storeform.controls.select_unit.setValue("");
      this.partflag = false;
      this.partid = "";
      this.partname = "";
      this.partbal = "";
      this.quantityflag = false;
    } else {
      this.machineid = "";
      this.machinename = "";
      this.selectedUnit = "";
      this.storeform.controls.select_unit.setValue("");
      this.partflag = true;
      this.partid = "";
      this.partbal = "";
      this.partname = "";
      this.quantityflag = false;
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
          console.log("Datas:", this.params);
          this.partid = this.params.item_id;
          this.partname = this.params.item_name;
          this.partprice = this.params.item_price;
          this.partbal = this.params.item_balance;

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

  btn_save() {
    let item_id_Arr = [];
    let item_name_Arr = [];
    let item_priceArr = [];
    let station_id_Arr = [];
    let location_id_Arr = [];
    let qty_Arr = [];
    let unit_Arr = [];

    if (this.storeform.value.type == "") {
      this.commonservice.presentToast("Type is Mandatory");
      return;
    }
    if (this.storeform.value.item_request_type == "") {
      this.commonservice.presentToast("Item Request Type is Mandatory");
      return;
    }

    for (let i = 0; i < this.itemsArr.length; i++) {
      const eachitem = this.itemsArr[i].part_id;
      const eachitemname = this.itemsArr[i].part_name;
      const eachitemprice = this.itemsArr[i].part_price;
      const eachstation = this.itemsArr[i].station_id;
      const eachlocation = this.itemsArr[i].machine_id;
      const eachqty = this.itemsArr[i].quantity;
      const eachunit = this.itemsArr[i].unit;

      item_id_Arr.push(eachitem);
      item_name_Arr.push(eachitemname);
      station_id_Arr.push(eachstation);
      location_id_Arr.push(eachlocation);
      qty_Arr.push(eachqty);
      unit_Arr.push(eachunit);
      item_priceArr.push(eachitemprice);
    }
    console.log("eachitem:", item_id_Arr);
    const req = {
      dept_id: this.userlist.dept_id,
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      type: Number(this.typeid),
      request_type_id: this.request_id,
      item_id: item_id_Arr.join(),
      item_name: item_name_Arr.join(),
      item_unit: unit_Arr.join(),
      station_id: station_id_Arr.join(),
      location_id: location_id_Arr.join(),
      qty: qty_Arr.join(),
      price: item_priceArr.join(),
    };
    console.log(req);

    this.service.saveSOR(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast("Saved Successfully!");
        this.cleardata();
        this.getRequestList();
        this.getStation();

        this.router.navigate(["/engineerorderreqlist"]);
      } else {
        this.cleardata();
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

  addNewRow() {
    if (this.storeform.value.station_name == "") {
      this.commonservice.presentToast("Station name is Mandatory");
      return;
    }
    if (this.storeform.value.select_location == "") {
      this.commonservice.presentToast("Machinery name is Mandatory");
      return;
    }
    if (this.partname == "") {
      this.commonservice.presentToast("Part name is Mandatory");
      return;
    }
    if (this.storeform.value.qty == "") {
      this.commonservice.presentToast("Quantity is Mandatory");
      return false;
    }

    for (let i = 0; i < this.itemsArr.length; i++) {
      let itempartid = this.itemsArr[i].part_id;
      if (this.partid == itempartid) {
        this.commonservice.presentToast(this.partname + "is already exist");
        return false;
      }
    }

    let reqjson = {
      station_name: this.stationname,
      station_id: this.stationid,
      machine_name: this.machinename,
      machine_id: this.machineid,
      part_name: this.partname,
      part_id: this.partid,
      part_price: this.partprice,
      quantity: this.storeform.value.qty,
      unit: this.selectedUnit,
    };
    this.itemsArr.push(reqjson);
    this.storeform.controls.select_location.setValue("");
    this.storeform.controls.select_unit.setValue("");
    this.storeform.controls.qty.setValue("");
    this.quantityflag = false;
  }

  deleteRow(index: number) {
    if (index !== -1) {
      this.itemsArr.splice(index, 1);
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
  cleardata() {
    this.stationname = "";
    this.stationid = "";
    this.machinename = "";
    this.machineid = "";
    this.partname = "";
    this.itemsArr = [];
    this.partprice = "";
    this.typeid = "";
    this.typename = "";
    this.request_id = "";
    this.request_name = "";
    this.storeform.controls.type.setValue("");
    this.storeform.controls.item_request_type.setValue("");
    this.storeform.controls.station_name.setValue("");
    this.storeform.controls.select_location.setValue("");
    this.storeform.controls.select_unit.setValue("");
  }

  onChangeqty() {
    if (this.storeform.value.qty != "") {
      if (this.storeform.value.qty > this.partbal) {
        this.commonservice.presentToast("Out of stock");
        this.storeform.controls.qty.setValue("");
      } else if (this.storeform.value.qty < 0) {
        this.storeform.controls.qty.setValue("");
      }
    }
  }
}
