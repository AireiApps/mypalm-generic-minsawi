import { Component, OnInit, NgZone } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { appsettings } from "src/app/appsettings";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-webview-weeklyreport",
  templateUrl: "./webview-weeklyreport.page.html",
  styleUrls: ["./webview-weeklyreport.page.scss"],
})
export class WebviewWeeklyreportPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  language = this.userlist.language;
  baseurl = this.userlist.report_url;
  //mill_name = appsettings.MILL_NAME;

  mill_name = this.userlist.millname;

  weburl;

  constructor(
    public modalController: ModalController,
    private screenOrientation: ScreenOrientation
  ) {
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
      this.baseurl +
      "/Weekly_report?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    //console.log(formatedurl);

    this.weburl = formatedurl;
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      data: "",
    });
  }
}
