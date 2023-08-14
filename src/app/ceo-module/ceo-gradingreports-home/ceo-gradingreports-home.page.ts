import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";

@Component({
  selector: "app-ceo-gradingreports-home",
  templateUrl: "./ceo-gradingreports-home.page.html",
  styleUrls: ["./ceo-gradingreports-home.page.scss"],
})
export class CeoGradingreportsHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  itemsArr = [
    [
      {
        title: "Grading",
        subtitle: "Report",
        name: "Grading Report",
        path: "/ceo-gradingreport",
        imgpath: "../../assets/img/gradingreport.png",
      },
      {
        title: "Weightbridge",
        subtitle: "Report",
        name: "Weightbridge Report",
        path: "/ceo-weighbridgereport",
        imgpath: "../../assets/img/weighbridge.png",
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
