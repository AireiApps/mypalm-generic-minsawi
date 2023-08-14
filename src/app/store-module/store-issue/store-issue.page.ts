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
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

import { StoreMaterialsearchpagePage } from "../store-materialsearchpage/store-materialsearchpage.page";
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: "app-store-issue",
  templateUrl: "./store-issue.page.html",
  styleUrls: ["./store-issue.page.scss"],
})
export class StoreIssuePage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  filterForm;
  storeform;
  requestList = [];

  selectedUnit = "";
  qrcode;
  barcodelength = 0;

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

  stationid = "";
  stationname = "";
  machineid = "";
  machinename = "";
  partid = "";
  partname = "";
  partprice = "";
  partbal = "";
  issuedtoid = "";
  issuedtoname = "";

  scanstationid = 0;
  scanmachineid = 0;
  scanpartid = 0;

  scanstation = "";
  scanmachine = "";
  scanpart = "";

  stationflag = false;
  machineflag = true;
  partflag = true;
  quantityflag = false;

  params;

  public stationOptions: any = {
    header: "Station",
    cssClass: "multiselect",
  };
  public machineryOptions: any = {
    header: "Machinery",
    cssClass: "multiselect",
  };
  public issuedtoOptions: any = {
    header: "Issued To",
    cssClass: "multiselect",
  };

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public modalController: ModalController,
    public partmodalController: ModalController,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private storeservices: StoreServiceService,
    private barcodeScanner: BarcodeScanner,
    private screenOrientation: ScreenOrientation
  ) {
    this.storeform = this.fb.group({
      station_name: new FormControl("", Validators.required),
      select_location: new FormControl("", Validators.required),
      select_unit: new FormControl("", Validators.required),
      qty: new FormControl("", Validators.required),
      issued_to: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this.getStation();
    //this.getIssuedto();
  }

  ionViewDidEnter() {
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );

    this.storeform.reset();
    this.itemsArr = [];

    this.getStation();
    this.getIssuedto();
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
        if (this.scanmachineid != 0) {
          for (let i = 0; i < this.locationArr.length; i++) {
            if (this.scanmachineid == this.locationArr[i].location_id) {
              this.scanmachine =
                this.locationArr[i].location_id +
                "~" +
                this.locationArr[i].location_name;
              (this.machineid = this.locationArr[i].location_id),
                (this.machinename = this.locationArr[i].location_name);
              break;
            }
          }
        }
        this.machineflag = false;

        if (this.scanpartid != 0) {
          this.partflag = false;
          this.getpartdetails();
        }
      } else {
        this.machineflag = true;
      }
    });
  }
  getIssuedto() {
    const req = {
      millcode: this.userlist.millcode,
    };
    this.storeservices.getIssuedtoList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      // this.profileForm.reset();
      if (resultdata.httpcode == 200) {
        this.issuedtoArr = resultdata.data;
      }
    });
  }

  stationtypehandleChange(e) {
    let value = e.detail.value;
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
      this.storeform.controls.select_location.setValue("");
      this.storeform.controls.qty.setValue("");
      this.storeform.controls.select_unit.setValue("");
      this.storeform.controls.issued_to.setValue("");
      this.selectedUnit = "";
      this.locationArr = [];
      this.issuedtoid = "";
      this.issuedtoname = "";
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
      this.storeform.controls.select_location.setValue("");
      this.storeform.controls.qty.setValue("");
      this.storeform.controls.select_unit.setValue("");
      this.storeform.controls.issued_to.setValue("");
      this.selectedUnit = "";
      this.locationArr = [];
      this.issuedtoid = "";
      this.issuedtoname = "";
      this.machineflag = true;
      //this.getLocation();
    }
  }
  issuedtohandleChange(e) {
    let value = e.detail.value;
    if (value.length > 0) {
      var splitdata = value.split("~");
      this.issuedtoid = splitdata[0];
      this.issuedtoname = splitdata[1];
    } else {
      this.issuedtoid = "";
      this.issuedtoname = "";
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
      this.issuedtoid = "";
      this.issuedtoname = "";
      this.storeform.controls.issued_to.setValue("");
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
      this.issuedtoid = "";
      this.issuedtoname = "";
      this.storeform.controls.issued_to.setValue("");
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
  getpartdetails() {
    const req = {
      station_id: this.stationid,
      machinery_id: this.machineid,
      part_id: this.scanpartid,
      userid: this.userlist.userId,
    };
    console.log(req);

    this.storeservices.getPartsQrcode(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      console.log("Resultdata:", resultdata);
      if (resultdata.httpcode == 200) {
        this.partid = resultdata.data[0].item_id;
        this.partname = resultdata.data[0].item_name;
        this.partprice = resultdata.data[0].item_price;
        this.partbal = resultdata.data[0].item_balance;

        this.selectedUnit = "";

        if (resultdata.data[0].item_unit == "") {
          this.selectedUnit = "No Unit";
        } else {
          this.selectedUnit = resultdata.data[0].item_unit;
        }
        this.quantityflag = true;
      } else {
        this.commonservice.presentToast("Saved Failed!");
      }
    });
  }

  btn_save() {
    let item_id_Arr = [];
    let item_name_Arr = [];
    let item_priceArr = [];
    let station_id_Arr = [];
    let location_id_Arr = [];
    let qty_Arr = [];
    let unit_Arr = [];

    if (this.issuedtoname == "") {
      this.commonservice.presentToast("Issued name is Mandatory");
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
      item_id: item_id_Arr.join(),
      item_name: item_name_Arr.join(),
      item_unit: unit_Arr.join(),
      station_id: station_id_Arr.join(),
      location_id: location_id_Arr.join(),
      qty: qty_Arr.join(),
      issueto: Number(this.issuedtoid),
      price: item_priceArr.join(),
    };
    console.log(req);

    this.storeservices.savestoreissue(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      console.log("Resultdata:", resultdata);
      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast("Saved Successfully!");
        this.getStation();
        this.cleardata();
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
    if (
      this.storeform.value.qty == "" ||
      this.storeform.value.qty == "" ||
      this.storeform.value.qty == null
    ) {
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
    this.storeform.controls.station_name.setValue("");
    this.storeform.controls.select_location.setValue("");
    this.storeform.controls.select_unit.setValue("");
    this.storeform.controls.qty.setValue("");
    this.stationname = "";
    this.stationid = "";
    this.machinename = "";
    this.machineid = "";
    this.partname = "";
    this.itemsArr = [];
    this.partprice = "";
    this.issuedtoid = "";
    this.issuedtoname = "";
    this.scanstation = "";
    this.scanstationid = 0;
    this.scanmachine = "";
    this.scanmachineid = 0;
    this.scanpart = "";
    this.scanpartid = 0;
  }
  scanqrcode() {
    /*this.scanstationid = 5;
    this.scanmachineid = 79;
    this.scanpartid = 10049;
    this.scan_function();*/

    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: this.translate.instant("QRCODESCANNER.prompt"),
      resultDisplayDuration: 500,
      formats: "QR_CODE",
      orientation: "portrait",
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        if (!barcodeData.cancelled) {
          this.qrcode = barcodeData.text;

          var tiltsplit = this.qrcode.split("~");

          if (tiltsplit.length == 2) {
            var station = tiltsplit[0];
            var equipment = tiltsplit[1];

            var stationhypensplit = station.split("-");
            this.scanstationid = stationhypensplit[0];

            var equipmenthypensplit = equipment.split("-");
            this.scanmachineid = equipmenthypensplit[0];

            this.scanpartid = 0;

            this.scan_function();
            //this.uiEnable = true;
          } else if (tiltsplit.length == 3) {
            var station = tiltsplit[0];
            var equipment = tiltsplit[1];
            var part = tiltsplit[2];

            var stationhypensplit = station.split("-");
            this.scanstationid = stationhypensplit[0];

            var equipmenthypensplit = equipment.split("-");
            this.scanmachineid = equipmenthypensplit[0];

            var parthypensplit = part.split("-");
            this.scanpartid = parthypensplit[0];

            this.scan_function();

            //this.uiEnable = true;
          } else {
            //this.uiEnable = false;

            this.commonservice.presentToast(
              this.translate.instant("QRCODESCANNER.invalidbarcode")
            );
          }
        } else {
          //this.uiEnable = false;
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  scan_function() {
    for (let i = 0; i < this.stationArr.length; i++) {
      if (this.scanstationid == this.stationArr[i].station_id) {
        this.scanstation =
          this.stationArr[i].station_id + "~" + this.stationArr[i].station_name;
        (this.stationid = this.stationArr[i].station_id),
          (this.stationname = this.stationArr[i].station_name);
        break;
      }
    }
    this.machineflag = false;
    this.getLocation();
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
