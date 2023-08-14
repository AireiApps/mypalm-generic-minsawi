import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AIREIService } from 'src/app/api/api.service';

@Component({
  selector: 'app-approvals-home',
  templateUrl: './approvals-home.page.html',
  styleUrls: ['./approvals-home.page.scss'],
})
export class ApprovalsHomePage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));
  itemsArr = [
    [
      {
        title: "Store Order",
        subtitle: "Requisition",
        name: "Store Order Requisition",
        path: "/quoteapproval",
        imgpath: "../../assets/img/palmoilquoteapproval.png",
      },
      {
        title: "Work Order",
        subtitle: "Report",
        name: "Work Order Report",
        path: "/workorderreport",
        imgpath: "../../assets/img/poapproval.png",
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
