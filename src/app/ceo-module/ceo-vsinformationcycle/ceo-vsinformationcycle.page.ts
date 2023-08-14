import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ceo-vsinformationcycle",
  templateUrl: "./ceo-vsinformationcycle.page.html",
  styleUrls: ["./ceo-vsinformationcycle.page.scss"],
})
export class CeoVsinformationcyclePage implements OnInit {
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
      "/index.php/Production_hourly_check_report/VS_info_cycle?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    this.weburl = formatedurl;
  }
}
