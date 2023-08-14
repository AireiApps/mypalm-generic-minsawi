import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ceo-breakdown",
  templateUrl: "./ceo-breakdown.page.html",
  styleUrls: ["./ceo-breakdown.page.scss"],
})
export class CeoBreakdownPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  department_id = this.userlist.dept_id;
  mill_code = this.userlist.millcode;
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
      "/index.php/Maintain_report/Breakdown_report?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    console.log(formatedurl);

    this.weburl = formatedurl;
  }
}
