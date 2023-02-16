import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { ModalController, AlertController, IonContent } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { LanguageService } from "src/app/services/language-service/language.service";
@Component({
  selector: "app-maintenance-notification-materialrequest",
  templateUrl: "./maintenance-notification-materialrequest.page.html",
  styleUrls: ["./maintenance-notification-materialrequest.page.scss"],
})
export class MaintenanceNotificationMaterialrequestPage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  preventivemaintenanceForm;

  stationArr = [];
  equipmentArr = [];
  notificationtypeArr = [];
  breakdowncodingArr = [];
  maintenancetypeArr = [];
  partdefectArr = [];
  otherpartdefectArr = [];
  damageArr = [];
  breakdowncausesArr = [];
  generalArr = [];
  existingactivityArr = [];
  existingmaterialArr = [];

  activityArr = [];
  carryoutbyArr = [];
  existingcarriedoutby = [];
  getcarriedoutby = [];
  checkedItems = [];
  tasklistArr = [];
  assignedtoArr = [];

  params;

  activity = "";
  stationid = "";
  stationname = "";
  equipmentid = "";
  equipmentname = "";
  problem = "";
  notificationnumber = "";
  malfunctionstarttime = "";
  malfunctionstoptime = "";
  notificationtypeid = "";
  notificationtypename = "";
  breakdowncodingid = "";
  breakdowncodingname = "";
  maintanencetypeid = "";
  maintanencetypename = "";
  partdefectid = "";
  partdefectname = "";
  damageid = "";
  damagename = "";
  statusid = "";

  breakdowncauseid = "";
  breakdowncausename = "";

  carryoutby = "";
  tasklistflag = "";
  notificationid = "";

  getpartdefect = "";
  getpartdefectid = "";

  getotherpartdefect = "";
  getotherpartdefectid = "";

  getmaterialid = "";
  getmaterial = "";
  getmaterialunit = "";

  startstopstatus = 0;
  tasklist = 0;

  partflag = true;
  orflag = true;
  otherspartflag = false;
  partnameuienableflag = false;
  materialissuanceflag = true;
  isDisabled = false;

  getmaterialArr = [];

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  currentdatetime = moment(new Date().toISOString()).format("DD-MM-YYYY HH:mm");

  startdatetime = new Date().toISOString();
  enddatetime = new Date().toISOString();

  fromscreen = "";

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private maintenanceservice: MaintenanceServiceService
  ) {
    let viewform = this.route.snapshot.paramMap.get("item");
    this.params = JSON.parse(viewform);

    this.stationid = this.params.stationid;
    this.stationname = this.params.stationname;
    this.equipmentid = this.params.equipmentid;
    this.equipmentname = this.params.equipmentname;
    this.statusid = this.params.statusId;
    this.notificationid = this.params.id;

    this.preventivemaintenanceForm = this.fb.group({
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
        this.getNotificationView();
      } else {
        this.assignedtoArr = [];
        this.getNotificationView();
      }
    });
  }

  getNotificationView() {
    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: this.notificationid,
      statusid: this.statusid,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.getNotificationView(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.generalArr = resultdata.data.general;

        this.problem = this.generalArr[0].problem;
        this.notificationnumber = this.generalArr[0].notificationno;

        this.malfunctionstarttime = this.generalArr[0].startdateandtime;

        this.malfunctionstoptime = this.generalArr[0].enddateandtime;

        this.notificationtypeid = this.generalArr[0].notificationtypeid;
        this.notificationtypename = this.generalArr[0].notificationtype;
        this.breakdowncodingid = this.generalArr[0].breakdowncodingid;
        this.breakdowncodingname = this.generalArr[0].breakdowncoding;
        this.maintanencetypeid = this.generalArr[0].maintenancetypeid;
        this.maintanencetypename = this.generalArr[0].maintenancetype;
        this.partdefectid = this.generalArr[0].partdefectid;
        this.partdefectname = this.generalArr[0].partdefect;
        this.damageid = this.generalArr[0].damagesidnew;
        this.damagename = this.generalArr[0].damages;
        this.breakdowncauseid = this.generalArr[0].breakdowncausesidnew;
        this.breakdowncausename = this.generalArr[0].breakdowncauses;

        this.existingactivityArr = resultdata.data.Operation;
        this.existingmaterialArr = resultdata.data.Issuance;

        if (this.existingactivityArr.length > 0) {
          for (let i = 0; i < this.existingactivityArr.length; i++) {
            this.carryoutby = this.existingactivityArr[i].carryoutby_name;
          }
        }
      } else {
        this.generalArr = [];
        this.existingactivityArr = [];
        this.carryoutby = "";
        this.existingmaterialArr = [];
      }
    });
  }

  async showalert() {
    if (
      this.checkedItems.length != this.existingmaterialArr.length &&
      this.statusid == "3"
    ) {
      this.commonservice.presentToast("Please Verify Materials");
      return;
    }

    if (this.preventivemaintenanceForm.value.select_assignedto == "") {
      this.commonservice.presentToast("Assigned To is Mandatory");
      return;
    }

    const alert = await this.alertController.create({
      header: "Alert!",
      cssClass: "alertmessage",
      message: "Are you sure, you want to update this Corrective Maintenance?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (cancel) => {},
        },
        {
          text: "Sure",
          handler: () => {
            this.save();
          },
        },
      ],
    });

    await alert.present();
  }

  onChange(item) {
    if (this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value) => value != item);
    } else {
      this.checkedItems.push(item);
    }
  }

  save() {
    let user_assignedto = "";

    let id_Arr = [];
    let partscode_Arr = [];
    let partsid_Arr = [];
    let partsname_Arr = [];
    let quantity_Arr = [];
    let unit_Arr = [];

    var getcurrentdate = moment(new Date().toISOString()).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    if (this.existingmaterialArr.length > 0) {
      for (let i = 0; i < this.existingmaterialArr.length; i++) {
        id_Arr.push(this.existingmaterialArr[i].id);
        partscode_Arr.push(this.existingmaterialArr[i].partsCode);
        partsid_Arr.push(this.existingmaterialArr[i].partsId);
        partsname_Arr.push(this.existingmaterialArr[i].partsName);
        quantity_Arr.push(this.existingmaterialArr[i].quantity);
        unit_Arr.push(this.existingmaterialArr[i].unit);
      }
    }

    user_assignedto =
      this.preventivemaintenanceForm.value.select_assignedto.join(",");

    this.isDisabled = true;

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      notification_id: this.notificationid,
      station: this.stationid,
      equipment: this.equipmentid,
      id: id_Arr.join("~"),
      partscode: partscode_Arr.join("~"),
      partsid: partsid_Arr.join("~"),
      partsname: partsname_Arr.join("~"),
      quantity: quantity_Arr.join("~"),
      unit: unit_Arr.join("~"),
      statusid: this.statusid,
      assignedto: user_assignedto,
      date: getcurrentdate,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.saveAssignedTo(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.preventivemaintenanceForm.reset();

        this.isDisabled = false;

        this.commonservice.presentToast(
          "Corrective Maintenance Assigned Successfully"
        );

        this.router.navigate(["/maintenance-notification-list"]);
      } else {
        this.isDisabled = false;

        this.commonservice.presentToast(
          "Corrective Maintenance Updation Failed"
        );
      }
    });
  }

  getItembyKey(key, itemRow, param) {
    const eachitem = JSON.parse(itemRow.get(key).value);
    return eachitem[param];
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
