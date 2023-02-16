import { Component, OnInit, NgZone } from "@angular/core";
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
import * as moment from "moment";
import { LanguageService } from "src/app/services/language-service/language.service";
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
  selector: "app-dashboard-predictionanalysis",
  templateUrl: "./dashboard-predictionanalysis.page.html",
  styleUrls: ["./dashboard-predictionanalysis.page.scss"],
})
export class DashboardPredictionanalysisPage implements OnInit {
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

  chartArr = [];
  /*chartArr = [
    {
      "pressno1": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "pressno2": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "pressno3": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "pressno4": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "pressno5": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ]
    }
  ];*/

  pressno1Lable = [];
  pressno1DataArr = [];
  pressno1optimalDataArr = [];

  pressno2Lable = [];
  pressno2DataArr = [];
  pressno2optimalDataArr = [];

  pressno3Lable = [];
  pressno3DataArr = [];
  pressno3optimalDataArr = [];

  pressno4Lable = [];
  pressno4DataArr = [];
  pressno4optimalDataArr = [];

  pressno5Lable = [];
  pressno5DataArr = [];
  pressno5optimalDataArr = [];

  predictionanalysisArr = [];
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
          "image": "oilloss", 
          "subtitle": [
            {
              "label": "Digestor Drain Flow",
              "value": "Medium"             
            }           
          ]      
        }
      ],
      "chart1": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "chart2": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "chart3": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "chart4": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ],
      "chart5": [
        {
          "time": "11:00",
          "oilloss": 1,
          "optimalvalue": 4.2,
          "date_int": 11
        },
        {
          "time": "13:00",
          "oilloss": 2,
          "optimalvalue": 4.2,
          "date_int": 13
        }
      ]
    }
  ];*/

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private commonservice: AIREIService,
    private service: DashboardserviceService
  ) {
    this.getPredictionAnalysis();

    this.pressno1Chart();

    this.pressno2Chart();

    this.pressno3Chart();

    this.pressno4Chart();

    this.pressno5Chart();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    //this.getUrl();
  }

  getPredictionAnalysis() {
    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
      type: "1",
    };

    //console.log(req);

    this.service.getPredictionAnalysis(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.predictionanalysisArr = resultdata.data;

        if (this.predictionanalysisArr[0].chart1.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart1.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart1[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart1[i].time,
                y: this.predictionanalysisArr[0].chart1[i].oilloss,
              };

              this.pressno1DataArr.push(oillosseachreq);
            }

            if (this.predictionanalysisArr[0].chart1[i].oilloss != "") {
              let optimalvalueeachreq = {
                x: this.predictionanalysisArr[0].chart1[i].time,
                y: this.predictionanalysisArr[0].chart1[i].optimalvalue,
              };

              this.pressno1optimalDataArr.push(optimalvalueeachreq);
            }
          }
        } else {
          this.pressno1DataArr = [];
          this.pressno1optimalDataArr = [];
        }

        if (this.predictionanalysisArr[0].chart2.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart2.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart2[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart2[i].time,
                y: this.predictionanalysisArr[0].chart2[i].oilloss,
              };

              this.pressno2DataArr.push(oillosseachreq);
            }

            if (this.predictionanalysisArr[0].chart2[i].oilloss != "") {
              let optimalvalueeachreq = {
                x: this.predictionanalysisArr[0].chart2[i].time,
                y: this.predictionanalysisArr[0].chart2[i].optimalvalue,
              };

              this.pressno2optimalDataArr.push(optimalvalueeachreq);
            }
          }
        } else {
          this.pressno2DataArr = [];
          this.pressno2optimalDataArr = [];
        }

        if (this.predictionanalysisArr[0].chart3.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart3.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart3[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart3[i].time,
                y: this.predictionanalysisArr[0].chart3[i].oilloss,
              };

              this.pressno3DataArr.push(oillosseachreq);
            }

            if (this.predictionanalysisArr[0].chart3[i].oilloss != "") {
              let optimalvalueeachreq = {
                x: this.predictionanalysisArr[0].chart3[i].time,
                y: this.predictionanalysisArr[0].chart3[i].optimalvalue,
              };

              this.pressno3optimalDataArr.push(optimalvalueeachreq);
            }
          }
        } else {
          this.pressno3DataArr = [];
          this.pressno3optimalDataArr = [];
        }

        if (this.predictionanalysisArr[0].chart4.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart4.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart4[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart4[i].time,
                y: this.predictionanalysisArr[0].chart4[i].oilloss,
              };

              this.pressno4DataArr.push(oillosseachreq);
            }

            if (this.predictionanalysisArr[0].chart4[i].oilloss != "") {
              let optimalvalueeachreq = {
                x: this.predictionanalysisArr[0].chart4[i].time,
                y: this.predictionanalysisArr[0].chart4[i].optimalvalue,
              };

              this.pressno4optimalDataArr.push(optimalvalueeachreq);
            }
          }
        } else {
          this.pressno4DataArr = [];
          this.pressno4optimalDataArr = [];
        }

        if (this.predictionanalysisArr[0].chart5.length > 0) {
          for (
            var i = 0;
            i < this.predictionanalysisArr[0].chart5.length;
            i++
          ) {
            if (this.predictionanalysisArr[0].chart5[i].oilloss != "") {
              let oillosseachreq = {
                x: this.predictionanalysisArr[0].chart5[i].time,
                y: this.predictionanalysisArr[0].chart5[i].oilloss,
              };

              this.pressno5DataArr.push(oillosseachreq);
            }

            if (this.predictionanalysisArr[0].chart5[i].oilloss != "") {
              let optimalvalueeachreq = {
                x: this.predictionanalysisArr[0].chart5[i].time,
                y: this.predictionanalysisArr[0].chart5[i].optimalvalue,
              };

              this.pressno5optimalDataArr.push(optimalvalueeachreq);
            }
          }
        } else {
          this.pressno5DataArr = [];
          this.pressno5optimalDataArr = [];
        }

        this.pressno1Chart();

        this.pressno2Chart();

        this.pressno3Chart();

        this.pressno4Chart();

        this.pressno5Chart();

        //this.getPredictionAnalysisChart();
      } else {
        this.predictionanalysisArr = [];
      }
    });
  }

  /*getPredictionAnalysisChart() {
    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      type: '1',
    };

    //console.log(req);

    this.service.getPredictionAnalysisChart(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.chartArr = resultdata.data;

        if(this.chartArr[0].pressno1.length>0)
        {
          for(var i=0; i < this.chartArr[0].pressno1.length; i++)
          {
            //this.pressno1Lable.push(this.chartArr[0].pressno1[i].time);
            //this.pressno1DataArr.push(this.chartArr[0].pressno1[i].oilloss);
            //this.pressno1optimalDataArr.push(this.chartArr[0].pressno1[i].optimalvalue);

            let oillosseachreq = {
              x: this.chartArr[0].pressno1[i].time,
              y: this.chartArr[0].pressno1[i].oilloss,
            };

            this.pressno1DataArr.push(oillosseachreq);

            let optimalvalueeachreq = {
              x: this.chartArr[0].pressno1[i].time,
              y: this.chartArr[0].pressno1[i].optimalvalue,
            };

            this.pressno1optimalDataArr.push(optimalvalueeachreq);
          }
        }else{
          this.pressno1DataArr = [];
          this.pressno1optimalDataArr = [];
        }      

        if(this.chartArr[0].pressno2.length>0)
        {
          for(var i=0; i < this.chartArr[0].pressno2.length; i++)
          {
            //this.pressno2Lable.push(this.chartArr[0].pressno2[i].time);
            //this.pressno2DataArr.push(this.chartArr[0].pressno2[i].oilloss);
            //this.pressno2optimalDataArr.push(this.chartArr[0].pressno2[i].optimalvalue);

            let oillosseachreq = {
              x: this.chartArr[0].pressno2[i].time,
              y: this.chartArr[0].pressno2[i].oilloss,
            };

            this.pressno2DataArr.push(oillosseachreq);

            let optimalvalueeachreq = {
              x: this.chartArr[0].pressno2[i].time,
              y: this.chartArr[0].pressno2[i].optimalvalue,
            };

            this.pressno2optimalDataArr.push(optimalvalueeachreq);
          }
        }else{
          this.pressno2DataArr = [];
          this.pressno2optimalDataArr = [];
        }
    
        if(this.chartArr[0].pressno3.length>0)
        {
          for(var i=0; i < this.chartArr[0].pressno3.length; i++)
          {
            //this.pressno3Lable.push(this.chartArr[0].pressno3[i].time);
            //this.pressno3DataArr.push(this.chartArr[0].pressno3[i].oilloss);
            //this.pressno3optimalDataArr.push(this.chartArr[0].pressno3[i].optimalvalue);

            let oillosseachreq = {
              x: this.chartArr[0].pressno3[i].time,
              y: this.chartArr[0].pressno3[i].oilloss,
            };

            this.pressno3DataArr.push(oillosseachreq);

            let optimalvalueeachreq = {
              x: this.chartArr[0].pressno3[i].time,
              y: this.chartArr[0].pressno3[i].optimalvalue,
            };

            this.pressno3optimalDataArr.push(optimalvalueeachreq);
          }
        }else{
          this.pressno3DataArr = [];
          this.pressno3optimalDataArr = [];
        }
    
        if(this.chartArr[0].pressno4.length>0)
        {
          for(var i=0; i < this.chartArr[0].pressno4.length; i++)
          {
            //this.pressno4Lable.push(this.chartArr[0].pressno4[i].time);
            //this.pressno4DataArr.push(this.chartArr[0].pressno4[i].oilloss);
            //this.pressno4optimalDataArr.push(this.chartArr[0].pressno4[i].optimalvalue);

            let oillosseachreq = {
              x: this.chartArr[0].pressno4[i].time,
              y: this.chartArr[0].pressno4[i].oilloss,
            };

            this.pressno4DataArr.push(oillosseachreq);

            let optimalvalueeachreq = {
              x: this.chartArr[0].pressno4[i].time,
              y: this.chartArr[0].pressno4[i].optimalvalue,
            };

            this.pressno4optimalDataArr.push(optimalvalueeachreq);
          }
        }else{
          this.pressno4DataArr = [];
          this.pressno4optimalDataArr = [];
        }
    
        if(this.chartArr[0].pressno4.length>0)
        {
          for(var i=0; i < this.chartArr[0].pressno5.length; i++)
          {
            //this.pressno5Lable.push(this.chartArr[0].pressno5[i].time);
            //this.pressno5DataArr.push(this.chartArr[0].pressno5[i].oilloss);
            //this.pressno5optimalDataArr.push(this.chartArr[0].pressno5[i].optimalvalue);

            let oillosseachreq = {
              x: this.chartArr[0].pressno5[i].time,
              y: this.chartArr[0].pressno5[i].oilloss,
            };

            this.pressno5DataArr.push(oillosseachreq);

            let optimalvalueeachreq = {
              x: this.chartArr[0].pressno5[i].time,
              y: this.chartArr[0].pressno5[i].optimalvalue,
            };

            this.pressno5optimalDataArr.push(optimalvalueeachreq);
          }
        }else{
          this.pressno5DataArr = [];
          this.pressno5optimalDataArr = [];
        }
      } else {
        this.chartArr = [];        
      }
    });
  }*/

  pressno1Chart() {
    this.pressno1Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno1DataArr,
          color: "#2a6df4",
        },
        {
          name: "Optimal Value",
          type: "line",
          data: this.pressno1optimalDataArr,
          color: "#ff0000",
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
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      markers: {
        size: [6, 0],
      },

      title: {
        text: "Recent Oil Loss for Press No.1",
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

      legend: {
        labels: {
          colors: "#000000",
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

  pressno2Chart() {
    this.pressno2Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno2DataArr,
          color: "#2a6df4",
        },
        {
          name: "Optimal Value",
          type: "line",
          data: this.pressno2optimalDataArr,
          color: "#ff0000",
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
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      markers: {
        size: [6, 0],
      },

      title: {
        text: "Recent Oil Loss for Press No.2",
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

      legend: {
        labels: {
          colors: "#000000",
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

  pressno3Chart() {
    this.pressno3Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno3DataArr,
          color: "#2a6df4",
        },
        {
          name: "Optimal Value",
          type: "line",
          data: this.pressno3optimalDataArr,
          color: "#ff0000",
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
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      markers: {
        size: [6, 0],
      },

      title: {
        text: "Recent Oil Loss for Press No.3",
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

      legend: {
        labels: {
          colors: "#000000",
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

  pressno4Chart() {
    this.pressno4Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno4DataArr,
          color: "#2a6df4",
        },
        {
          name: "Optimal Value",
          type: "line",
          data: this.pressno4optimalDataArr,
          color: "#ff0000",
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
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      title: {
        text: "Recent Oil Loss for Press No.4",
        align: "center",
      },

      markers: {
        size: [6, 0],
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

      legend: {
        labels: {
          colors: "#000000",
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

  pressno5Chart() {
    this.pressno5Options = {
      series: [
        {
          name: "Oil Loss",
          type: "line",
          data: this.pressno5DataArr,
          color: "#2a6df4",
        },
        {
          name: "Optimal Value",
          type: "line",
          data: this.pressno5optimalDataArr,
          color: "#ff0000",
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
        curve: "straight",
        width: 3,
      },

      fill: {
        type: "solid",
      },

      //labels: this.pressno1Lable,

      title: {
        text: "Recent Oil Loss for Press No.5",
        align: "center",
      },

      markers: {
        size: [6, 0],
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

      legend: {
        labels: {
          colors: "#000000",
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
}
