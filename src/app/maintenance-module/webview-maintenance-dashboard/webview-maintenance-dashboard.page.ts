import { Component, OnInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: "app-webview-maintenance-dashboard",
  templateUrl: "./webview-maintenance-dashboard.page.html",
  styleUrls: ["./webview-maintenance-dashboard.page.scss"],
})
export class WebviewMaintenanceDashboardPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  language = this.userlist.language;
  baseurl = this.userlist.report_url;

  mill_name = this.userlist.millname;

  weburl;

  constructor(private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this.getUrl();
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
      this.baseurl +
      "/Maintanence_dashboard?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    //console.log(formatedurl);

    this.weburl = formatedurl;
  }
}
