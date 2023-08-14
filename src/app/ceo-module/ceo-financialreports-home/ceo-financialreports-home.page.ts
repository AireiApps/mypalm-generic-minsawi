import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceo-financialreports-home",
  templateUrl: "./ceo-financialreports-home.page.html",
  styleUrls: ["./ceo-financialreports-home.page.scss"],
})
export class CeoFinancialreportsHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  itemsArr = [
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
