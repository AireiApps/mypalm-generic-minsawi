import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ceo-useractivity-production",
  templateUrl: "./ceo-useractivity-production.page.html",
  styleUrls: ["./ceo-useractivity-production.page.scss"],
})
export class CeoUseractivityProductionPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  mill_name = this.userlist.millname;
  language = this.userlist.language;

  baseurl = this.userlist.report_url;

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
    "/index.php/Maintain_report/Maintanence_log_report?mobile=1&user_id=" +
    this.user_id +
    "&dept_id=4" +
    "&language=" +
    this.language;

    this.weburl = formatedurl;
  }
}
