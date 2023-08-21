import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceoreports",
  templateUrl: "./ceoreports.page.html",
  styleUrls: ["./ceoreports.page.scss"],
})
export class CeoreportsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  itemsArr = [
    [
      {
        title: "Daily P&L Report",
        name: "Daily P&L Report",
        path: "/dailypl",
        imgpath: "../../assets/img/profitandloss.png",
      },
      {
        title: "FFB Creditors Statement",
        name: "FFB Creditors Statement",
        path: "/ffbcreditorsreport",
        imgpath: "../../assets/img/ffbcreditorsreport.png",
      },
      {
        title: "Debtors",
        name: "Debtors",
        path: "/ffbdebitorreport",
        imgpath: "../../assets/img/ffbdebitorreport.png",
      },
      {
        title: "Cash Flow",
        name: "Cash Flow",
        path: "/cashflowreport",
        imgpath: "../../assets/img/cashflowreport.png",
      },
      {
        title: "Cash Flow Statement",
        name: "Cash Flow Statement",
        path: "/cashflowstatementreport",
        imgpath: "../../assets/img/cashflowstatementreport.png",
      },
      {
        title: "Production Report",
        name: "Production Report",
        path: "/productionreport",
        imgpath: "../../assets/img/productionreport.png",
      },
      {
        title: "Production Hourly Report",
        name: "Production Hourly Report",
        path: "/ceo-hourlyreport",
        imgpath: "../../assets/img/hourlyreport.png",
      },
      {
        title: "Store Issue Report",
        name: "Store Issue Report",
        path: "/issuereport",
        imgpath: "../../assets/img/issuereport.png",
      },
      {
        title: "Store Purchase Report",
        name: "Store Purchase Report",
        path: "/purchasereport",
        imgpath: "../../assets/img/purchasereport.png",
      },
      {
        title: "Mill Performance Report",
        name: "Mill Performance Report",
        path: "/ceo-millperformancereport",
        imgpath: "../../assets/img/boilerlog.png",
      },
      {
        title: "SOP Compliance Report",
        name: "SOP Compliance Report",
        path: "/compliancereport",
        imgpath: "../../assets/img/sustainchecklist.png",
      },
      {
        title: "Breakdown List",
        name: "Breakdown List",
        path: "/ceo-breakdownlist",
        imgpath: "../../assets/img/ceomaintenancereport.png",
      },
      {
        title: "Breakdown Report",
        name: "Breakdown Report",
        path: "/ceo-breakdown",
        imgpath: "../../assets/img/breakdownreport.png",
      },
      /*{
        title: "Boiler Log Report",
        name: "Boiler Log Report",
        path: "/ceo-boilerlogreport",
        imgpath: "../../assets/img/boilerreport.png",
      },
      {
        title: "Production Hourly Report",
        name: "Production Hourly Report",
        path: "/ceo-hourlyreport",
        imgpath: "../../assets/img/hourlyreport.png",
      },
      {
        title: "Lab Hourly Report",
        name: "Hourly-Lab Report",
        path: "/ceo-hourlylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },*/
      {
        title: "Lab Daily Report",
        name: "Daily-Lab Report",
        path: "/ceo-dailylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },
      {
        title: "Scheduling Report",
        name: "Scheduling Report",
        path: "/ceo-schedulingreport",
        imgpath: "../../assets/img/productiontimeline.png",
      },
      {
        title: "Engineers Checklist Report",
        name: "Engineers Checklist Report",
        path: "/ceo-productionandmaintenancechecklistreport",
        imgpath: "../../assets/img/supervisorreport.png",
      },
      {
        title: "Running Hours Report",
        name: "Running Hours Report",
        path: "/ceo-machinerunninghoursreport",
        imgpath: "../../assets/img/machinerunninghours.png",
      },
      {
        title: "User Activity Report",
        name: "User Activity Report",
        path: "/ceo-useractivity-home",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      {
        title: "Grading Report",
        name: "Grading Report",
        path: "/ceo-gradingreport",
        imgpath: "../../assets/img/gradingreport.png",
      },
      {
        title: "Weighbridge Report",
        name: "Weighbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
      },
      {
        title: "User Log Report",
        name: "User Log Report",
        path: "/ceo-userlogreport",
        imgpath: "../../assets/img/userlog.png",
      },
    ],
  ];

  visitingconsultantArr = [
    [
      {
        title: "Daily P&L Report",
        name: "Daily P&L Report",
        path: "/dailypl",
        imgpath: "../../assets/img/profitandloss.png",
      },
      {
        title: "FFB Creditors Statement",
        name: "FFB Creditors Statement",
        path: "/ffbcreditorsreport",
        imgpath: "../../assets/img/ffbcreditorsreport.png",
      },
      {
        title: "Debtors",
        name: "Debtors",
        path: "/ffbdebitorreport",
        imgpath: "../../assets/img/ffbdebitorreport.png",
      },
      {
        title: "Cash Flow",
        name: "Cash Flow",
        path: "/cashflowreport",
        imgpath: "../../assets/img/cashflowreport.png",
      },
      {
        title: "Cash Flow Statement",
        name: "Cash Flow Statement",
        path: "/cashflowstatementreport",
        imgpath: "../../assets/img/cashflowstatementreport.png",
      },
      {
        title: "Production Report",
        name: "Production Report",
        path: "/productionreport",
        imgpath: "../../assets/img/productionreport.png",
      },
      {
        title: "Store Issue Report",
        name: "Store Issue Report",
        path: "/issuereport",
        imgpath: "../../assets/img/issuereport.png",
      },
      {
        title: "Store Purchase Report",
        name: "Store Purchase Report",
        path: "/purchasereport",
        imgpath: "../../assets/img/purchasereport.png",
      },
      {
        title: "Mill Performance Report",
        name: "Mill Performance Report",
        path: "/ceo-millperformancereport",
        imgpath: "../../assets/img/boilerlog.png",
      },
      {
        title: "SOP Compliance Report",
        name: "SOP Compliance Report",
        path: "/compliancereport",
        imgpath: "../../assets/img/sustainchecklist.png",
      },
      {
        title: "Breakdown List",
        name: "Breakdown List",
        path: "/ceo-breakdownlist",
        imgpath: "../../assets/img/ceomaintenancereport.png",
      },
      {
        title: "Breakdown Report",
        name: "Breakdown Report",
        path: "/ceo-breakdown",
        imgpath: "../../assets/img/breakdownreport.png",
      },
      /*{
        title: "Boiler Log Report",
        name: "Boiler Log Report",
        path: "/ceo-boilerlogreport",
        imgpath: "../../assets/img/boilerreport.png",
      },
      {
        title: "Production Hourly Report",
        name: "Production Hourly Report",
        path: "/ceo-hourlyreport",
        imgpath: "../../assets/img/hourlyreport.png",
      },
      {
        title: "Lab Hourly Report",
        name: "Hourly-Lab Report",
        path: "/ceo-hourlylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },*/
      {
        title: "Lab Daily Report",
        name: "Daily-Lab Report",
        path: "/ceo-dailylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },
      {
        title: "Scheduling Report",
        name: "Scheduling Report",
        path: "/ceo-schedulingreport",
        imgpath: "../../assets/img/productiontimeline.png",
      },
      {
        title: "Engineers Checklist Report",
        name: "Engineers Checklist Report",
        path: "/ceo-productionandmaintenancechecklistreport",
        imgpath: "../../assets/img/supervisorreport.png",
      },
      {
        title: "Running Hours Report",
        name: "Running Hours Report",
        path: "/ceo-machinerunninghoursreport",
        imgpath: "../../assets/img/machinerunninghours.png",
      },
      {
        title: "User Activity Report",
        name: "User Activity Report",
        path: "/ceo-useractivity-home",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      {
        title: "Grading Report",
        name: "Grading Report",
        path: "/ceo-gradingreport",
        imgpath: "../../assets/img/gradingreport.png",
      },
      {
        title: "Weighbridge Report",
        name: "Weighbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
      },
      {
        title: "User Log Report",
        name: "User Log Report",
        path: "/ceo-userlogreport",
        imgpath: "../../assets/img/userlog.png",
      },
    ],
  ];

  managerArr = [
    [
      {
        title: "Daily P&L Report",
        name: "Daily P&L Report",
        path: "/dailypl",
        imgpath: "../../assets/img/profitandloss.png",
      },
      {
        title: "FFB Creditors Statement",
        name: "FFB Creditors Statement",
        path: "/ffbcreditorsreport",
        imgpath: "../../assets/img/ffbcreditorsreport.png",
      },
      {
        title: "Debtors",
        name: "Debtors",
        path: "/ffbdebitorreport",
        imgpath: "../../assets/img/ffbdebitorreport.png",
      },
      {
        title: "Cash Flow",
        name: "Cash Flow",
        path: "/cashflowreport",
        imgpath: "../../assets/img/cashflowreport.png",
      },
      {
        title: "Cash Flow Statement",
        name: "Cash Flow Statement",
        path: "/cashflowstatementreport",
        imgpath: "../../assets/img/cashflowstatementreport.png",
      },
      {
        title: "Production Report",
        name: "Production Report",
        path: "/productionreport",
        imgpath: "../../assets/img/productionreport.png",
      },
      {
        title: "Store Issue Report",
        name: "Store Issue Report",
        path: "/issuereport",
        imgpath: "../../assets/img/issuereport.png",
      },
      {
        title: "Store Purchase Report",
        name: "Store Purchase Report",
        path: "/purchasereport",
        imgpath: "../../assets/img/purchasereport.png",
      },
      {
        title: "Mill Performance Report",
        name: "Mill Performance Report",
        path: "/ceo-millperformancereport",
        imgpath: "../../assets/img/boilerlog.png",
      },
      {
        title: "SOP Compliance Report",
        name: "SOP Compliance Report",
        path: "/compliancereport",
        imgpath: "../../assets/img/sustainchecklist.png",
      },
      {
        title: "Breakdown List",
        name: "Breakdown List",
        path: "/ceo-breakdownlist",
        imgpath: "../../assets/img/ceomaintenancereport.png",
      },
      {
        title: "Breakdown Report",
        name: "Breakdown Report",
        path: "/ceo-breakdown",
        imgpath: "../../assets/img/breakdownreport.png",
      },
      /*{
        title: "Boiler Log Report",
        name: "Boiler Log Report",
        path: "/ceo-boilerlogreport",
        imgpath: "../../assets/img/boilerreport.png",
      },
      {
        title: "Production Hourly Report",
        name: "Production Hourly Report",
        path: "/ceo-hourlyreport",
        imgpath: "../../assets/img/hourlyreport.png",
      },
      {
        title: "Lab Hourly Report",
        name: "Hourly-Lab Report",
        path: "/ceo-hourlylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },*/
      {
        title: "Lab Daily Report",
        name: "Daily-Lab Report",
        path: "/ceo-dailylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },
      {
        title: "Scheduling Report",
        name: "Scheduling Report",
        path: "/ceo-schedulingreport",
        imgpath: "../../assets/img/productiontimeline.png",
      },
      {
        title: "Engineers Checklist Report",
        name: "Engineers Checklist Report",
        path: "/ceo-productionandmaintenancechecklistreport",
        imgpath: "../../assets/img/supervisorreport.png",
      },
      {
        title: "Running Hours Report",
        name: "Running Hours Report",
        path: "/ceo-machinerunninghoursreport",
        imgpath: "../../assets/img/machinerunninghours.png",
      },
      {
        title: "User Activity Report",
        name: "User Activity Report",
        path: "/ceo-useractivity-home",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      {
        title: "Grading Report",
        name: "Grading Report",
        path: "/ceo-gradingreport",
        imgpath: "../../assets/img/gradingreport.png",
      },
      {
        title: "Weighbridge Report",
        name: "Weighbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
      },
      {
        title: "User Log Report",
        name: "User Log Report",
        path: "/ceo-userlogreport",
        imgpath: "../../assets/img/userlog.png",
      },
    ],
  ];

  constructor(
    private router: Router,
    private zone: NgZone,
    private commonservice: AIREIService
  ) {}

  ngOnInit() {}

  dailypl() {
    this.router.navigate(["/dailypl"]);
  }

  productionreport() {
    this.router.navigate(["/productionreport"]);
  }

  cashflow() {
    this.router.navigate(["/cashflowreport"]);
  }

  cashflowstatement() {
    this.router.navigate(["/cashflowstatementreport"]);
  }

  ffbcreditors() {
    this.router.navigate(["/ffbcreditorsreport"]);
  }

  dailystockissue() {
    this.router.navigate(["/dailystockissue"]);
  }

  sor() {
    this.router.navigate(["/sorreport"]);
  }

  healthreport() {
    this.router.navigate(["/healthreport"]);
  }

  sustainchecklist() {
    this.router.navigate(["/sustainchecklist"]);
  }

  abcdreport() {
    this.router.navigate(["/abcdreport"]);
  }

  ffbdebitorreport() {
    this.router.navigate(["/ffbdebitorreport"]);
  }

  millreport() {
    this.router.navigate(["/millreport"]);
  }

  maintenancereport() {
    this.router.navigate(["/ceomaintenancereport"]);
  }

  budgetcomparereport() {
    this.router.navigate(["/budgetcomparereport"]);
  }

  purchasereport() {
    this.router.navigate(["/purchasereport"]);
  }

  issuereport() {
    this.router.navigate(["/issuereport"]);
  }

  mmslogreport() {
    this.router.navigate(["/productiontimelinehome"]);
  }

  directorreport() {
    this.router.navigate(["/directorreport"]);
  }

  costofproductionreport() {
    this.router.navigate(["/costofproductionreport"]);
  }

  purchasemonthlyreport() {
    this.router.navigate(["/purchasemonthlyreport"]);
  }

  dailystock() {
    this.router.navigate(["/dailystockreport"]);
  }

  traceability() {
    this.router.navigate(["/traceabilityreport"]);
  }

  supervisorreport() {
    this.router.navigate(["/supervisorreport"]);
  }

  sorhistory() {
    this.router.navigate(["/ceosorhistory"]);
  }

  kpi() {
    this.router.navigate(["/kpireport"]);
  }

  boilerlog() {
    this.router.navigate(["/boilerlogreport"]);
  }

  securityrounds() {
    this.router.navigate(["/securityroundsreport"]);
  }

  livetracking() {
    this.router.navigate(["/livetrackingreport"]);
  }

  quoteapproval() {
    this.router.navigate(["/quoteapproval"]);
  }

  btn_Action(item) {
    this.router.navigate([item.path]);
  }
}
