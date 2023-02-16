import { Component, OnInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: "app-scheduling-report",
  templateUrl: "./scheduling-report.page.html",
  styleUrls: ["./scheduling-report.page.scss"],
})
export class SchedulingReportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  language = this.userlist.language;

  mill_name = this.userlist.millname;

  weburl;

  constructor(private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getUrl();
  }

  ionViewWillEnter() {
    this.getUrl();
  }

  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }

  getUrl() {
    let formatedurl =
      "http://103.27.72.29/mypalmtest/index.php/Maintenance_planning/schedule?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    this.weburl = formatedurl;
  }
}
