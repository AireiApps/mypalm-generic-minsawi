import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-hourly-reports-home",
  templateUrl: "./hourly-reports-home.page.html",
  styleUrls: ["./hourly-reports-home.page.scss"],
})
export class HourlyReportsHomePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;
  mill_name = this.nl2br(this.userlist.millname);

  reportArr = [
    [
    {
      title: "Hourly Lab",
      subtitle:"Report",
      name: "Hourly Lab Report",
      path: "/ceo-hourlylabreport",
      imgpath: "../../assets/img/labdailyreport.png",
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
      title: "VS Information",
      subtitle:"Cycle",
      name: "VS Information Cycle",
      path: "/ceo-vsinformationcycle",
      imgpath: "../../assets/img/verticalsterilizer.png",
    },
  ],
  [
    {
      title: "VS Hourly",
      subtitle:"Pressure",
      name: "VS Hourly Pressure",
      path: "/ceo-vshourlypressure",
      imgpath: "../../assets/img/verticalsterilizer.png",
    },
  ]
]

  constructor(private router: Router) {}

  ngOnInit() {}

  btn_Action(item) {
    this.router.navigate([item.path]);
  }
  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
