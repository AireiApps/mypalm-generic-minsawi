import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ceo-productionandmaintenancechecklistreport",
  templateUrl: "./ceo-productionandmaintenancechecklistreport.page.html",
  styleUrls: ["./ceo-productionandmaintenancechecklistreport.page.scss"],
})
export class CeoProductionandmaintenancechecklistreportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  language = this.userlist.language;
  baseurl = this.userlist.report_url;

  mill_name = this.userlist.millname;

  weburl;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getUrl();
  }

  ionViewWillEnter() {
    this.getUrl();
  }

  getUrl() {
    let formatedurl =
      this.baseurl +
      "/index.php/Production_hourly_check_report/Checklist_report?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    this.weburl = formatedurl;
  }
}
