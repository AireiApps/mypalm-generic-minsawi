import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceo-productionreports-home",
  templateUrl: "./ceo-productionreports-home.page.html",
  styleUrls: ["./ceo-productionreports-home.page.scss"],
})
export class CeoProductionreportsHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  itemsArr = [
    [
      {
        title: "Production Daily",
        subtitle:"Report",
        name: "Production Daily Report",
        path: "/productionreport",
        imgpath: "../../assets/img/productionreport.png",
      },
      {
        title: "Production Hourly",
        subtitle:"Report",
        name: "Production Hourly Report",
        path: "/ceo-hourlyreport",
        imgpath: "../../assets/img/hourlyreport.png",
      },
    ],
    [
      {
        title: "Boiler Log",
        subtitle:"Report",
        name: "Boiler Log Report",
        path: "/ceo-boilerlogreport",
        imgpath: "../../assets/img/boilerreport.png",
      },
      {
        title: "Lab Daily",
        subtitle:"Report",
        name: "Daily-Lab Report",
        path: "/ceo-dailylabreport",
        imgpath: "../../assets/img/labdailyreport.png",
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
