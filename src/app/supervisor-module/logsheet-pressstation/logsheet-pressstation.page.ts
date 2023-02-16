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
  selector: "app-logsheet-pressstation",
  templateUrl: "./logsheet-pressstation.page.html",
  styleUrls: ["./logsheet-pressstation.page.scss"],
})
export class LogsheetPressstationPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  pressstationlogsheetForm;

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
      noofpress: "5",
      digestorcolspan: "20",
      presscolspan: "15",
      presses: [
        {
          temperature: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          motor: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          level: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          digestordrainage: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          pressmotor: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          hydraulicpressure: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          presscakedrainage: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],

          dilutiontemperature: [
            {
              press: "1",
            },
            {
              press: "2",
            },
            {
              press: "3",
            },
            {
              press: "4",
            },
            {
              press: "5",
            },
          ],
        },
      ],
      logs: [
        {
          time: "08:00 am - 09:00 am",
          temperature: [
            {
              value: "100",
            },
            {
              value: "200",
            },
            {
              value: "300",
            },
            {
              value: "400",
            },
            {
              value: "500",
            },
          ],

          motor: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          level: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          digestordrainage: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          pressmotor: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          hydraulicpressure: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          presscakedrainage: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          dilutiontemperature: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],
          doneby: "Suresh",
        },
        {
          time: "09:00 am - 10:00 am",
          temperature: [
            {
              value: "100",
            },
            {
              value: "200",
            },
            {
              value: "300",
            },
            {
              value: "400",
            },
            {
              value: "500",
            },
          ],
          motor: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],
          level: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],
          digestordrainage: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          pressmotor: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],

          hydraulicpressure: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],
          presscakedrainage: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],
          dilutiontemperature: [
            {
              value: "10",
            },
            {
              value: "20",
            },
            {
              value: "30",
            },
            {
              value: "40",
            },
            {
              value: "50",
            },
          ],
          doneby: "Suresh",
        },
      ],
      remarks: [
        {
          verifiedby: "Suresh",
          verifiedremark: "A B C D E F G H",
          checkedby: "Suresh",
          checkedbyremark: "A B C D E F G H",
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

    this.pressstationlogsheetForm = this.fb.group({
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
      max: this.reportdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          this.reportdate = val.value;
          this.pressstationlogsheetForm.controls.pickdate.setValue(
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

    //console.log(req);

    this.service.getlogsheetpressstation(req).then((result) => {
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
