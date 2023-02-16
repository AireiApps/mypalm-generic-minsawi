import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexMarkers,
} from "ng-apexcharts";
import * as lodash from "lodash";

import { AIREIService } from "src/app/api/api.service";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { FormBuilder, FormControl } from "@angular/forms";
import * as moment from "moment";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | any[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  grid: ApexGrid;
  colors: any[];
  labels: any[];
  yaxis: ApexYAxis | ApexYAxis[];
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  markers: ApexMarkers;
};

var getmonth = moment();

@Component({
  selector: "app-millperformanceonedashboard",
  templateUrl: "./millperformanceonedashboard.page.html",
  styleUrls: ["./millperformanceonedashboard.page.scss"],
})
export class MillperformanceonedashboardPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  todate = getmonth.format("YYYY-MM-DD").toString();
  //currentmonth = getmonth.format('MMMM').toString();
  //currentyear = getmonth.format('YYYY').toString();

  public barOptions: Partial<ChartOptions>;
  public barwithNegativeValuesOptions: Partial<ChartOptions>;
  public lineOptions: Partial<ChartOptions>;
  public multipleyaxisOptions: Partial<ChartOptions>;

  /*Variables*/
  balancecropid = 0;
  balancecrop = "";
  balancecropby = "";
  balancecropdate = "";

  dailyffbprocessed = 0;
  dailymillrunninghours = 0;
  dailymillbreakdown = 0;
  dailymillbreakdownpercentage = 0;
  dailymillslowdown = 0;
  dailymillslowdownpercentage = 0;

  monthlyffbprocessed = 0;
  monthlymillrunninghours = 0;
  monthlymillbreakdown = 0;
  monthlymillbreakdownpercentage = 0;
  monthlymillslowdown = 0;
  monthlymillslowdownpercentage = 0;

  yearlyffbprocessed = 0;
  yearlymillrunninghours = 0;
  yearlymillbreakdown = 0;
  yearlymillbreakdownpercentage = 0;
  yearlymillslowdown = 0;
  yearlymillslowdownpercentage = 0;

  dailybreakdownandslowdownhoursbystationsArr = [];
  getdailybreakdownandslowdownhoursbystationsxaxis = [];
  dailybreakdownhoursbystationDataArr = [];
  dailyslowdownhoursbystationDataArr = [];

  monthlybreakdownandslowdownhoursbystationsArr = [];
  monthlyslowdownhoursmebystationDataArr = [];
  monthlyslowdownhourspbystationDataArr = [];
  monthlybreakdownhoursbystationDataArr = [];

  ffbprocessedArr = [];
  ffbprocessedDataArr = [];

  idealactualrunninghoursArr = [];
  idealrunninghoursDataArr = [];
  actualrunninghoursDataArr = [];
  iaffbprocessedDataArr = [];

  currentdate = new Date().toISOString();
  milldate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  getDate;
  getMonthYear;
  currentmonthyear;
  getYear;
  currentyear;

  alerttitle = "";
  alertmessage = "";
  previousbalancecrop = "";
  currentbalancecrop = "";
  count = 0;

  millperformancedashboardForm;

  constructor(
    private languageService: LanguageService,
    private zone: NgZone,
    private notifi: AuthGuardService,
    private router: Router,
    private maintenanceservice: MaintenanceServiceService,
    private alertController: AlertController,
    private commonservice: AIREIService,
    private fb: FormBuilder
  ) {
    this.millperformancedashboardForm = this.fb.group({
      millperformancedate: new FormControl(this.milldate),
      millperformancemonthyear: new FormControl(this.currentdate),
      millperformanceyear: new FormControl(this.currentdate),
    });

    //this.getDate = moment(this.currentdate).format("YYYY-MM-DD");
    this.getMonthYear = moment(this.currentdate).format("YYYY-MM");
    this.currentmonthyear = moment(this.currentdate).format("MMMM-YYYY");
    this.getYear = moment(this.currentdate).format("YYYY");
    this.currentyear = moment(this.currentdate).format("YYYY");

    this.getPerformanceDetails();

    this.barChart();
    this.barChartwithNegativeValues();
    this.lineChart();
    this.multipleyaxisChart();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this.getPerformanceDetails();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  ionViewDidEnter() {
    //this.getPerformanceDetails();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
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

  openDateTimePicker(type) {
    if (type == "MillDate") {
      DatePicker.present({
        mode: "date",
        format: "dd-MM-yyyy",
        date: this.milldate,
        theme: "dark",
        doneText: "Done",
        cancelText: "Cancel",
      }).then(
        (val) => {
          if (val.value) {
            this.milldate = val.value;
            this.millperformancedashboardForm.controls.millperformancedate.setValue(
              this.milldate
            );
          }
        },
        (err) => {
          alert(JSON.stringify(err));
        }
      );
    }
  }

  getPerformanceDetails() {
    this.getDate = moment(this.milldate, "DD-MM-YYYY").format("YYYY-MM-DD");

    this.getMonthYear = moment(
      this.millperformancedashboardForm.value.millperformancemonthyear
    ).format("YYYY-MM");
    this.currentmonthyear = moment(
      this.millperformancedashboardForm.value.millperformancemonthyear
    ).format("MMMM-YYYY");
    this.getYear = moment(
      this.millperformancedashboardForm.value.millperformanceyear
    ).format("YYYY");
    this.currentyear = moment(
      this.millperformancedashboardForm.value.millperformanceyear
    ).format("YYYY");

    const req = {
      userId: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      todate: this.getDate,
      monthyear: this.getMonthYear,
      year: this.getYear,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.getPerformanceDetails(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.clearpreviousdata();

        this.alerttitle = resultdata.alerttitle;
        this.alertmessage = resultdata.alertmessage;
        this.previousbalancecrop = resultdata.previousbalancecrop;
        this.currentbalancecrop = resultdata.currentbalancecrop;

        this.balancecropid =
          resultdata.data.dailymillperformance[0].balancecropid;
        this.balancecrop = resultdata.data.dailymillperformance[0].balancecrop;
        this.balancecropby =
          resultdata.data.dailymillperformance[0].balancecropby;
        this.balancecropdate =
          resultdata.data.dailymillperformance[0].balancecroptime;

        this.dailyffbprocessed =
          resultdata.data.dailymillperformance[0].ffbprocessed;
        this.dailymillrunninghours =
          resultdata.data.dailymillperformance[0].millrunnninghours;
        this.dailymillbreakdown =
          resultdata.data.dailymillperformance[0].millbreakdown;
        this.dailymillbreakdownpercentage =
          resultdata.data.dailymillperformance[0].millbreakdownpercentage;
        this.dailymillslowdown =
          resultdata.data.dailymillperformance[0].millslowdown;
        this.dailymillslowdownpercentage =
          resultdata.data.dailymillperformance[0].millslowdownpercentage;

        this.monthlyffbprocessed =
          resultdata.data.monthlymillperformance[0].monthtodateffbprocessed;
        this.monthlymillrunninghours =
          resultdata.data.monthlymillperformance[0].monthtodatemillrunnninghours;
        this.monthlymillbreakdown =
          resultdata.data.monthlymillperformance[0].monthtodatemillbreakdown;
        this.monthlymillbreakdownpercentage =
          resultdata.data.monthlymillperformance[0].monthtodatemillbreakdownpercentage;
        this.monthlymillslowdown =
          resultdata.data.monthlymillperformance[0].monthtodatemillslowdown;
        this.monthlymillslowdownpercentage =
          resultdata.data.monthlymillperformance[0].monthtodatemillslowdownpercentage;

        this.yearlyffbprocessed =
          resultdata.data.yearlymillperformance[0].yeartodateffbprocessed;
        this.yearlymillrunninghours =
          resultdata.data.yearlymillperformance[0].yeartodatemillrunnninghours;
        this.yearlymillbreakdown =
          resultdata.data.yearlymillperformance[0].yeartodatemillbreakdown;
        this.yearlymillbreakdownpercentage =
          resultdata.data.yearlymillperformance[0].yeartodatemillbreakdownpercentage;
        this.yearlymillslowdown =
          resultdata.data.yearlymillperformance[0].yeartodatemillslowdown;
        this.yearlymillslowdownpercentage =
          resultdata.data.yearlymillperformance[0].yeartodatemillslowdownpercentage;

        this.dailybreakdownandslowdownhoursbystationsArr = lodash.orderBy(
          resultdata.data.chart1,
          ["priority"],
          ["asc"]
        );

        for (
          var i = 0;
          i < this.dailybreakdownandslowdownhoursbystationsArr.length;
          i++
        ) {
          this.getdailybreakdownandslowdownhoursbystationsxaxis.push(
            this.dailybreakdownandslowdownhoursbystationsArr[i].station
          );

          this.dailybreakdownhoursbystationDataArr.push(
            this.dailybreakdownandslowdownhoursbystationsArr[i].breakdownhours
          );
          this.dailyslowdownhoursbystationDataArr.push(
            this.dailybreakdownandslowdownhoursbystationsArr[i].slowdownhours
          );
        }

        this.monthlybreakdownandslowdownhoursbystationsArr = lodash.orderBy(
          resultdata.data.chart2,
          ["date_int"],
          ["asc"]
        );

        for (var j = 0; j < 31; j++) {
          var getlength =
            this.monthlybreakdownandslowdownhoursbystationsArr.length;

          if (j < getlength) {
            this.monthlyslowdownhoursmebystationDataArr.push(
              this.monthlybreakdownandslowdownhoursbystationsArr[j]
                .slowdownhoursme
            );
            this.monthlyslowdownhourspbystationDataArr.push(
              this.monthlybreakdownandslowdownhoursbystationsArr[j]
                .slowdownhoursp
            );
            this.monthlybreakdownhoursbystationDataArr.push(
              this.monthlybreakdownandslowdownhoursbystationsArr[j]
                .breakdownhours
            );
          } else {
            this.monthlyslowdownhoursmebystationDataArr.push(0);
            this.monthlyslowdownhourspbystationDataArr.push(0);
            this.monthlybreakdownhoursbystationDataArr.push(0);
          }
        }

        this.ffbprocessedArr = lodash.orderBy(
          resultdata.data.chart3,
          ["date_int"],
          ["asc"]
        );

        for (var k = 0; k < 31; k++) {
          var getlength = this.ffbprocessedArr.length;

          if (k < getlength) {
            this.ffbprocessedDataArr.push(this.ffbprocessedArr[k].ffbprocessed);
          } else {
            this.ffbprocessedDataArr.push(0);
          }
        }

        this.idealactualrunninghoursArr = lodash.orderBy(
          resultdata.data.chart4,
          ["date_int"],
          ["asc"]
        );

        for (var l = 0; l < 31; l++) {
          var getlength = this.idealactualrunninghoursArr.length;

          if (l < getlength) {
            this.idealrunninghoursDataArr.push(
              this.idealactualrunninghoursArr[l].idealrunninghours
            );
            this.actualrunninghoursDataArr.push(
              this.idealactualrunninghoursArr[l].actualrunninghours
            );
            this.iaffbprocessedDataArr.push(
              this.idealactualrunninghoursArr[l].ffbprocessed
            );
          } else {
            this.idealrunninghoursDataArr.push(0);
            this.actualrunninghoursDataArr.push(0);
            this.iaffbprocessedDataArr.push(0);
          }
        }

        this.barChart();
        this.barChartwithNegativeValues();
        this.lineChart();
        this.multipleyaxisChart();
      }
    });
  }

  barChart() {
    this.barOptions = {
      series: [
        {
          name: "Break Down Hours",
          data: this.dailybreakdownhoursbystationDataArr,
          color: "#ffb344",
        },
        {
          name: "Slow Down Hours",
          data: this.dailyslowdownhoursbystationDataArr,
          color: "#e05d5d",
        },
      ],

      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: true,
        width: 2,
        colors: ["white"],
      },

      grid: {
        borderColor: "#ffffff",
        padding: {
          right: 0,
          left: 0,
        },
      },

      xaxis: {
        categories: this.getdailybreakdownandslowdownhoursbystationsxaxis,
        labels: {
          show: true,
          style: {
            colors: "white",
          },
        },
      },

      yaxis: {
        title: {
          text: "Hours",
          style: {
            color: "white",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "white",
          },
        },
      },

      legend: {
        labels: {
          colors: "#FFFFFF",
        },
      },

      fill: {
        opacity: 1,
      },
    };
  }

  barChartwithNegativeValues() {
    this.barwithNegativeValuesOptions = {
      series: [
        {
          name: "Slow Down Hours (M & E)",
          data: this.monthlyslowdownhoursmebystationDataArr,
          color: "#FFFFFF",
        },
        {
          name: "Slow Down Hours (Process)",
          data: this.monthlyslowdownhourspbystationDataArr,
          color: "#ffb344",
        },
        {
          name: "Breakdown Hours",
          data: this.monthlybreakdownhoursbystationDataArr,
          color: "#e05d5d",
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          /*colors: {
            ranges: [
              {
                from: -100,
                to: -46,
                color: "#F15B46"
              },
              {
                from: -45,
                to: 0,
                color: "#FEB019"
              }
            ]
          },*/
          columnWidth: "80%",
        },
      },

      dataLabels: {
        enabled: false,
      },

      yaxis: {
        title: {
          text: "Hours",
          style: {
            color: "white",
          },
        },
        labels: {
          formatter: function (y) {
            return y + "%";
          },
          style: {
            colors: "white",
          },
        },
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Date",
          style: {
            color: "white",
          },
        },
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9 ",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        labels: {
          rotate: -45,
          style: {
            colors: "white",
          },
        },
      },

      legend: {
        labels: {
          colors: "#FFFFFF",
        },
      },
    };
  }

  lineChart() {
    this.lineOptions = {
      series: [
        {
          name: "FFB Processed",
          type: "line",
          data: this.ffbprocessedDataArr,
          color: "#e534eb",
        },
      ],

      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9 ",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],

      markers: {
        size: 0,
      },

      yaxis: {
        title: {
          text: "Metric Tons (MT)",
          style: {
            color: "white",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "white",
          },
        },
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Date",
          style: {
            color: "white",
          },
        },
        labels: {
          trim: false,
          show: true,
          style: {
            colors: "white",
          },
        },
      },

      legend: {
        labels: {
          colors: "#FFFFFF",
        },
      },

      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          },
        },
      },
    };
  }

  multipleyaxisChart() {
    //console.log(this.iaffbprocessedDataArr);

    this.multipleyaxisOptions = {
      series: [
        {
          name: "Ideal Running Hours",
          type: "column",
          data: this.idealrunninghoursDataArr,
          color: "#FFFF80",
        },
        {
          name: "Actual Running Hours",
          type: "column",
          data: this.actualrunninghoursDataArr,
          color: "#FF3400",
        },
        {
          name: "Fresh Fruit Bunch Processed",
          type: "line",
          data: this.iaffbprocessedDataArr,
          color: "#EA39C3",
        },
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Date",
          style: {
            color: "white",
          },
        },
        categories: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        labels: {
          style: {
            colors: "#FFFFFF",
          },
        },
      },

      yaxis: [
        {
          seriesName: "Hours",
          labels: {
            style: {
              colors: "#FFFF80",
            },
          },
          title: {
            text: "Hours (Hr)",
            style: {
              color: "#FFFF80",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Metric Tons",
          opposite: true,
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            text: "Metric Tons (MT)",
            style: {
              color: "#00E396",
            },
          },
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },

      legend: {
        labels: {
          colors: "#FFFFFF",
        },
      },
    };
  }

  editalert() {
    let getalertmessage = this.alertmessage;

    this.alertController
      .create({
        header: this.alerttitle,
        subHeader: getalertmessage,
        message: this.previousbalancecrop + ": " + this.balancecrop,
        cssClass: "managerdashboardmessage",
        backdropDismiss: false,
        inputs: [
          {
            name: "editbalancecrop",
            type: "number",
            placeholder: this.currentbalancecrop,
          },
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (cancel) => {
              //console.log("Confirm Cancel");
            },
          },
          {
            text: "Okay",
            handler: (data: any) => {
              if (this.balancecrop != "" && data.editbalancecrop != "") {
                this.saveBalanceCrop(this.balancecrop, data.editbalancecrop);
              } else {
                return false;
              }
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  saveBalanceCrop(getpreviouscrop, getbalancecrop) {
    const req = {
      user_id: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      id: this.balancecropid,
      previousbalanceCrop: getpreviouscrop,
      balanceCrop: getbalancecrop,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.saveBalanceCrop(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast("Balance Crop Edited Successfully!");

        this.getPerformanceDetails();
      } else {
        this.commonservice.presentToast("Balance Crop Edit Failed!");
      }
    });
  }

  clearpreviousdata() {
    this.alerttitle = "";
    this.alertmessage = "";
    this.previousbalancecrop = "";
    this.currentbalancecrop = "";

    /*Variables*/
    this.balancecropid = 0;
    this.balancecrop = "";
    this.balancecropby = "";
    this.balancecropdate = "";

    this.dailyffbprocessed = 0;
    this.dailymillrunninghours = 0;
    this.dailymillbreakdown = 0;
    this.dailymillbreakdownpercentage = 0;
    this.dailymillslowdown = 0;
    this.dailymillslowdownpercentage = 0;

    this.monthlyffbprocessed = 0;
    this.monthlymillrunninghours = 0;
    this.monthlymillbreakdown = 0;
    this.monthlymillbreakdownpercentage = 0;
    this.monthlymillslowdown = 0;
    this.monthlymillslowdownpercentage = 0;

    this.yearlyffbprocessed = 0;
    this.yearlymillrunninghours = 0;
    this.yearlymillbreakdown = 0;
    this.yearlymillbreakdownpercentage = 0;
    this.yearlymillslowdown = 0;
    this.yearlymillslowdownpercentage = 0;

    this.dailybreakdownandslowdownhoursbystationsArr = [];
    this.getdailybreakdownandslowdownhoursbystationsxaxis = [];
    this.dailybreakdownhoursbystationDataArr = [];
    this.dailyslowdownhoursbystationDataArr = [];

    this.monthlybreakdownandslowdownhoursbystationsArr = [];
    this.monthlyslowdownhoursmebystationDataArr = [];
    this.monthlyslowdownhourspbystationDataArr = [];
    this.monthlybreakdownhoursbystationDataArr = [];

    this.ffbprocessedArr = [];
    this.ffbprocessedDataArr = [];

    this.idealactualrunninghoursArr = [];
    this.idealrunninghoursDataArr = [];
    this.actualrunninghoursDataArr = [];
    this.iaffbprocessedDataArr = [];
  }
}
