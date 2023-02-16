import { Component, OnInit } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import * as moment from "moment";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { LanguageService } from "src/app/services/language-service/language.service";
@Component({
  selector: "app-notification-historyscreen",
  templateUrl: "./notification-historyscreen.page.html",
  styleUrls: ["./notification-historyscreen.page.scss"],
})
export class NotificationHistoryscreenPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  today = new Date().toISOString();
  startOfMonth = moment().startOf("month").format("YYYY-MM-DD");

  historyForm;
  historyList = [
    {
      statusName: "CREATED",
      notificationNo: "1234",
      stationname: "Station 1",
      equipment: "Machine 1",
      insDate: "01.11.2022 10:44",
    },
  ];
  stationid = "";
  equipmentid = "";
  partid = "";

  enableflag = false;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router,
    private maintenanceservice: MaintenanceServiceService,
    private commonservice: AIREIService
  ) {
    /*this.stationid = navParams.get("station_id");
      this.equipmentid = navParams.get("equipment_id");
      this.partid = navParams.get("part_id");*/

    this.stationid = this.route.snapshot.paramMap.get("station_id");
    this.equipmentid = this.route.snapshot.paramMap.get("equipment_id");
    this.partid = this.route.snapshot.paramMap.get("part_id");
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this.callAPI();
  }

  callAPI() {
    this.getNotificationHistory();
  }

  getStatusColor(type) {
    let color;

    if (type.toUpperCase() == "CREATED") {
      color = "#F9D6D2";
    } else if (type.toUpperCase() == "INPROGRESS") {
      color = "#FCEBCF";
    } else if (type.toUpperCase() == "MATERIAL REQUESTED") {
      color = "#D4e9F7";
    } else if (type.toUpperCase() == "MATERIAL ISSUED") {
      color = "#EADCEF";
    } else if (type.toUpperCase() == "CLOSED") {
      color = "#D2F9F1";
    }

    //color = "#ededed";

    return color;
  }

  getBorderColor(type) {
    let color;

    if (type.toUpperCase() == "CREATED") {
      color = "#E74C3C";
    } else if (type.toUpperCase() == "INPROGRESS") {
      color = "#F39C12";
    } else if (type.toUpperCase() == "MATERIAL REQUESTED") {
      color = "#3498DB";
    } else if (type.toUpperCase() == "MATERIAL ISSUED") {
      color = "#9B59B6";
    } else if (type.toUpperCase() == "CLOSED") {
      color = "#1ABB9C";
    }

    //color = "#ededed";

    return color;
  }

  getNotificationHistory() {
    var req = {
      userId: this.userlist.userId,
      millcode: this.userlist.millcode,
      stationId: this.stationid,
      equipmentId: this.equipmentid,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice
      .getNotificationTimelineScanDetails(req)
      .then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {
          this.historyList = resultdata.data;
          this.enableflag = false;
        } else {
          this.historyList = [];
          this.enableflag = true;
        }
      });
  }
}
