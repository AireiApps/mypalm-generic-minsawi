import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
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
};

var getmonth = moment();

@Component({
  selector: 'app-millperformancetwodashboard',
  templateUrl: './millperformancetwodashboard.page.html',
  styleUrls: ['./millperformancetwodashboard.page.scss'],
})
export class MillperformancetwodashboardPage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));

  currentdate = new Date().toISOString();  
  currentyear;  
  

  
  monthlymillperformanceArr = [];
  monthlymillperformancetotalArr=[];

  monthlybreakdownhoursArr = [];  
  monthlybreakdownhourstotalArr=[];
  monthlybreakdownhoursData=[];
  monthlybreakdownprecentageData=[];  

  monthlybreakdownhoursbystationArr = [];
  monthlybreakdownhoursbystationtotalArr=[];
  getmonthlybreakdownhoursbystationxaxis=[];
  monthlybreakdownhoursbystationData=[];
  monthlybreakdownprecentagebystationData=[];

  monthlyslowdownhoursArr = [];  
  monthlyslowdownhourstotalArr = [];
  monthlyslowdownhoursData=[];
  monthlyslowdownhoursprecentageData=[];

  monthlyslowdownhourspArr = [];
  monthlyslowdownhoursptotalArr = [];
  monthlyslowdownhourspData=[];
  monthlyslowdownhoursprecentagepData=[];

  monthlyslowdownhoursmeArr = [];
  monthlyslowdownhoursmetotalArr = [];
  monthlyslowdownhoursmeData=[];
  monthlyslowdownhoursprecentagemeData=[];

  slowdownhoursbystationArr = [];
  slowdownhoursbystationtotalArr = [];
  getslowdownhoursbystationxaxis=[];
  slowdownhoursbystationData=[];
  slowdownhoursbystationprecentageData=[];

  public monthlybreakdownhoursOption: Partial<ChartOptions>;
  public breakdownhoursbystationOption: Partial<ChartOptions>;
  public monthlyslowdownhoursOption: Partial<ChartOptions>;
  public monthlyslowdownhourspOption: Partial<ChartOptions>;
  public monthlyslowdownhoursmeOption: Partial<ChartOptions>;
  public slowdownhoursbystationmeOption: Partial<ChartOptions>;

  count = 0;
  millperformancedashboard2Form;

  constructor(private languageService: LanguageService,private zone: NgZone, private notifi: AuthGuardService, private router: Router, private maintenanceservice: MaintenanceServiceService, private commonservice: AIREIService, private fb: FormBuilder) {
    
    this.millperformancedashboard2Form = this.fb.group({      
      millperformanceyear: new FormControl(this.currentdate),    
    });

    this.currentyear = moment(this.currentdate).format("YYYY");

    this.getMonthlyMillPerformanceDetails(); 
    
    this.monthlybreakdownhoursChart(); 
    this.breakdownhoursbystationChart();
    this.monthlyslowdownhoursChart();
    this.monthlyslowdownhourspChart();
    this.monthlyslowdownhoursmeChart();
    this.slowdownhoursbystationmeChart();
   }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    PushNotifications.removeAllDeliveredNotifications();
      
    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification(); 
  }

  ionViewDidEnter() {
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
  
  getMonthlyMillPerformanceDetails() {

    /*if(this.millperformancedashboard2Form.value.millperformancemonthyear == null)
    {
      this.getMillPerformanceMonthYear = "";
    }else{
      this.getMillPerformanceMonthYear = moment(this.millperformancedashboard2Form.value.millperformancemonthyear).format("YYYY-MM");
    }

    if(this.millperformancedashboard2Form.value.breakdownmonthyear == null)
    {
      this.getBreakdownMonthYear = "";
    }else{
      this.getBreakdownMonthYear = moment(this.millperformancedashboard2Form.value.breakdownmonthyear).format("YYYY-MM");
    }

    if(this.millperformancedashboard2Form.value.slowdownmonthyear == null)
    {
      this.getSlowdownMonthYear = "";
    }else{
      this.getSlowdownMonthYear = moment(this.millperformancedashboard2Form.value.slowdownmonthyear).format("YYYY-MM");
    }*/
        

    this.currentyear = moment(this.millperformancedashboard2Form.value.millperformanceyear).format("YYYY");

    const req = {
      userId: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      year: this.currentyear,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.getDB2MonthlyMillPerformanceDetails(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        
        this.clearpreviousdata();

        this.monthlymillperformanceArr = lodash.orderBy(resultdata.data.chart1, ["monthint"], ["asc"]);
        this.monthlymillperformancetotalArr = resultdata.data.chart1_total;

        this.monthlybreakdownhoursArr = lodash.orderBy(resultdata.data.chart2, ["monthint"], ["asc"]);        
        this.monthlybreakdownhourstotalArr = resultdata.data.chart2_total;

        for(var i=0; i < this.monthlybreakdownhoursArr.length; i++)
        {          
          this.monthlybreakdownhoursData.push(this.monthlybreakdownhoursArr[i].millbreakdownhours);
          this.monthlybreakdownprecentageData.push(this.monthlybreakdownhoursArr[i].millbreakdownhourspercentage);
        }        

        this.monthlybreakdownhoursbystationArr = lodash.orderBy(resultdata.data.chart3, ["priority"], ["asc"]);        
        this.monthlybreakdownhoursbystationtotalArr = resultdata.data.chart3_total;         

        for(var j=0; j < this.monthlybreakdownhoursbystationArr.length; j++)
        {
          this.getmonthlybreakdownhoursbystationxaxis.push(this.monthlybreakdownhoursbystationArr[j].station);

          if(this.monthlybreakdownhoursbystationArr[j].priority != 0)
          {          
            this.monthlybreakdownhoursbystationData.push(this.monthlybreakdownhoursbystationArr[j].millbreakdownhours);
            this.monthlybreakdownprecentagebystationData.push(this.monthlybreakdownhoursbystationArr[j].millbreakdownhourspercentage);
          }          
        }

        this.monthlyslowdownhoursArr = lodash.orderBy(resultdata.data.chart4, ["monthint"], ["asc"]);
        this.monthlyslowdownhourstotalArr = resultdata.data.chart4_total;

        for(var k=0; k < this.monthlyslowdownhoursArr.length; k++)
        {          
          this.monthlyslowdownhoursData.push(this.monthlyslowdownhoursArr[k].millslowdownhours);
          this.monthlyslowdownhoursprecentageData.push(this.monthlyslowdownhoursArr[k].millslowdownhourspmepercentage);
        }

        this.monthlyslowdownhourspArr = lodash.orderBy(resultdata.data.chart5, ["monthint"], ["asc"]);
        this.monthlyslowdownhoursptotalArr = resultdata.data.chart5_total;

        for(var l=0; l < this.monthlyslowdownhourspArr.length; l++)
        {         
          this.monthlyslowdownhourspData.push(this.monthlyslowdownhourspArr[l].millslowdownprocess);
          this.monthlyslowdownhoursprecentagepData.push(this.monthlyslowdownhourspArr[l].millslowdownprocesspercentage);
        }

        this.monthlyslowdownhoursmeArr = lodash.orderBy(resultdata.data.chart6, ["monthint"], ["asc"]);
        this.monthlyslowdownhoursmetotalArr = resultdata.data.chart6_total;

        for(var m=0; m < this.monthlyslowdownhoursmeArr.length; m++)
        {          
          this.monthlyslowdownhoursmeData.push(this.monthlyslowdownhoursmeArr[m].millslowdownhoursme);
          this.monthlyslowdownhoursprecentagemeData.push(this.monthlyslowdownhoursmeArr[m].millslowdownhoursmepercentage);
        }

        this.slowdownhoursbystationArr = lodash.orderBy(resultdata.data.chart7, ["priority"], ["asc"]);
        this.slowdownhoursbystationtotalArr = resultdata.data.chart7_total;

        for(var n=0; n < this.slowdownhoursbystationArr.length; n++)
        { 
          this.getslowdownhoursbystationxaxis.push(this.slowdownhoursbystationArr[n].station);

          if(this.slowdownhoursbystationArr[n].priority != 0)
          {         
            this.slowdownhoursbystationData.push(this.slowdownhoursbystationArr[n].millslowdownhoursme);
            this.slowdownhoursbystationprecentageData.push(this.slowdownhoursbystationArr[n].millslowdownhoursmepercentage);
          }
        }
       
        this.monthlybreakdownhoursChart(); 
        this.breakdownhoursbystationChart();
        this.monthlyslowdownhoursChart();
        this.monthlyslowdownhourspChart();
        this.monthlyslowdownhoursmeChart();
        this.slowdownhoursbystationmeChart();
      }
    });
  }

  monthlybreakdownhoursChart()
  {
    this.monthlybreakdownhoursOption = {
      series: [
        {
          name: "Breakdown Hours",
          type: "column",
          data: this.monthlybreakdownhoursData,
          color: '#FFFF80',
        },
        {
          name: "Breakdown %",
          type: "line",
          data: this.monthlybreakdownprecentageData,
          color: '#FF3400',
        }
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {        
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Month",
          style: {
            color: 'white',
          }
        },
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          style: {
            colors: "#FFFFFF"
          }
        },
      },

      yaxis: [
        {
          seriesName: "Hours",         
          labels: {
            style: {
              colors: "#FFFFFF"
            }
          },
          title: {
            text: "Hours (Hr)",            
            style: {
              color: "#FFFFFF"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },

      legend: {
        labels: {
          colors: '#FFFFFF',
        },
      },
    };
  }
  
  breakdownhoursbystationChart()
  {
    this.breakdownhoursbystationOption = {
      series: [
        {
          name: "Breakdown Hours",
          type: "column",
          data: this.monthlybreakdownhoursbystationData,
          color: '#FFFF80',
        },
        {
          name: "Breakdwon %",
          type: "line",
          data: this.monthlybreakdownprecentagebystationData,
          color: '#FF3400',
        }
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {        
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Month",
          style: {
            color: 'white',
          }
        },
        categories: this.getmonthlybreakdownhoursbystationxaxis,
        labels: {
          style: {
            colors: "#FFFFFF"
          }
        },
      },

      yaxis: [
        {
          seriesName: "Hours",         
          labels: {
            style: {
              colors: "#FFFFFF"
            }
          },
          title: {
            text: "Hours (Hr)",            
            style: {
              color: "#FFFFFF"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },

      legend: {
        labels: {
          colors: '#FFFFFF',
        },
      },
    };
  }

  monthlyslowdownhoursChart()
  {
    this.monthlyslowdownhoursOption = {
      series: [
        {
          name: "Slowdown Hours",
          type: "column",
          data: this.monthlyslowdownhoursData,
          color: '#4f87f7',
        },
        {
          name: "Slowdown %",
          type: "line",
          data: this.monthlyslowdownhoursprecentageData,
          color: '#FF3400',
        }
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {        
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Month",
          style: {
            color: 'white',
          }
        },
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          style: {
            colors: "#FFFFFF"
          }
        },
      },

      yaxis: [
        {
          seriesName: "Hours",         
          labels: {
            style: {
              colors: "#FFFFFF"
            }
          },
          title: {
            text: "Hours (Hr)",            
            style: {
              color: "#FFFFFF"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },

      legend: {
        labels: {
          colors: '#FFFFFF',
        },
      },
    };
  }

  monthlyslowdownhourspChart()
  {
    this.monthlyslowdownhourspOption = {
      series: [
        {
          name: "Slowdown Hours",
          type: "column",
          data: this.monthlyslowdownhourspData,
          color: '#B17BC6',
        },
        {
          name: "Slowdown %",
          type: "line",
          data: this.monthlyslowdownhoursprecentagepData,
          color: '#FF3400',
        }
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {        
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Month",
          style: {
            color: 'white',
          }
        },
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          style: {
            colors: "#FFFFFF"
          }
        },
      },

      yaxis: [
        {
          seriesName: "Hours",         
          labels: {
            style: {
              colors: "#FFFFFF"
            }
          },
          title: {
            text: "Hours (Hr)",            
            style: {
              color: "#FFFFFF"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },

      legend: {
        labels: {
          colors: '#FFFFFF',
        },
      },
    };
  }

  monthlyslowdownhoursmeChart()
  {
    this.monthlyslowdownhoursmeOption = {
      series: [
        {
          name: "Slowdown Hours",
          type: "column",
          data: this.monthlyslowdownhoursmeData,
          color: '#8DFF1A',
        },
        {
          name: "Slowdown %",
          type: "line",
          data: this.monthlyslowdownhoursprecentagemeData,
          color: '#FF3400',
        }
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {        
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Month",
          style: {
            color: 'white',
          }
        },
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          style: {
            colors: "#FFFFFF"
          }
        },
      },

      yaxis: [
        {
          seriesName: "Hours",         
          labels: {
            style: {
              colors: "#FFFFFF"
            }
          },
          title: {
            text: "Hours (Hr)",            
            style: {
              color: "#FFFFFF"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },

      legend: {
        labels: {
          colors: '#FFFFFF',
        },
      },
    };
  }

  slowdownhoursbystationmeChart()
  {
    this.slowdownhoursbystationmeOption = {
      series: [
        {
          name: "Slowdown Hours",
          type: "column",
          data: this.slowdownhoursbystationData,
          color: '#8DFF1A',
        },
        {
          name: "Slowdown %",
          type: "line",
          data: this.slowdownhoursbystationprecentageData,
          color: '#FF3400',
        }
      ],

      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {        
        curve: "smooth",
        width: 3,
      },

      xaxis: {
        tickAmount: 10,
        title: {
          text: "Month",
          style: {
            color: 'white',
          }
        },
        categories: this.getslowdownhoursbystationxaxis,
        labels: {
          style: {
            colors: "#FFFFFF"
          }
        },
      },

      yaxis: [
        {
          seriesName: "Hours",         
          labels: {
            style: {
              colors: "#FFFFFF"
            }
          },
          title: {
            text: "Hours (Hr)",            
            style: {
              color: "#FFFFFF"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],

      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },

      legend: {
        labels: {
          colors: '#FFFFFF',
        },
      },
    };
  }

  clearpreviousdata()
  {
    this.monthlymillperformanceArr = [];
    this.monthlymillperformancetotalArr=[];
  
    this.monthlybreakdownhoursArr = [];  
    this.monthlybreakdownhourstotalArr=[];
    this.monthlybreakdownhoursData=[];
    this.monthlybreakdownprecentageData=[];  
  
    this.monthlybreakdownhoursbystationArr = [];
    this.monthlybreakdownhoursbystationtotalArr=[];
  
    this.getmonthlybreakdownhoursbystationxaxis=[];
  
    this.monthlybreakdownhoursbystationData=[];
    this.monthlybreakdownprecentagebystationData=[];
  
    this.monthlyslowdownhoursArr = [];  
    this.monthlyslowdownhourstotalArr = [];
    this.monthlyslowdownhoursData=[];
    this.monthlyslowdownhoursprecentageData=[];
  
    this.monthlyslowdownhourspArr = [];
    this.monthlyslowdownhoursptotalArr = [];
    this.monthlyslowdownhourspData=[];
    this.monthlyslowdownhoursprecentagepData=[];
  
    this.monthlyslowdownhoursmeArr = [];
    this.monthlyslowdownhoursmetotalArr = [];
    this.monthlyslowdownhoursmeData=[];
    this.monthlyslowdownhoursprecentagemeData=[];
  
    this.slowdownhoursbystationArr = [];
    this.slowdownhoursbystationtotalArr = []; 
    this.slowdownhoursbystationData=[];
    this.slowdownhoursbystationprecentageData=[];
  }
}
