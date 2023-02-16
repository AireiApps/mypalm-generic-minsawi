import { Component, OnInit, NgZone } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
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
import { Router } from "@angular/router";
import { DashboardserviceService } from "src/app/services/dashboard-service/dashboardservice.service";
import { FormBuilder, FormControl } from "@angular/forms";
import * as moment from "moment";
import { LanguageService } from "src/app/services/language-service/language.service";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

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
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-dashboard-forecasting",
  templateUrl: "./dashboard-forecasting.page.html",
  styleUrls: ["./dashboard-forecasting.page.scss"],
})
export class DashboardForecastingPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  userid = this.userlist.userId;
  departmentid = this.userlist.dept_id;
  millcode = this.userlist.millcode;

  //baseurl = this.userlist.report_url;

  //weburl;

  //predictionanalysisArr = [];

  public pressno1Options: Partial<ChartOptions>;
  public pressno2Options: Partial<ChartOptions>;
  public pressno3Options: Partial<ChartOptions>;
  public pressno4Options: Partial<ChartOptions>;
  public pressno5Options: Partial<ChartOptions>;

  //pressno1lable  = ['11:00', '13:00'];
  //pressno1DataArr = ['1', '2'];
  //pressno1optimalDataArr = ['4.2', '4.2'];

  pressno1PredictedOilLossArr = [];
  pressno1DataArr = [];
  pressno1optimalDataArr = [];

  pressno2PredictedOilLossArr = [];
  pressno2DataArr = [];
  pressno2optimalDataArr = [];

  pressno3PredictedOilLossArr = [];
  pressno3DataArr = [];
  pressno3optimalDataArr = [];

  pressno4PredictedOilLossArr = [];
  pressno4DataArr = [];
  pressno4optimalDataArr = [];

  pressno5PredictedOilLossArr = [];
  pressno5DataArr = [];
  pressno5optimalDataArr = [];

  predictionanalysisArr = [];
  pressno1predictiondataArr = [];
  pressno2predictiondataArr = [];
  pressno3predictiondataArr = [];
  pressno4predictiondataArr = [];
  pressno5predictiondataArr = [];

  /*predictionanalysisArr = [
    {
      "pressno1": [
        {
          "title": "Recent Oil Loss is High",
          "image": "alert",         
          "subtitle": [
            {
              "label": "Oil Loss %",
              "value": "4.63"             
            },
            {
              "label": "Time",
              "value": "24/11/2021 16:00"        
            }
          ]
        },
        {
          "title": "Reasons for Oil Loss",
          "predictedoilloss": "4.20",
          "image": "oilloss", 
          "subtitle": [
            {
              "label": "No Data Found",
              "value": ""             
            }           
          ]      
        }        
      ],
      "pressno2": [
        {
          "title": "Recent Oil Loss is High",
          "image": "alert",         
          "subtitle": [
            {
              "label": "Oil Loss %",
              "value": "4.63"             
            },
            {
              "label": "Time",
              "value": "24/11/2021 16:00"        
            }
          ]
        },
        {
          "title": "Reasons for Oil Loss",
          "predictedoilloss": "5.20",
          "image": "oilloss", 
          "subtitle": [
            {
              "label": "Digestor Drain Flow",
              "value": "Medium"             
            }           
          ]      
        }
      ],
      "pressno3": [
        {
          "title": "Recent Oil Loss is High",
          "image": "alert",         
          "subtitle": [
            {
              "label": "Oil Loss %",
              "value": "4.63"             
            },
            {
              "label": "Time",
              "value": "24/11/2021 16:00"        
            }
          ]
        },
        {
          "title": "Reasons for Oil Loss",
          "predictedoilloss": "4.20",
          "image": "oilloss", 
          "subtitle": [
            {
              "label": "Digestor Drain Flow",
              "value": "Medium"             
            },
            {
              "label": "P3 - Third Peak",
              "value": "40"             
            },
            {
              "label": "P1 - First Peak",
              "value": "14"             
            }           
          ]      
        }
      ],
      "pressno4": [
        {
          "title": "Recent Oil Loss is High",
          "image": "alert",         
          "subtitle": [
            {
              "label": "Oil Loss %",
              "value": "4.63"             
            },
            {
              "label": "Time",
              "value": "24/11/2021 16:00"        
            }
          ]
        },
        {
          "title": "Reasons for Oil Loss",
          "predictedoilloss": "4.20",
          "image": "oilloss", 
          "subtitle": [
            {
              "label": "Digestor Drain Flow",
              "value": "Medium"             
            }           
          ]      
        }
      ],
      "pressno5": [
        {
          "title": "Recent Oil Loss is High",
          "image": "alert",         
          "subtitle": [
            {
              "label": "Oil Loss %",
              "value": "4.63"             
            },
            {
              "label": "Time",
              "value": "24/11/2021 16:00"        
            }
          ]
        },
        {
          "title": "Reasons for Oil Loss",
          "predictedoilloss": "4.20",
          "image": "oilloss", 
          "subtitle": [
            {
              "label": "Digestor Drain Flow",
              "value": "Medium"             
            }           
          ]      
        }
      ]
    }
  ];*/

  currentdate = new Date().toISOString();

  enableflag = false;

  getDate;

  count = 0;

  dashboardForecastingForm;

  constructor(
    private zone: NgZone,
    private notifi: AuthGuardService,
    private router: Router,
    private commonservice: AIREIService,
    private service: DashboardserviceService,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private screenOrientation: ScreenOrientation
  ) {
    this.dashboardForecastingForm = this.fb.group({
      predictionanalysisdate: new FormControl(this.currentdate),
    });

    this.getPredictionAnalysis();

    this.pressno1Chart();

    this.pressno2Chart();

    this.pressno3Chart();

    this.pressno4Chart();

    this.pressno5Chart();

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
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
    //this.getUrl();
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
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

  getBackGroundColor(status) {
    let color;

    if (status == "1") {
      color = "#ff0000";
    } else {
      color = "#008000";
    }

    return color;
  }

  getPredictionAnalysis() {
    this.getDate = moment(
      this.dashboardForecastingForm.value.predictionanalysisdate
    ).format("YYYY-MM-DD");

    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
      date: this.getDate,
      type: "2",
    };

    //console.log(req);

    this.service.getPredictionAnalysis(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.clearpreviousdata();

        this.predictionanalysisArr = resultdata.data;

        this.pressno1predictiondataArr = resultdata.data[0].pressno1;
        this.pressno2predictiondataArr = resultdata.data[0].pressno2;
        this.pressno3predictiondataArr = resultdata.data[0].pressno3;
        this.pressno4predictiondataArr = resultdata.data[0].pressno4;
        this.pressno5predictiondataArr = resultdata.data[0].pressno5;

        this.enableflag = false;

        /*Press No:1 Chart 1*/
        if (this.predictionanalysisArr[0].chart1.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart1.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart1[i].oilloss != "") {
              /*let oillossvalue = 0;

              if(this.predictionanalysisArr[0].chart1[i].oilloss==0)
              {
                oillossvalue = null;
              }else{
                oillossvalue = this.predictionanalysisArr[0].chart1[i].oilloss;
              }*/

              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart1[i].time,
                y: this.predictionanalysisArr[0].chart1[i].oilloss,
              };

              this.pressno1DataArr.push(oillosseachreq);
            } else {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart1[i].time,
                //y: null,
                y: 0,
              };

              this.pressno1DataArr.push(oillosseachreq);
            }

            if (
              this.predictionanalysisArr[0].chart1[i].predictedoilloss != ""
            ) {
              /*let predictedoillossvalue = 0;

              if(this.predictionanalysisArr[0].chart1[i].predictedoilloss==0)
              {
                predictedoillossvalue = null;
              }else{
                predictedoillossvalue = this.predictionanalysisArr[0].chart1[i].predictedoilloss;
              }*/

              let predictedoillosseachreq = {
                x: this.predictionanalysisArr[0].chart1[i].time,
                y: this.predictionanalysisArr[0].chart1[i].predictedoilloss,
              };

              this.pressno1PredictedOilLossArr.push(predictedoillosseachreq);
            }

            let optimalvalueeachreq = {
              x: this.predictionanalysisArr[0].chart1[i].time,
              y: this.predictionanalysisArr[0].chart1[i].optimalvalue,
            };

            this.pressno1optimalDataArr.push(optimalvalueeachreq);
          }
        } else {
          this.pressno1DataArr = [];
          this.pressno1PredictedOilLossArr = [];
          this.pressno1optimalDataArr = [];
        }

        let forwardflagpressno1 = 0;
        for (let j = 0; j < this.pressno1DataArr.length; j++) {
          if (
            this.pressno1DataArr[j].y == this.pressno1PredictedOilLossArr[j].y
          ) {
            if (forwardflagpressno1 == 0) {
              this.pressno1DataArr[j].y = null;
              this.pressno1PredictedOilLossArr[j].y = null;
            }
          } else {
            forwardflagpressno1 = 1;
          }
        }

        let reverseflagpressno1 = 0;
        for (let j = 0; j < this.pressno1DataArr.length; j++) {
          if (
            this.pressno1DataArr[this.pressno1DataArr.length - (j + 1)].y ==
            this.pressno1PredictedOilLossArr[
              this.pressno1PredictedOilLossArr.length - (j + 1)
            ].y
          ) {
            if (reverseflagpressno1 == 0) {
              this.pressno1DataArr[this.pressno1DataArr.length - (j + 1)].y =
                null;
              this.pressno1PredictedOilLossArr[
                this.pressno1PredictedOilLossArr.length - (j + 1)
              ].y = null;
            }
          } else {
            reverseflagpressno1 = 1;
          }
        }

        //console.log(this.pressno1DataArr);
        //console.log(this.pressno1PredictedOilLossArr);

        /*Press No:2 Chart 2*/
        if (this.predictionanalysisArr[0].chart2.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart2.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart2[i].oilloss != "") {
              /*let oillossvalue = 0;

              if(this.predictionanalysisArr[0].chart2[i].oilloss==0)
              {
                oillossvalue = null;
              }else{
                oillossvalue = this.predictionanalysisArr[0].chart2[i].oilloss;
              }*/

              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart2[i].time,
                y: this.predictionanalysisArr[0].chart2[i].oilloss,
              };

              this.pressno2DataArr.push(oillosseachreq);
            } else {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart2[i].time,
                //y: null,
                y: 0,
              };

              this.pressno2DataArr.push(oillosseachreq);
            }

            if (
              this.predictionanalysisArr[0].chart2[i].predictedoilloss != ""
            ) {
              /*let predictedoillossvalue = 0;

              if(this.predictionanalysisArr[0].chart2[i].predictedoilloss==0)
              {
                predictedoillossvalue = null;
              }else{
                predictedoillossvalue = this.predictionanalysisArr[0].chart2[i].predictedoilloss;
              }*/

              let predictedoillosseachreq = {
                x: this.predictionanalysisArr[0].chart2[i].time,
                y: this.predictionanalysisArr[0].chart2[i].predictedoilloss,
              };

              this.pressno2PredictedOilLossArr.push(predictedoillosseachreq);
            }

            let optimalvalueeachreq = {
              x: this.predictionanalysisArr[0].chart2[i].time,
              y: this.predictionanalysisArr[0].chart2[i].optimalvalue,
            };

            this.pressno2optimalDataArr.push(optimalvalueeachreq);
          }
        } else {
          this.pressno2DataArr = [];
          this.pressno2PredictedOilLossArr = [];
          this.pressno2optimalDataArr = [];
        }

        let forwardflagpressno2 = 0;
        for (let j = 0; j < this.pressno2DataArr.length; j++) {
          if (
            this.pressno2DataArr[j].y == this.pressno2PredictedOilLossArr[j].y
          ) {
            if (forwardflagpressno2 == 0) {
              this.pressno2DataArr[j].y = null;
              this.pressno2PredictedOilLossArr[j].y = null;
            }
          } else {
            forwardflagpressno2 = 1;
          }
        }

        let reverseflagpressno2 = 0;
        for (let j = 0; j < this.pressno2DataArr.length; j++) {
          if (
            this.pressno2DataArr[this.pressno2DataArr.length - (j + 1)].y ==
            this.pressno2PredictedOilLossArr[
              this.pressno2PredictedOilLossArr.length - (j + 1)
            ].y
          ) {
            if (reverseflagpressno2 == 0) {
              this.pressno2DataArr[this.pressno2DataArr.length - (j + 1)].y =
                null;
              this.pressno2PredictedOilLossArr[
                this.pressno2PredictedOilLossArr.length - (j + 1)
              ].y = null;
            }
          } else {
            reverseflagpressno2 = 1;
          }
        }

        /*Press No:3 Chart 3*/
        if (this.predictionanalysisArr[0].chart3.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart3.length;
            i++
          ) {
            /*let oillossvalue = 0;

            if(this.predictionanalysisArr[0].chart3[i].oilloss==0)
            {
              oillossvalue = null;
            }else{
              oillossvalue = this.predictionanalysisArr[0].chart3[i].oilloss;
            }*/

            if (this.predictionanalysisArr[0].chart3[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart3[i].time,
                y: this.predictionanalysisArr[0].chart3[i].oilloss,
              };

              this.pressno3DataArr.push(oillosseachreq);
            } else {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart3[i].time,
                //y: null,
                y: 0,
              };

              this.pressno3DataArr.push(oillosseachreq);
            }

            if (
              this.predictionanalysisArr[0].chart3[i].predictedoilloss != ""
            ) {
              /*let predictedoillossvalue = 0;

              if(this.predictionanalysisArr[0].chart3[i].predictedoilloss==0)
              {
                predictedoillossvalue = null;
              }else{
                predictedoillossvalue = this.predictionanalysisArr[0].chart3[i].predictedoilloss;
              }*/

              let predictedoillosseachreq = {
                x: this.predictionanalysisArr[0].chart3[i].time,
                y: this.predictionanalysisArr[0].chart3[i].predictedoilloss,
              };

              this.pressno3PredictedOilLossArr.push(predictedoillosseachreq);
            }

            let optimalvalueeachreq = {
              x: this.predictionanalysisArr[0].chart3[i].time,
              y: this.predictionanalysisArr[0].chart3[i].optimalvalue,
            };

            this.pressno3optimalDataArr.push(optimalvalueeachreq);
          }
        } else {
          this.pressno3DataArr = [];
          this.pressno3PredictedOilLossArr = [];
          this.pressno3optimalDataArr = [];
        }

        let forwardflagpressno3 = 0;
        for (let j = 0; j < this.pressno3DataArr.length; j++) {
          if (
            this.pressno3DataArr[j].y == this.pressno3PredictedOilLossArr[j].y
          ) {
            if (forwardflagpressno3 == 0) {
              this.pressno3DataArr[j].y = null;
              this.pressno3PredictedOilLossArr[j].y = null;
            }
          } else {
            forwardflagpressno3 = 1;
          }
        }

        let reverseflagpressno3 = 0;
        for (let j = 0; j < this.pressno3DataArr.length; j++) {
          if (
            this.pressno3DataArr[this.pressno3DataArr.length - (j + 1)].y ==
            this.pressno3PredictedOilLossArr[
              this.pressno3PredictedOilLossArr.length - (j + 1)
            ].y
          ) {
            if (reverseflagpressno3 == 0) {
              this.pressno3DataArr[this.pressno3DataArr.length - (j + 1)].y =
                null;
              this.pressno3PredictedOilLossArr[
                this.pressno3PredictedOilLossArr.length - (j + 1)
              ].y = null;
            }
          } else {
            reverseflagpressno3 = 1;
          }
        }

        /*Press No:4 Chart 4*/
        if (this.predictionanalysisArr[0].chart4.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart4.length;
            i++
          ) {
            /*let oillossvalue = 0;

            if(this.predictionanalysisArr[0].chart4[i].oilloss==0)
            {
              oillossvalue = null;
            }else{
              oillossvalue = this.predictionanalysisArr[0].chart4[i].oilloss;
            }*/

            if (this.predictionanalysisArr[0].chart4[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart4[i].time,
                y: this.predictionanalysisArr[0].chart4[i].oilloss,
              };

              this.pressno4DataArr.push(oillosseachreq);
            } else {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart4[i].time,
                //y: null,
                y: 0,
              };

              this.pressno4DataArr.push(oillosseachreq);
            }

            if (
              this.predictionanalysisArr[0].chart4[i].predictedoilloss != ""
            ) {
              /*let predictedoillossvalue = 0;

              if(this.predictionanalysisArr[0].chart4[i].predictedoilloss==0)
              {
                predictedoillossvalue = null;
              }else{
                predictedoillossvalue = this.predictionanalysisArr[0].chart4[i].predictedoilloss;
              }*/

              let predictedoillosseachreq = {
                x: this.predictionanalysisArr[0].chart4[i].time,
                y: this.predictionanalysisArr[0].chart4[i].predictedoilloss,
              };

              this.pressno4PredictedOilLossArr.push(predictedoillosseachreq);
            }

            let optimalvalueeachreq = {
              x: this.predictionanalysisArr[0].chart4[i].time,
              y: this.predictionanalysisArr[0].chart4[i].optimalvalue,
            };

            this.pressno4optimalDataArr.push(optimalvalueeachreq);
          }
        } else {
          this.pressno4DataArr = [];
          this.pressno4PredictedOilLossArr = [];
          this.pressno4optimalDataArr = [];
        }

        let forwardflagpressno4 = 0;
        for (let j = 0; j < this.pressno4DataArr.length; j++) {
          if (
            this.pressno4DataArr[j].y == this.pressno4PredictedOilLossArr[j].y
          ) {
            if (forwardflagpressno4 == 0) {
              this.pressno4DataArr[j].y = null;
              this.pressno4PredictedOilLossArr[j].y = null;
            }
          } else {
            forwardflagpressno4 = 1;
          }
        }

        let reverseflagpressno4 = 0;
        for (let j = 0; j < this.pressno4DataArr.length; j++) {
          if (
            this.pressno4DataArr[this.pressno4DataArr.length - (j + 1)].y ==
            this.pressno4PredictedOilLossArr[
              this.pressno4PredictedOilLossArr.length - (j + 1)
            ].y
          ) {
            if (reverseflagpressno4 == 0) {
              this.pressno4DataArr[this.pressno4DataArr.length - (j + 1)].y =
                null;
              this.pressno4PredictedOilLossArr[
                this.pressno4PredictedOilLossArr.length - (j + 1)
              ].y = null;
            }
          } else {
            reverseflagpressno4 = 1;
          }
        }

        /*Press No:5 Chart 5*/
        if (this.predictionanalysisArr[0].chart5.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart5.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart5[i].oilloss != "") {
              /*let oillossvalue = 0;

              if(this.predictionanalysisArr[0].chart5[i].oilloss==0)
              {
                oillossvalue = null;
              }else{
                oillossvalue = this.predictionanalysisArr[0].chart5[i].oilloss;
              }*/

              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart5[i].time,
                y: this.predictionanalysisArr[0].chart5[i].oilloss,
              };

              this.pressno5DataArr.push(oillosseachreq);
            } else {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart5[i].time,
                //y: null,
                y: 0,
              };

              this.pressno5DataArr.push(oillosseachreq);
            }

            if (
              this.predictionanalysisArr[0].chart5[i].predictedoilloss != ""
            ) {
              /*let predictedoillossvalue = 0;

              if(this.predictionanalysisArr[0].chart5[i].predictedoilloss==0)
              {
                predictedoillossvalue = null;
              }else{
                predictedoillossvalue = this.predictionanalysisArr[0].chart5[i].predictedoilloss;
              }*/

              let predictedoillosseachreq = {
                x: this.predictionanalysisArr[0].chart5[i].time,
                y: this.predictionanalysisArr[0].chart5[i].predictedoilloss,
              };

              this.pressno5PredictedOilLossArr.push(predictedoillosseachreq);
            }

            let optimalvalueeachreq = {
              x: this.predictionanalysisArr[0].chart5[i].time,
              y: this.predictionanalysisArr[0].chart5[i].optimalvalue,
            };

            this.pressno5optimalDataArr.push(optimalvalueeachreq);
          }
        } else {
          this.pressno5DataArr = [];
          this.pressno5PredictedOilLossArr = [];
          this.pressno5optimalDataArr = [];
        }

        let forwardflagpressno5 = 0;
        for (let j = 0; j < this.pressno5DataArr.length; j++) {
          if (
            this.pressno5DataArr[j].y == this.pressno5PredictedOilLossArr[j].y
          ) {
            if (forwardflagpressno5 == 0) {
              this.pressno5DataArr[j].y = null;
              this.pressno5PredictedOilLossArr[j].y = null;
            }
          } else {
            forwardflagpressno5 = 1;
          }
        }

        let reverseflagpressno5 = 0;
        for (let j = 0; j < this.pressno5DataArr.length; j++) {
          if (
            this.pressno5DataArr[this.pressno5DataArr.length - (j + 1)].y ==
            this.pressno5PredictedOilLossArr[
              this.pressno5PredictedOilLossArr.length - (j + 1)
            ].y
          ) {
            if (reverseflagpressno5 == 0) {
              this.pressno5DataArr[this.pressno5DataArr.length - (j + 1)].y =
                null;
              this.pressno5PredictedOilLossArr[
                this.pressno5PredictedOilLossArr.length - (j + 1)
              ].y = null;
            }
          } else {
            reverseflagpressno5 = 1;
          }
        }

        this.pressno1Chart();

        this.pressno2Chart();

        this.pressno3Chart();

        this.pressno4Chart();

        this.pressno5Chart();
      } else {
        this.clearpreviousdata();

        this.predictionanalysisArr = [];

        this.enableflag = true;
      }
    });
  }

  pressno1Chart() {
    this.pressno1Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno1DataArr,
          color: "#007790",
        },
        {
          name: "Predicted Oil Loss",
          type: "line",
          data: this.pressno1PredictedOilLossArr,
          color: "#1ecf0b",
        },
        /*{
          name: "Optimal Value",
          type: "line",
          data: this.pressno1optimalDataArr,
          color: '#ff0000',
        }*/
      ],

      chart: {
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 10,
          },
        },
        toolbar: {
          show: false,
        },
        events: {
          markerClick: (a, b, c) => {
            var pressid =
              this.predictionanalysisArr[0].chart1[c.dataPointIndex].id;
            //var oillossdata = c.w.globals.series[0][c.dataPointIndex];
            //var predictedoillossdata = c.w.globals.series[1][c.dataPointIndex];
            if (pressid != 0) {
              this.getPredictionAtMarker(pressid, 1);
            }
          },
        },
      },

      stroke: {
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      markers: {
        size: [4, 4, 0],
        //size: 0,
      },

      title: {
        text: "Oil Loss Prediction for Press No.1",
        align: "center",
      },

      yaxis: {
        title: {
          text: "Oil Losses (%)",
          style: {
            color: "black",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      xaxis: {
        type: "numeric",
        tickAmount: 10,
        title: {
          text: "Time",
          style: {
            color: "black",
          },
        },

        labels: {
          trim: false,
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      /*tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          }
        }
      }*/

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          //console.log(series[1][dataPointIndex]);

          if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:11px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:11px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] != 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px">The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:12px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] != 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* No oil loss data entry at</li>' +
              '<li style="font-size:11px">this hour by operator due to</li>' +
              '<li style="font-size:11px">Laboratory Process Control (LPC)</li>' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          } else {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          }
        },
      },
    };
  }

  pressno2Chart() {
    this.pressno2Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno2DataArr,
          color: "#007790",
        },
        {
          name: "Predicted Oil Loss",
          type: "line",
          data: this.pressno2PredictedOilLossArr,
          color: "#1ecf0b",
        },
        /*{
          name: "Optimal Value",
          type: "line",
          data: this.pressno2optimalDataArr,
          color: '#ff0000',
        }*/
      ],

      chart: {
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 10,
          },
        },
        toolbar: {
          show: false,
        },
        events: {
          markerClick: (a, b, c) => {
            var pressid =
              this.predictionanalysisArr[0].chart2[c.dataPointIndex].id;
            //var oillossdata = c.w.globals.series[0][c.dataPointIndex];
            //var predictedoillossdata = c.w.globals.series[1][c.dataPointIndex];
            if (pressid != 0) {
              this.getPredictionAtMarker(pressid, 2);
            }
          },
        },
      },

      stroke: {
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      markers: {
        size: [4, 4, 0],
        //size: 0
      },

      title: {
        text: "Oil Loss Prediction for Press No.2",
        align: "center",
      },

      yaxis: {
        title: {
          text: "Oil Losses (%)",
          style: {
            color: "black",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Time",
          style: {
            color: "black",
          },
        },
        labels: {
          trim: false,
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      /*tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          }
        }
      }*/

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:11px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:11px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] != 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px">The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:12px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] != 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* No oil loss data entry at</li>' +
              '<li style="font-size:11px">this hour by operator due to</li>' +
              '<li style="font-size:11px">Laboratory Process Control (LPC)</li>' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          } else {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          }
        },
      },
    };
  }

  pressno3Chart() {
    this.pressno3Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno3DataArr,
          color: "#007790",
        },
        {
          name: "Predicted Oil Loss",
          type: "line",
          data: this.pressno3PredictedOilLossArr,
          color: "#1ecf0b",
        },
        /*{
          name: "Optimal Value",
          type: "line",
          data: this.pressno3optimalDataArr,
          color: '#ff0000',
        }*/
      ],

      chart: {
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 10,
          },
        },
        toolbar: {
          show: false,
        },
        events: {
          markerClick: (a, b, c) => {
            var pressid =
              this.predictionanalysisArr[0].chart3[c.dataPointIndex].id;
            //var oillossdata = c.w.globals.series[0][c.dataPointIndex];
            //var predictedoillossdata = c.w.globals.series[1][c.dataPointIndex];
            if (pressid != 0) {
              this.getPredictionAtMarker(pressid, 3);
            }
          },
        },
      },

      stroke: {
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      markers: {
        size: [4, 4, 0],
        //size: 0
      },

      title: {
        text: "Oil Loss Prediction Press No.3",
        align: "center",
      },

      yaxis: {
        title: {
          text: "Oil Losses (%)",
          style: {
            color: "black",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Time",
          style: {
            color: "black",
          },
        },
        labels: {
          trim: false,
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      /*tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          }
        }
      }*/

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:11px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:11px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] != 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px">The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:12px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] != 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* No oil loss data entry at</li>' +
              '<li style="font-size:11px">this hour by operator due to</li>' +
              '<li style="font-size:11px">Laboratory Process Control (LPC)</li>' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          } else {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          }
        },
      },
    };
  }

  pressno4Chart() {
    this.pressno4Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno4DataArr,
          color: "#007790",
        },
        {
          name: "Predicted Oil Loss",
          type: "line",
          data: this.pressno4PredictedOilLossArr,
          color: "#1ecf0b",
        },
        /*{
          name: "Optimal Value",
          type: "line",
          data: this.pressno4optimalDataArr,
          color: '#ff0000',
        }*/
      ],

      chart: {
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 10,
          },
        },
        toolbar: {
          show: false,
        },
        events: {
          markerClick: (a, b, c) => {
            var pressid =
              this.predictionanalysisArr[0].chart4[c.dataPointIndex].id;
            //var oillossdata = c.w.globals.series[0][c.dataPointIndex];
            //var predictedoillossdata = c.w.globals.series[1][c.dataPointIndex];
            if (pressid != 0) {
              this.getPredictionAtMarker(pressid, 4);
            }
          },
        },
      },

      stroke: {
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      title: {
        text: "Oil Loss Prediction Press No.4",
        align: "center",
      },

      markers: {
        size: [4, 4, 0],
        //size: 0
      },

      yaxis: {
        title: {
          text: "Oil Losses (%)",
          style: {
            color: "black",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Time",
          style: {
            color: "black",
          },
        },
        labels: {
          trim: false,
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      /*tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          }
        }
      }*/

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:11px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:11px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] != 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px">The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:12px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] != 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* No oil loss data entry at</li>' +
              '<li style="font-size:11px">this hour by operator due to</li>' +
              '<li style="font-size:11px">Laboratory Process Control (LPC)</li>' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          } else {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          }
        },
      },
    };
  }

  pressno5Chart() {
    this.pressno5Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno5DataArr,
          color: "#007790",
        },
        {
          name: "Predicted Oil Loss",
          type: "line",
          data: this.pressno5PredictedOilLossArr,
          color: "#1ecf0b",
        },
        /*{
          name: "Optimal Value",
          type: "line",
          data: this.pressno5optimalDataArr,
          color: '#ff0000',
        }*/
      ],

      chart: {
        height: 350,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 10,
          },
        },
        toolbar: {
          show: false,
        },
        events: {
          markerClick: (a, b, c) => {
            var pressid =
              this.predictionanalysisArr[0].chart5[c.dataPointIndex].id;
            //var oillossdata = c.w.globals.series[0][c.dataPointIndex];
            //var predictedoillossdata = c.w.globals.series[1][c.dataPointIndex];
            if (pressid != 0) {
              this.getPredictionAtMarker(pressid, 5);
            }
          },
        },
      },

      stroke: {
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      title: {
        text: "Oil Loss Prediction Press No.5",
        align: "center",
      },

      markers: {
        size: [4, 4, 0],
        //size: 0
      },

      yaxis: {
        title: {
          text: "Oil Losses (%)",
          style: {
            color: "black",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Time",
          style: {
            color: "black",
          },
        },
        labels: {
          trim: false,
          show: true,
          style: {
            colors: "black",
          },
        },
      },

      /*tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          }
        }
      }*/

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:11px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:11px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] != 0 &&
            series[1][dataPointIndex] == 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px">The oil loss prediction at <b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px"></b> was not being able to generate</b></li>' +
              '<li style="font-size:12px">because of insufficient data</li>' +
              "</ul>"
            );
          } else if (
            series[0][dataPointIndex] == 0 &&
            series[1][dataPointIndex] != 0
          ) {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>NIL</b></li>' +
              '<li style="font-size:11px">* No oil loss data entry at</li>' +
              '<li style="font-size:11px">this hour by operator due to</li>' +
              '<li style="font-size:11px">Laboratory Process Control (LPC)</li>' +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          } else {
            return (
              '<ul style="list-style-type: none; padding: 10px; margin-bottom: auto">' +
              '<li style="text-align: center;"><b>' +
              data.x +
              "</b></li>" +
              '<li style="font-size:12px; color: #007790">Oil Loss: <b>' +
              series[0][dataPointIndex] +
              "</b></li>" +
              '<li style="font-size:12px; color: #1ecf0b">Predicted Oil Loss: <b>' +
              series[1][dataPointIndex] +
              "</b></li>" +
              "</ul>"
            );
          }
        },
      },
    };
  }

  /*getUrl() {
    let formatedurl =
      this.baseurl +
      "/Oil_prediction?user_id=" +
      this.userid +
      "&departmentid=" +
      this.departmentid +
      "&millcode=" +
      this.millcode +
      "&mobile=1";

    console.log(formatedurl);

    this.weburl = formatedurl;
  }*/

  getPredictionAtMarker(pressid, pressno) {
    //this.getDate = moment(this.dashboardForecastingForm.value.predictionanalysisdate).format("YYYY-MM-DD");

    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: pressid,
      press: pressno,
      type: "2",
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getPredictionAnalysisAtMarker(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        if (pressno == 1) {
          this.pressno1predictiondataArr = resultdata.data[0].pressno1;
        }

        if (pressno == 2) {
          this.pressno2predictiondataArr = resultdata.data[0].pressno2;
        }

        if (pressno == 3) {
          this.pressno3predictiondataArr = resultdata.data[0].pressno3;
        }

        if (pressno == 4) {
          this.pressno4predictiondataArr = resultdata.data[0].pressno4;
        }

        if (pressno == 5) {
          this.pressno5predictiondataArr = resultdata.data[0].pressno5;
        }
      } else {
        this.pressno1predictiondataArr = [];
        this.pressno2predictiondataArr = [];
        this.pressno3predictiondataArr = [];
        this.pressno4predictiondataArr = [];
        this.pressno5predictiondataArr = [];
      }
    });
  }

  clearpreviousdata() {
    this.pressno1DataArr = [];
    this.pressno1PredictedOilLossArr = [];
    this.pressno1optimalDataArr = [];
    this.pressno2DataArr = [];
    this.pressno2PredictedOilLossArr = [];
    this.pressno2optimalDataArr = [];
    this.pressno3DataArr = [];
    this.pressno3PredictedOilLossArr = [];
    this.pressno3optimalDataArr = [];
    this.pressno4DataArr = [];
    this.pressno4PredictedOilLossArr = [];
    this.pressno4optimalDataArr = [];
    this.pressno5DataArr = [];
    this.pressno5PredictedOilLossArr = [];
    this.pressno5optimalDataArr = [];

    this.pressno1predictiondataArr = [];
    this.pressno2predictiondataArr = [];
    this.pressno3predictiondataArr = [];
    this.pressno4predictiondataArr = [];
    this.pressno5predictiondataArr = [];
  }
}
