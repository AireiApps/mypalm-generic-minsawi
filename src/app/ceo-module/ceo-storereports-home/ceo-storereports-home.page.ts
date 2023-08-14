import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceo-storereports-home",
  templateUrl: "./ceo-storereports-home.page.html",
  styleUrls: ["./ceo-storereports-home.page.scss"],
})
export class CeoStorereportsHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  itemsArr = [
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
