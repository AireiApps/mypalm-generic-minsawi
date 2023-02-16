import { Component, OnInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "../../services/supervisor-service/supervisor.service";
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { Plugins } from "@capacitor/core";

import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-logsheet-sterilizerstation",
  templateUrl: "./logsheet-sterilizerstation.page.html",
  styleUrls: ["./logsheet-sterilizerstation.page.scss"],
})
export class LogsheetSterilizerstationPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  sterilizerstationlogsheetForm;

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  getDate;
  showDate;

  reportdate = "";

  norecordsflag = false;

  logsheetArr = [];

  /*logsheetArr = [
    {
      millstart_time: "09:00:00",
      millstop_time: "-",
      millstart_date: "29-03-2022",
      data: [
        {
          sterilizerno: "1",
          sterilizername: "Sterilizer No.1",
          sterilizerdata: [
            {
              title: "No. 1",
              cycle1: "Cycle 1",
              cycle2: "Cycle 2",
              cycle3: "Cycle 3",
              cycle4: "Cycle 4",
              cycle5: "Cycle 5",
              cycle6: "Cycle 6",
            },
            {
              title: "Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Fruit Type",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Shut Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Open Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Initial Steam Admission time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Final Blowdown Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Start Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Stop Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
          ],
        },
        {
          sterilizerno: "2",
          sterilizername: "Sterilizer No.2",
          sterilizerdata: [
            {
              title: "No. 2",
              cycle1: "Cycle 1",
              cycle2: "Cycle 2",
              cycle3: "Cycle 3",
              cycle4: "Cycle 4",
              cycle5: "Cycle 5",
              cycle6: "Cycle 6",
            },
            {
              title: "Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Fruit Type",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Shut Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Open Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Initial Steam Admission time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Final Blowdown Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Start Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Stop Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
          ],
        },
        {
          sterilizerno: "3",
          sterilizername: "Sterilizer No.3",
          sterilizerdata: [
            {
              title: "No. 3",
              cycle1: "Cycle 1",
              cycle2: "Cycle 2",
              cycle3: "Cycle 3",
              cycle4: "Cycle 4",
              cycle5: "Cycle 5",
              cycle6: "Cycle 6",
            },
            {
              title: "Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Fruit Type",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Shut Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Open Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Initial Steam Admission time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Final Blowdown Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Start Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Stop Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
          ],
        },
        {
          sterilizerno: "4",
          sterilizername: "Sterilizer No.4",
          sterilizerdata: [
            {
              title: "No. 4",
              cycle1: "Cycle 1",
              cycle2: "Cycle 2",
              cycle3: "Cycle 3",
              cycle4: "Cycle 4",
              cycle5: "Cycle 5",
              cycle6: "Cycle 6",
            },
            {
              title: "Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Fruit Type",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Shut Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Door Open Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Initial Steam Admission time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Final Blowdown Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Start Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
            {
              title: "Cook Stop Time",
              cycle1: "10:00",
              cycle2: "20:00",
              cycle3: "3",
              cycle4: "4",
              cycle5: "5",
              cycle6: "6",
            },
          ],
        },
      ],
    },
  ];*/

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private screenOrientation: ScreenOrientation,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {
    this.reportdate = this.route.snapshot.paramMap.get("reportdate");

    if (this.reportdate == "") {
      this.reportdate = this.currentdate;
    } else {
      this.reportdate = moment(this.reportdate, "YYYY-MM-DD").format(
        "DD-MM-YYYY"
      );
    }

    this.sterilizerstationlogsheetForm = this.fb.group({
      pickdate: new FormControl(this.reportdate),
    });

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getreport();
  }

  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
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
          this.reportdate = val.value;
          this.sterilizerstationlogsheetForm.controls.pickdate.setValue(
            this.reportdate
          );
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  getreport() {
    this.showDate = moment(this.reportdate, "DD-MM-YYYY").format("DD MMM YYYY");

    this.getDate = moment(this.reportdate, "DD-MM-YYYY").format("YYYY-MM-DD");

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      Fromdate: this.getDate,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getlogsheetsterilizationstation(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.logsheetArr = resultdata.data;
        this.norecordsflag = false;
      } else {
        this.logsheetArr = [];
        this.norecordsflag = true;
      }
    });
  }
}
