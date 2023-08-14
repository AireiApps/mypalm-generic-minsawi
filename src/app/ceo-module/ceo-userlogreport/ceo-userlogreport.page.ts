import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ceo-userlogreport",
  templateUrl: "./ceo-userlogreport.page.html",
  styleUrls: ["./ceo-userlogreport.page.scss"],
})
export class CeoUserlogreportPage implements OnInit {
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
      "/index.php/User_activity_report?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    console.log(formatedurl);

    this.weburl = formatedurl;
  }
}
