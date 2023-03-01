import { Component, OnInit, NgZone } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-oilloss-predictionanalysis",
  templateUrl: "./dashboard-oilloss-predictionanalysis.page.html",
  styleUrls: ["./dashboard-oilloss-predictionanalysis.page.scss"],
})
export class DashboardOillossPredictionanalysisPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;

  baseurl = this.userlist.report_url;
  oillosspredictionanalysis = this.userlist.report_oillosspredictionanalysis;

  weburl;
  iconname = "tablet-landscape-outline";

  constructor(private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getUrl();
  }

  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }

  /*btn_orientation() {
    if (this.screenOrientation.type == "portrait-primary") {
      this.iconname = "tablet-portrait-outline";
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );
    } else if (this.screenOrientation.type == "landscape-primary") {
      this.iconname = "tablet-landscape-outline";
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      );
    }
  }*/

  getUrl() {
    let formatedurl =
      this.baseurl +
      this.oillosspredictionanalysis +
      "?mobile=1&user_id=" +
      this.user_id;

    //console.log(formatedurl);

    this.weburl = formatedurl;
  }
}
