import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ceo-vshourlypressure',
  templateUrl: './ceo-vshourlypressure.page.html',
  styleUrls: ['./ceo-vshourlypressure.page.scss'],
})
export class CeoVshourlypressurePage implements OnInit {

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
      "/index.php/Production_hourly_check_report/VS_hourly_pressure?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    this.weburl = formatedurl;
  }

}
