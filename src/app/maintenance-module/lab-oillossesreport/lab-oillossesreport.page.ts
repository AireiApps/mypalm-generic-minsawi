import { Component, OnInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "../../services/supervisor-service/supervisor.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { FormBuilder, FormControl } from "@angular/forms";
import { LanguageService } from "src/app/services/language-service/language.service";
@Component({
  selector: "app-lab-oillossesreport",
  templateUrl: "./lab-oillossesreport.page.html",
  styleUrls: ["./lab-oillossesreport.page.scss"],
})
export class LabOillossesreportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  oillossesForm;

  currentdate = new Date().toISOString();

  getDate;
  reportdate = "";
  monthlyaverage = "";
  oillossesArr = [];
  /*oillossesArr = [
    {
      date: "08-12-2022",
      start_time: "15:13:13",
      stop_time: "16:39:34",
      stop_date: "09-12-2022",
      start_date: "08-12-2022",
      header: [
        {
          title: "Time",
        },
        {
          title: "Press No: 1",
        },
        {
          title: "Press No: 2",
        },
        {
          title: "Press No: 3",
        },
        {
          title: "Press No: 4",
        },
        {
          title: "Press No: 5",
        },
        {
          title: "Average",
        },
      ],

      presses: [
        {
          time: "16:05",
          logs: [
            {
              value: "10.0",
            },
            {
              value: "20.0",
            },
            {
              value: "30.0",
            },
            {
              value: "40.0",
            },
            {
              value: "50.0",
            },
          ],
        },
      ],

      average: [
        {
          value: "Average",
        },
        {
          value: "10.0",
        },
        {
          value: "20.0",
        },
        {
          value: "30.0",
        },
        {
          value: "40.0",
        },
        {
          value: "50.0",
        },
        {
          value: "30.0",
        },
      ],
    },
    {
      date: "08-12-2022",
      start_time: "15:13:13",
      stop_time: "16:39:34",
      stop_date: "09-12-2022",
      start_date: "08-12-2022",
      header: [
        {
          title: "Time",
        },
        {
          title: "Press No: 1",
        },
        {
          title: "Press No: 2",
        },
        {
          title: "Press No: 3",
        },
        {
          title: "Press No: 4",
        },
        {
          title: "Press No: 5",
        },
        {
          title: "Average",
        },
      ],

      presses: [
        {
          time: "16:05",
          logs: [
            {
              value: "100.0",
            },
            {
              value: "200.0",
            },
            {
              value: "300.0",
            },
            {
              value: "400.0",
            },
            {
              value: "500.0",
            },
          ],
        },
      ],

      average: [
        {
          value: "Average",
        },
        {
          value: "100.0",
        },
        {
          value: "200.0",
        },
        {
          value: "300.0",
        },
        {
          value: "400.0",
        },
        {
          value: "500.0",
        },
        {
          value: "300.0",
        },
      ],
    },
  ];*/

  norecordsflag = false;
  pleasewaitflag = false;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private screenOrientation: ScreenOrientation,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {
    this.reportdate = this.route.snapshot.paramMap.get("reportdate");

    if (this.reportdate == "") {
      //this.reportdate = this.currentdate;
      this.reportdate = "";
    }

    console.log(this.reportdate);

    this.oillossesForm = this.fb.group({
      pickdate: new FormControl(""),
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

  getreport() {
    if (this.reportdate != "") {
      this.getDate = moment(this.oillossesForm.value.pickdate).format(
        "YYYY-MM"
      );
    } else {
      this.getDate = "";
    }

    this.oillossesArr = [];
    this.norecordsflag = false;
    this.pleasewaitflag = true;

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      Fromdate: this.getDate,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getoillossesreport(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      this.reportdate = resultdata.Fromdate;
      if (resultdata.httpcode == 200) {
        this.monthlyaverage = resultdata.monthlyaverage;
        this.oillossesArr = resultdata.data;

        this.norecordsflag = false;

        this.pleasewaitflag = false;
      } else {
        this.monthlyaverage = "";
        this.oillossesArr = [];
        this.norecordsflag = true;
        this.pleasewaitflag = false;
        //this.commonservice.presentToast("No Record Found!");
      }
    });
  }
}
