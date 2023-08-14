import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AIREIService } from 'src/app/api/api.service';

@Component({
  selector: 'app-ceomonthlyreports',
  templateUrl: './ceomonthlyreports.page.html',
  styleUrls: ['./ceomonthlyreports.page.scss'],
})
export class CeomonthlyreportsPage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));
  itemsArr = [
    [
      {
        title: "Profit & Loss",
        subtitle: "Report",
        name: "Profit & Loss Report",
        path: "/profitandloss",
        imgpath: "../../assets/img/profitandloss.png",
      },
      {
        title: "Trial Balance",
        subtitle: "Report",
        name: "Trial Balance Report",
        path: "/trialbalancereport",
        imgpath: "../../assets/img/trialbalance.png",
      },
    ],
    [
      {
        title: "Balance Sheet",
        subtitle: "Report",
        name: "Balance Sheet Report",
        path: "/balancesheet",
        imgpath: "../../assets/img/balancesheet.png",
      },
      {
        title: "Debtors Account",
        subtitle: "Report",
        name: "Debtors Account Report",
        path: "/debtorsaccountreport",
        imgpath: "../../assets/img/montlydebtor.png",
      },
    ],
    [
      {
        title: "FFB Creditors Monthly",
        subtitle: "",
        name: "FFB Creditor Monthly",
        path: "/monthlyffbcreditorsreport",
        imgpath: "../../assets/img/monthlyffbcreditor.png",
      },
      {
        title: "Expense",
        subtitle: "Report",
        name: "Expense Repor",
        path: "/dailyexpensereport",
        imgpath: "../../assets/img/expense.png",
      },
    ],
    [
      {
        title: "Store Creditor",
        subtitle: "Report",
        name: "Store Creditor Report",
        path: "/storecreditorreport",
        imgpath: "../../assets/img/storecreditor.png",
      },
      {
        title: "Prepayment",
        subtitle: "Report",
        name: "Prepayment Report",
        path: "/prepaymentreport",
        imgpath: "../../assets/img/prepayment.png",
      },
    ],
    [
      {
        title: "Accrued Charges",
        subtitle: "Report",
        name: "Accrued Charges Report",
        path: "/accuredchargesreport",
        imgpath: "../../assets/img/accruedcharges.png",
      },
    ],
  ];

  constructor(private router: Router, private zone: NgZone, private commonservice: AIREIService) { }

  ngOnInit() {
  }
  btn_Action(item) {
    this.router.navigate([item.path]);
  }
}
