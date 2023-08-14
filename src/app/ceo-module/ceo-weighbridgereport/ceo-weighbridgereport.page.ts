import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ceo-weighbridgereport',
  templateUrl: './ceo-weighbridgereport.page.html',
  styleUrls: ['./ceo-weighbridgereport.page.scss'],
})
export class CeoWeighbridgereportPage implements OnInit {

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
      "/index.php/WB_dashboard/mobile?user_id=" +
      this.user_id +
      "&department_id=" +
      this.department_id +
      "&millcode=" +
      this.mill_code +
      "&language=" +
      this.language;

    this.weburl = formatedurl;
  }

}
