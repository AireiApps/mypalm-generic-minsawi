import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { Router } from "@angular/router";
import { ModalController, AlertController } from "@ionic/angular";
import * as moment from "moment";

// Modal Pages - Start
import { MaintenanceNotificationModalPage } from "src/app/maintenance-module/maintenance-notification-modal/maintenance-notification-modal.page";
// Modal Pages - End

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-production-notification-new",
  templateUrl: "./production-notification-new.page.html",
  styleUrls: ["./production-notification-new.page.scss"],
})
export class ProductionNotificationNewPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.userlist.millname;

  filterForm;
  dashboardForm;

  productionflag = 0;

  uienable = false;
  pleasewaitflag = false;

  stationlistArr = [];
  filterstationsArr = [];
  stationsArr = [];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private supervisorservice: SupervisorService
  ) {
    this.filterForm = this.fb.group({
      select_station: new FormControl(""),
    });

    this.dashboardForm = this.fb.group({
      select_station: new FormControl(""),
      txt_millproductionstatus: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.filterForm.controls.select_station.setValue("");

    this.getStation();
  }

  getBackGroundColor(status) {
    let color;

    if (status == "1") {
      //color = "#E6FFE6";
      color =
        "linear-gradient(to right top, #74d217, #8bd847, #a0dd69, #b4e388, #c6e8a5, #c8e8a8, #cae9ac, #cce9af, #bfe599, #b1e183, #a2dd6c, #93d954)";
    } else if (status == "0") {
      //color = "#FFBFBF";
      color =
        "linear-gradient(to right top, #ea2c2c, #ef4444, #f3585a, #f56b6f, #f67d83, #f68086, #f5838a, #f5868d, #f57c81, #f57175, #f46769, #f35c5c)";
    } else {
      color = "#F4F4F4";
    }

    return color;
  }

  onChangeStation() {
    var searchedstationid = this.filterForm.value.select_station;

    var item = this.filterstationsArr.filter(
      (item) => item.stationid === parseInt(searchedstationid)
    );

    if (searchedstationid == "") {
      this.stationsArr = this.filterstationsArr;
    } else {
      this.stationsArr = item;
    }
  }

  getStation() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getStationList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.stationlistArr = resultdata.data;

        this.getProductionStatus();
      } else {
        this.stationlistArr = [];

        this.getProductionStatus();
      }
    });
  }

  getProductionStatus() {
    this.pleasewaitflag = true;

    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    this.supervisorservice.getProductionStartStopStatus(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.productionflag = resultdata.data[0].status;

        if (this.productionflag == 1) {
          this.dashboardForm.controls.txt_millproductionstatus.setValue(this.translate.instant("PRODUCTIONNOTIFICATIONNEW.running"));
        } else {
          this.dashboardForm.controls.txt_millproductionstatus.setValue(this.translate.instant("PRODUCTIONNOTIFICATIONNEW.stopped"));
        }
        this.getStations();
      } else {
        this.productionflag = 0;

        this.getStations();
      }
    });
  }

  getStations() {
    let req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      language: this.languageService.selected,
    };

    this.supervisorservice.getProductionStaions(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.stationsArr = resultdata.data;

        this.filterstationsArr = this.stationsArr;

        if (this.productionflag == 1) {
          this.uienable = true;
        } else {
          this.uienable = false;
        }

        this.pleasewaitflag = false;
      } else {
        this.stationsArr = [];

        this.filterstationsArr = this.stationsArr;

        this.uienable = false;

        this.pleasewaitflag = false;
      }
    });
  }

  btn_Action(value) {
    this.router.navigate([
      "/maintenance-dashboard-correctivemaintenance",
      { item: JSON.stringify(value) },
    ]);
  }

  async callmodalcontroller(value) {
    const modal = await this.modalController.create({
      component: MaintenanceNotificationModalPage,
      componentProps: {
        item: JSON.stringify(value),
        module: "PRODUCTION",
      },
      showBackdrop: true,
      backdropDismiss: false,
      cssClass: ["notification-modal"],
    });

    modal.onDidDismiss().then((data) => {
      //this.ngAfterViewInit();
    });

    return await modal.present();
  }
}
