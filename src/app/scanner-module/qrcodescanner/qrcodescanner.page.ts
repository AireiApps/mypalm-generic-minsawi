import { Component, OnInit, NgZone } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
const { PushNotifications } = Plugins;

import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-qrcodescanner",
  templateUrl: "./qrcodescanner.page.html",
  styleUrls: ["./qrcodescanner.page.scss"],
})
export class QrcodescannerPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  millcode = this.userlist.millcode;
  userdesignation = this.userlist.desigId;

  uiEnable = false;

  qrcode;
  departmentid = "";
  stationid = "";
  equipmentid = "";
  partid = "";
  barcodelength = 0;
  count = 0;
  historyForm;
  stationname = "";
  machineryname = "";
  historyList = [];
  tabs_segment;
  enableflag = false;

  segment = "";
  statusArr = [];
  mill_name = this.nl2br(this.userlist.millname);

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    private commonservice: AIREIService,
    private route: ActivatedRoute,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private notifi: AuthGuardService,
    private maintenanceservice: MaintenanceServiceService,
    private fb: FormBuilder
  ) {
    this.historyForm = this.fb.group({
      select_status: new FormControl(""),
    });

    this.stationid = this.route.snapshot.paramMap.get("station_id");
    this.equipmentid = this.route.snapshot.paramMap.get("equipment_id");
    this.partid = this.route.snapshot.paramMap.get("part_id");

    route.params.subscribe((val) => {
      // put the code from `ngOnInit` here
      if (this.tabs_segment == "Corrective Maintenance") {
        this.segment = "CM";
      } else if (this.tabs_segment == "Routine Preventive Maintenance") {
        this.segment = "RoPM";
      } else if (this.tabs_segment == "Replacement Preventive Maintenance") {
        this.segment = "RePM";
      }

      PushNotifications.removeAllDeliveredNotifications();

      this.count = parseInt(localStorage.getItem("badge_count"));
      this.notifi.updateNotification();
      this.updateNotification();
      this.getLiveNotification();
    });

    this.tabs_segment = "Routine Preventive Maintenance";
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
    this.getMaintenanceStatus();
    //this.scanqrcode();
    this.uiEnable = false;
  }

  ionViewWillEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
    this.getMaintenanceStatus();
    //this.scanqrcode();
    this.uiEnable = false;
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);
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
        // alert('Push received: ' + JSON.stringify(notification));
        this.updateNotification();
      }
    );
  }

  btn_Action(item) {
    //this.callmodalcontroller(item);

    this.router.navigate([
      item.path,
      {
        station_id: this.stationid,
        equipment_id: this.equipmentid,
        part_id: this.partid,
      },
    ]);
  }

  scanqrcode() {
    /*this.uiEnable = true;
    this.stationid = "1";
    this.equipmentid = "1";
    this.partid = "0";

    this.getNotificationHistory(this.segment);*/

    this.uiEnable = false;

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

          this.barcodelength = tiltsplit.length;

          if (tiltsplit.length == 1) {
            var station = tiltsplit[0];

            var stationhypensplit = station.split("-");
            this.stationid = stationhypensplit[0];

            this.equipmentid = "0";

            this.partid = "0";

            this.getNotificationHistory(this.segment);

            this.uiEnable = true;
          } else if (tiltsplit.length == 2) {
            var station = tiltsplit[0];
            var equipment = tiltsplit[1];

            var stationhypensplit = station.split("-");
            this.stationid = stationhypensplit[0];

            var equipmenthypensplit = equipment.split("-");
            this.equipmentid = equipmenthypensplit[0];

            this.partid = "0";

            this.getNotificationHistory(this.segment);

            this.uiEnable = true;
          } else if (tiltsplit.length == 3) {
            var station = tiltsplit[0];
            var equipment = tiltsplit[1];
            var part = tiltsplit[2];

            var stationhypensplit = station.split("-");
            this.stationid = stationhypensplit[0];

            var equipmenthypensplit = equipment.split("-");
            this.equipmentid = equipmenthypensplit[0];

            var parthypensplit = part.split("-");
            this.partid = parthypensplit[0];

            this.getNotificationHistory(this.segment);

            this.uiEnable = true;
          } else {
            this.uiEnable = false;
            this.commonservice.presentToast(
              this.translate.instant("QRCODESCANNER.notvalidbarcode")
            );
          }
        } else {
          this.uiEnable = false;
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  onchagestatus() {
    this.getNotificationHistory(this.segment);
  }

  getBorderColor(type) {
    let color;

    /*if (type == "1") 
    {
      color = "#e74c3c";      
    } else if (type == "2") 
    {
      color = "#ffff00";      
    } else if (type == "3") 
    {
      color = "#3498db";      
    } else if (type == "4") 
    {
      color = "#9b59b6";    
    } else if (type == "5") 
    {
      color = "#f39c12";      
    }
    else if (type == "6") 
    {
      color = "#a52a2a";      
    }else if (type == "7") 
    {
      color = "#1abb9c";      
    }else if (type == "8") 
    {
      color = "#616161";      
    }else if (type == "9") 
    {
      color = "#e74c3c";      
    }else if (type == "10") 
    {
      color = "#c71585";      
    }else{
      color = "#ededed";
    }*/

    //color = "#3cd2a5";
    color = "#ff9f0c";

    return color;
  }

  gettextxolor(type) {
    let color;

    if (type == "1") {
      color = "#e74c3c";
    } else if (type == "2") {
      color = "#000000";
    } else if (type == "3") {
      color = "#3498db";
    } else if (type == "4") {
      color = "#9b59b6";
    } else if (type == "5") {
      color = "#f39c12";
    } else if (type == "6") {
      color = "#a52a2a";
    } else if (type == "7") {
      color = "#1abb9c";
    } else if (type == "8") {
      color = "#616161";
    } else if (type == "9") {
      color = "#e74c3c";
    } else if (type == "10") {
      color = "#c71585";
    } else {
      color = "#ededed";
    }
    return color;
  }

  getNotificationHistory(value) {
    let getstatus = this.historyForm.value.select_status;

    var req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      stationid: this.stationid,
      equipmentid: this.equipmentid,
      type: value,
      status: getstatus,
      language: this.languageService.selected,
    };

    console.log("REQ:", req);

    this.maintenanceservice
      .getNotificationHistoryDetails(req)
      .then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          //console.log("Notification:", resultdata);
          this.stationname = resultdata.data.stationname;
          this.machineryname = resultdata.data.machineryname;
          this.historyList = resultdata.data.histoydata;
          this.enableflag = false;
        } else {
          this.stationname = resultdata.data.stationname;
          this.machineryname = resultdata.data.machineryname;
          this.historyList = [];
          this.enableflag = true;
        }
      });
  }

  getMaintenanceStatus() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.maintenanceservice.getMaintenanceStatusList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.statusArr = resultdata.data;
      } else {
        this.statusArr = [];
      }
    });
  }

  getRecords() {
    //console.log(this.tabs_segment);

    if (this.tabs_segment == "Corrective Maintenance") {
      this.segment = "CM";
      this.getNotificationHistory("CM");
    } else if (this.tabs_segment == "Routine Preventive Maintenance") {
      this.segment = "RoPM";
      this.getNotificationHistory("RoPM");
    } else if (this.tabs_segment == "Replacement Preventive Maintenance") {
      this.segment = "RePM";
      this.getNotificationHistory("RePM");
    }
  }

  segmentChanged(ev: any) {
    //console.log("Segment changed", ev.detail.value);
    if (ev.detail.value == "Corrective Maintenance") {
      this.segment = "CM";
      this.getNotificationHistory("CM");
    }
    if (ev.detail.value == "Routine Preventive Maintenance") {
      this.segment = "RoPM";
      this.getNotificationHistory("RoPM");
    }
    if (ev.detail.value == "Replacement Preventive Maintenance") {
      this.segment = "RePM";
      this.getNotificationHistory("RePM");
    }
  }

  getmaintenancesummary(value) {
    this.router.navigate([
      "/production-notification-view",
      { item: JSON.stringify(value) },
    ]);
  }

  gettimeline(value) {
    this.router.navigate([
      "/maintenance-history-timeline",
      { item: JSON.stringify(value) },
    ]);
  }

  goback() {
    this.uiEnable = false;
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
