import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { LanguageService } from "src/app/services/language-service/language.service";

@Component({
  selector: "app-production-notification-view",
  templateUrl: "./production-notification-view.page.html",
  styleUrls: ["./production-notification-view.page.scss"],
})
export class ProductionNotificationViewPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  millcode = this.userlist.millcode;

  params;
  notificationid = "";

  generalArr = [];
  issuanceArr = [];
  operationArr = [];
  tasklistArr = [];

  notificationstatus = "";
  notificationstatusid = "";
  notificationno = "";
  type = "";
  stationcode = "";
  station = "";
  runninghours = "";
  equipment = "";
  reportedby = "";
  notificationtype = "";
  breakdowncoding = "";
  maintenancetype = "";
  partdefect = "";
  damage = "";
  breakdowncauses = "";
  createddatetime = "";
  activity = "";
  carriedoutby = "";
  verifiedby = "";
  partreceiveddatetime = "";
  activitycompletiondatetime = "";
  authorizedby = "";
  authorizeddatetime = "";
  fromscreen = "";

  // Flag
  detailsnorecordFlag = false;
  repairactivitynorecordFlag = false;
  jobauthorizationnorecordFlag = false;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private supervisorservice: SupervisorService
  ) {
    let viewform = this.route.snapshot.paramMap.get("item");
    this.params = JSON.parse(viewform);
    this.notificationid = this.params.id;

    if (
      this.route.snapshot.paramMap.get("from") !== "undefined" &&
      this.route.snapshot.paramMap.get("from") !== null
    ) {
      this.fromscreen = this.route.snapshot.paramMap.get("from");
    }
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getNotificationView();
  }

  ionViewDidEnter() {
    this.getNotificationView();
  }

  getNotificationView() {
    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: this.notificationid,
      language: this.languageService.selected,
    };

    console.log(req);

    this.supervisorservice.getNotificationView(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.generalArr = resultdata.data.general;

        this.notificationstatus = this.generalArr[0].statusname;
        this.notificationstatusid = this.generalArr[0].statusId;
        this.notificationno = this.generalArr[0].notificationno;
        this.stationcode = this.generalArr[0].stationcode;
        this.notificationtype = this.generalArr[0].notificationtype;
        this.breakdowncoding = this.generalArr[0].breakdowncoding;
        this.maintenancetype = this.generalArr[0].maintenancetype;

        this.station = this.generalArr[0].stationname;
        this.equipment = this.generalArr[0].equipment;
        this.runninghours = this.generalArr[0].runningHours;
        this.partdefect = this.generalArr[0].partdefect;
        this.damage = this.generalArr[0].damages;
        this.breakdowncauses = this.generalArr[0].breakdowncauses;
        this.createddatetime = this.generalArr[0].insDate;
        this.reportedby = this.generalArr[0].reportBy;

        if (
          this.station == "" &&
          this.equipment == "" &&
          this.runninghours == "" &&
          this.partdefect == "" &&
          this.damage == "" &&
          this.breakdowncauses == "" &&
          this.createddatetime
        ) {
          this.detailsnorecordFlag = true;
        }

        this.activity = this.generalArr[0].activity;
        this.partreceiveddatetime = this.generalArr[0].partreceiveddatetime;
        this.activitycompletiondatetime =
          this.generalArr[0].workcompletiondatetime;
        this.carriedoutby = this.generalArr[0].carriedoutby;
        this.verifiedby = this.generalArr[0].verifiedby;
        if (
          this.activity == "" &&
          this.partreceiveddatetime == "" &&
          this.activitycompletiondatetime == "" &&
          this.carriedoutby == "" &&
          this.verifiedby == ""
        ) {
          this.repairactivitynorecordFlag = true;
        }

        this.authorizedby = this.generalArr[0].authorisedBy;
        this.authorizeddatetime = this.generalArr[0].acknowledgeddatetime;

        if (this.authorizedby == "" && this.authorizeddatetime == "") {
          this.jobauthorizationnorecordFlag = true;
        }

        this.tasklistArr = resultdata.data.tasklist;

        if (
          typeof this.tasklistArr == "undefined" ||
          this.tasklistArr == null
        ) {
          this.tasklistArr = [];
        }
      } else {
        this.generalArr = [];

        this.notificationstatus = "";
        this.notificationstatusid = "";
        this.notificationno = "";
        this.stationcode = "";
        this.notificationtype = "";
        this.breakdowncoding = "";
        this.maintenancetype = "";

        this.station = "";
        this.equipment = "";
        this.runninghours = "";
        this.partdefect = "";
        this.damage = "";
        this.breakdowncauses = "";
        this.createddatetime = "";

        this.activity = "";
        this.partreceiveddatetime = "";
        this.activitycompletiondatetime = "";

        this.carriedoutby = "";
        this.verifiedby = "";

        this.reportedby = "";
        this.authorizedby = "";
        this.authorizeddatetime = "";

        this.tasklistArr = [];
      }
    });
  }
}
