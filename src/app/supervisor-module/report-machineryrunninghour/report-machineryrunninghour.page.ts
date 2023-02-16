import { Component, OnInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "../../services/supervisor-service/supervisor.service";
import * as moment from "moment";
import { FormBuilder, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

// Custom Datepicker
import { Plugins } from "@capacitor/core";
import { LanguageService } from "src/app/services/language-service/language.service";
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-report-machineryrunninghour",
  templateUrl: "./report-machineryrunninghour.page.html",
  styleUrls: ["./report-machineryrunninghour.page.scss"],
})
export class ReportMachineryrunninghourPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  macineriesForm;

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  fromdate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  getDate;

  millstartdate = "";
  millstopdate = "";
  millstarttime = "";
  millstoptime = "";

  generalArr = [];
  stationsArr = [];
  /*machinerunninghoursArr = [
    {
      milldata: [
        {
          start_date: "10-10-2022",
          start_time: "14:36:36",
          stop_date: "10-10-2022",
          stop_time: "15:01:25",
        },
      ],
      data: [
        {
          count: 1,
          title: "RECEPTION STATION",
          stationname: "RECEPTION STATION",
          stationid: 1,
          machines: [
            {
              date: "12-10-2022",
              runninghours: 0,
              machineid: 478,
              reducedrunninghours: "0.0",
              count: 1,
              machinename: "Submerged Ash Conveyor Boiler 1",
              todaterunninghours: "39.9",
              stationname: "RECEPTION STATION",
              stationid: 1,
            },
            {
              date: "12-10-2022",
              runninghours: 0,
              machineid: 479,
              reducedrunninghours: "0.0",
              count: 1,
              machinename: "Boiler Ash Conveyor Boiler 3",
              todaterunninghours: "40.1",
              stationname: "RECEPTION STATION",
              stationid: 1,
            },
          ],
        },
        {
          count: 1,
          title: "FRUIT HANDLING STATION",
          stationname: "FRUIT HANDLING STATION",
          stationid: 2,
          machines: [
            {
              date: "12-10-2022",
              runninghours: 0,
              machineid: 15,
              reducedrunninghours: "0.0",
              count: 2,
              machinename: "FFB Conveyor Ramp A",
              todaterunninghours: "3545.88",
              stationname: "FRUIT HANDLING STATION",
              stationid: 2,
            },
            {
              date: "12-10-2022",
              runninghours: 0,
              machineid: 16,
              reducedrunninghours: "0.0",
              count: 2,
              machinename: "FFB Conveyor Ramp B",
              todaterunninghours: "4770.69",
              stationname: "FRUIT HANDLING STATION",
              stationid: 2,
            },
          ],
        },
      ],
    },
  ];*/

  norecordsflag = false;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private screenOrientation: ScreenOrientation,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {
    this.macineriesForm = this.fb.group({
      pickdate: new FormControl(this.currentdate),
    });
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getreport();
  }

  ngOnDestroy() {
    /*this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );*/
  }

  openDateTimePicker() {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      max: this.currentdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          this.fromdate = val.value;
          this.macineriesForm.controls.pickdate.setValue(this.fromdate);
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  getreport() {
    this.getDate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      Fromdate: this.getDate,
      type: "1",
      language: this.languageService.selected,
    };

    this.service.getmachinerierunninghoursvalue(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.generalArr = resultdata.data.milldata;
        this.stationsArr = resultdata.data.stations;

        this.norecordsflag = false;
      } else {
        this.generalArr = [];
        this.stationsArr = [];

        this.norecordsflag = true;
      }
    });
  }
}
