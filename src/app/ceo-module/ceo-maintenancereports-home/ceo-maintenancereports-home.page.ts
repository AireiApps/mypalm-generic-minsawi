import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceo-maintenancereports-home",
  templateUrl: "./ceo-maintenancereports-home.page.html",
  styleUrls: ["./ceo-maintenancereports-home.page.scss"],
})
export class CeoMaintenancereportsHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  itemsArr = [
    [
      {
        title: "Breakdown",
        subtitle:"List",
        name: "Breakdown List",
        path: "/ceo-breakdownlist",
        imgpath: "../../assets/img/ceomaintenancereport.png",
      },      
      {
        title: "Scheduling",
        subtitle:"Report",
        name: "Scheduling Report",
        path: "/ceo-schedulingreport",
        imgpath: "../../assets/img/productiontimeline.png",
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
