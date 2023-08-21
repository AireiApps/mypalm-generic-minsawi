import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceo-dailyreports",
  templateUrl: "./ceo-dailyreports.page.html",
  styleUrls: ["./ceo-dailyreports.page.scss"],
})
export class CeoDailyreportsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  itemsArr = [
    [
      // {
      //   title: "Grading",
      //   subtitle: "Reports",
      //   name: "Grading Reports",
      //   path: "/ceo-gradingreports-home",
      //   imgpath: "../../assets/img/gradingreporthome.png",
      // },
      {
        title: "Weighbridge",
        subtitle: "Report",
        name: "Weighbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
      },
      {
        title: "Financial",
        subtitle: "Reports",
        name: "Financial Reports",
        path: "/ceo-financialreports-home",
        imgpath: "../../assets/img/profitandloss.png",
      },
    ],
    [
      {
        title: "Production",
        subtitle: "Reports",
        name: "Production Reports",
        path: "/ceo-productionreports-home",
        imgpath: "../../assets/img/productionreporthome.png",
      },
      {
        title: "Store",
        subtitle: "Reports",
        name: "Store Reports",
        path: "/ceo-storereports-home",
        imgpath: "../../assets/img/storereporthome.png",
      },
    ],
    [
      {
        title: "Maintenance",
        subtitle: "Reports",
        name: "Maintenance Reports",
        path: "/ceo-maintenancereports-home",
        imgpath: "../../assets/img/maintenancereporthome.png",
      },
      {
        title: "CPO Dispatch",
        subtitle: "Report",
        name: "CPO Dispatch Report",
        path: "/cpo-dispatch-report",
        imgpath: "../../assets/img/cpo-dispatch.png",
      },
    ],
    [
      {
        title: "PK Dispatch",
        subtitle: "Report",
        name: "PK Dispatch Report",
        path: "/pk-dispatch-report",
        imgpath: "../../assets/img/pkdispatch.png",
      },
      {
        title: "Other Dispatch",
        subtitle: "Report",
        name: "Other Dispatch Report",
        path: "/other-dispatch-report",
        imgpath: "../../assets/img/otherdispatch.png",
      },
    ],
  ];

  visitingconsultantArr = [
    [
      {
        title: "Daily P&L",
        subtitle: "Report",
        name: "Daily P&L Report",
        path: "/dailypl",
        imgpath: "../../assets/img/profitandloss.png",
      },
      {
        title: "FFB Creditors",
        subtitle: "Statement",
        name: "FFB Creditors Statement",
        path: "/ffbcreditorsreport",
        imgpath: "../../assets/img/ffbcreditorsreport.png",
      },
    ],
    [
      {
        title: "Debtors",
        subtitle: "",
        name: "Debtors",
        path: "/ffbdebitorreport",
        imgpath: "../../assets/img/ffbdebitorreport.png",
      },
      {
        title: "Cash Flow",
        subtitle: "",
        name: "Cash Flow",
        path: "/cashflowreport",
        imgpath: "../../assets/img/cashflowreport.png",
      },
    ],
    [
      {
        title: "Cash Flow",
        subtitle: "Statement",
        name: "Cash Flow Statement",
        path: "/cashflowstatementreport",
        imgpath: "../../assets/img/cashflowstatementreport.png",
      },
      {
        title: "Production",
        subtitle: "Report",
        name: "Production Report",
        path: "/productionreport",
        imgpath: "../../assets/img/productionreport.png",
      },
    ],
    [
      {
        title: "Store Issue",
        subtitle: "Report",
        name: "Store Issue Report",
        path: "/issuereport",
        imgpath: "../../assets/img/issuereport.png",
      },
      {
        title: "Store Purchase",
        subtitle: "Report",
        name: "Store Purchase Report",
        path: "/purchasereport",
        imgpath: "../../assets/img/purchasereport.png",
      },
    ],
    [
      {
        title: "Mill Performance",
        subtitle: "Report",
        name: "Mill Performance Report",
        path: "/ceo-millperformancereport",
        imgpath: "../../assets/img/boilerlog.png",
      },
      {
        title: "SOP Compliance",
        subtitle: "Report",
        name: "SOP Compliance Report",
        path: "/compliancereport",
        imgpath: "../../assets/img/sustainchecklist.png",
      },
    ],
    [
      {
        title: "Breakdown",
        subtitle: "List",
        name: "Breakdown List",
        path: "/ceo-breakdownlist",
        imgpath: "../../assets/img/ceomaintenancereport.png",
      },
      {
        title: "Breakdown",
        subtitle: "Report",
        name: "Breakdown Report",
        path: "/ceo-breakdown",
        imgpath: "../../assets/img/breakdownreport.png",
      },
    ],
    [
      {
        title: "Lab Daily",
        subtitle: "Report",
        name: "Daily-Lab Report",
        path: "/ceo-dailylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },
      {
        title: "Scheduling",
        subtitle: "Report",
        name: "Scheduling Report",
        path: "/ceo-schedulingreport",
        imgpath: "../../assets/img/productiontimeline.png",
      },
    ],
    [
      {
        title: "Engineers Checklist",
        subtitle: "Report",
        name: "Engineers Checklist Report",
        path: "/ceo-productionandmaintenancechecklistreport",
        imgpath: "../../assets/img/supervisorreport.png",
      },
      {
        title: "Running Hours",
        subtitle: "Report",
        name: "Running Hours Report",
        path: "/ceo-machinerunninghoursreport",
        imgpath: "../../assets/img/machinerunninghours.png",
      },
    ],
    [
      {
        title: "User Activity",
        subtitle: "Report",
        name: "User Activity Report",
        path: "/ceo-useractivity-home",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      // {
      //   title: "Grading",
      //   subtitle: "Report",
      //   name: "Grading Report",
      //   path: "/ceo-gradingreport",
      //   imgpath: "../../assets/img/gradingreport.png",
      // },
      {
        title: "Weighbridge",
        subtitle: "Report",
        name: "Weighbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
      },
    ],
    [
      {
        title: "User Log",
        subtitle: "Report",
        name: "User Log Report",
        path: "/ceo-userlogreport",
        imgpath: "../../assets/img/userlog.png",
      },
    ],
  ];

  managerArr = [
    [
      {
        title: "Daily P&L",
        subtitle: "Report",
        name: "Daily P&L Report",
        path: "/dailypl",
        imgpath: "../../assets/img/profitandloss.png",
      },
      {
        title: "FFB Creditors",
        subtitle: "Statement",
        name: "FFB Creditors Statement",
        path: "/ffbcreditorsreport",
        imgpath: "../../assets/img/ffbcreditorsreport.png",
      },
    ],
    [
      {
        title: "Debtors",
        subtitle: "",
        name: "Debtors",
        path: "/ffbdebitorreport",
        imgpath: "../../assets/img/ffbdebitorreport.png",
      },
      {
        title: "Cash Flow",
        subtitle: "",
        name: "Cash Flow",
        path: "/cashflowreport",
        imgpath: "../../assets/img/cashflowreport.png",
      },
    ],
    [
      {
        title: "Cash Flow",
        subtitle: "Statement",
        name: "Cash Flow Statement",
        path: "/cashflowstatementreport",
        imgpath: "../../assets/img/cashflowstatementreport.png",
      },
      {
        title: "Production",
        subtitle: "Report",
        name: "Production Report",
        path: "/productionreport",
        imgpath: "../../assets/img/productionreport.png",
      },
    ],
    [
      {
        title: "Store Issue",
        subtitle: "Report",
        name: "Store Issue Report",
        path: "/issuereport",
        imgpath: "../../assets/img/issuereport.png",
      },
      {
        title: "Store Purchase",
        subtitle: "Report",
        name: "Store Purchase Report",
        path: "/purchasereport",
        imgpath: "../../assets/img/purchasereport.png",
      },
    ],
    [
      {
        title: "Mill Performance",
        subtitle: "Report",
        name: "Mill Performance Report",
        path: "/ceo-millperformancereport",
        imgpath: "../../assets/img/boilerlog.png",
      },
      {
        title: "SOP Compliance",
        subtitle: "Report",
        name: "SOP Compliance Report",
        path: "/compliancereport",
        imgpath: "../../assets/img/sustainchecklist.png",
      },
    ],
    [
      {
        title: "Breakdown",
        subtitle: "List",
        name: "Breakdown List",
        path: "/ceo-breakdownlist",
        imgpath: "../../assets/img/ceomaintenancereport.png",
      },
      {
        title: "Breakdown",
        subtitle: "Report",
        name: "Breakdown Report",
        path: "/ceo-breakdown",
        imgpath: "../../assets/img/breakdownreport.png",
      },
    ],
    [
      {
        title: "Lab Daily",
        subtitle: "Report",
        name: "Daily-Lab Report",
        path: "/ceo-dailylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
      },
      {
        title: "Scheduling",
        subtitle: "Report",
        name: "Scheduling Report",
        path: "/ceo-schedulingreport",
        imgpath: "../../assets/img/productiontimeline.png",
      },
    ],
    [
      {
        title: "Engineers Checklist",
        subtitle: "Report",
        name: "Engineers Checklist Report",
        path: "/ceo-productionandmaintenancechecklistreport",
        imgpath: "../../assets/img/supervisorreport.png",
      },
      {
        title: "Running Hours",
        subtitle: "Report",
        name: "Running Hours Report",
        path: "/ceo-machinerunninghoursreport",
        imgpath: "../../assets/img/machinerunninghours.png",
      },
    ],
    [
      {
        title: "User Activity",
        subtitle: "Report",
        name: "User Activity Report",
        path: "/ceo-useractivity-home",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
      // {
      //   title: "Grading Report",
      //   name: "Grading Report",
      //   path: "/ceo-gradingreport",
      //   imgpath: "../../assets/img/gradingreport.png",
      // },
      {
        title: "Weighbridge",
        subtitle: "Report",
        name: "Weighbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
      },
    ],
    [
      {
        title: "User Log",
        subtitle: "Report",
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

  btn_Action(item) {
    this.router.navigate([item.path]);
  }
}
