import { Component, OnInit, NgZone } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { Plugins } from "@capacitor/core";
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-lab-oillosses-list",
  templateUrl: "./lab-oillosses-list.page.html",
  styleUrls: ["./lab-oillosses-list.page.scss"],
})
export class LabOillossesListPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  departmentid = this.userlist.dept_id;

  oillossesForm;

  oillosseslistArr = [];
  /*oillosseslistArr = [
    {
      date: "27-12-2022",
      oillossdate: "2022-12-27",
      id: 936,
      time: "12:00",
      pressdata: [
        {
          name: "Press No.1",
          value: "10",
        },
        {
          name: "Press No.2",
          value: "20",
        },
        {
          name: "Press No.3",
          value: "30",
        },
        {
          name: "Press No.4",
          value: "40",
        },
        {
          name: "Press No.5",
          value: "50",
        },
      ],
    },
  ];*/

  enableflag = false;
  pleasewaitflag = false;

  fromdate = moment(
    new Date(new Date().getTime() + -7 * 24 * 60 * 60 * 1000).toISOString()
  ).format("DD-MM-YYYY");

  todate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  filterTerm: string;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private commonservice: AIREIService,
    private service: MaintenanceServiceService
  ) {
    this.oillossesForm = this.fb.group({
      txt_fromdate: new FormControl(this.fromdate),
      txt_todate: new FormControl(this.todate),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getOilLosses();
  }

  openDateTimePicker(type) {
    if (type == "FD") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.fromdate,
        theme: "dark",
        doneText: this.translate.instant("GENERALBUTTON.done"),
        cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
      }).then(
        (val) => {
          if (val.value) {
            this.fromdate = val.value;
            this.oillossesForm.controls.txt_fromdate.setValue(this.fromdate);
          }
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }

    if (type == "TD") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.todate,
        theme: "dark",
        doneText: this.translate.instant("GENERALBUTTON.done"),
        cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
      }).then(
        (val) => {
          if (val.value) {
            this.todate = val.value;
            this.oillossesForm.controls.txt_todate.setValue(this.todate);
          }
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }
  }

  getOilLosses() {
    let getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    let gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");

    this.oillosseslistArr = [];
    this.enableflag = false;
    this.pleasewaitflag = true;

    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      fromdate: getfromdate,
      todate: gettodate,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getOilLossesList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.oillosseslistArr = resultdata.data;
        this.enableflag = false;
        this.pleasewaitflag = false;
      } else {
        this.oillosseslistArr = [];
        this.enableflag = true;
        this.pleasewaitflag = false;
      }
    });
  }

  btn_OilLossesNew() {
    this.router.navigate(["/lab-oillosses"]);
  }

  btn_OilLossesEdit(value) {
    this.router.navigate([
      "/lab-oillosses-edit",
      { item: JSON.stringify(value) },
    ]);
  }

  btn_OilLossesDelete(value) {
    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: value.id,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.deleteOilLosses(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.getOilLosses();
      } else {
        this.commonservice.presentToast(this.translate.instant("OILLOSSESSREPORT.failedtodelete"));
      }
    });
  }
}
