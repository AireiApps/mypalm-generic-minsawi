import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pk-dispatch-report',
  templateUrl: './pk-dispatch-report.page.html',
  styleUrls: ['./pk-dispatch-report.page.scss'],
})
export class PkDispatchReportPage implements OnInit {

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
      "/Production_reports/CPO_dispatch_report_mobile?id=1";

    console.log(formatedurl)

    this.weburl = formatedurl;
  }
}
