import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ceo-dailylabreport",
  templateUrl: "./ceo-dailylabreport.page.html",
  styleUrls: ["./ceo-dailylabreport.page.scss"],
})
export class CeoDailylabreportPage implements OnInit {
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
      "/index.php/Lab_reports/Daily_report?user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    console.log(formatedurl);

    this.weburl = formatedurl;
  }
}
