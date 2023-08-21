import { Component, OnInit, NgZone } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { Router } from "@angular/router";
import { appsettings } from "src/app/appsettings";
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";

@Component({
  selector: "app-boilelogbook",
  templateUrl: "./boilelogbook.page.html",
  styleUrls: ["./boilelogbook.page.scss"],
})
export class BoilelogbookPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  department_id = this.userlist.dept_id;
  millcode = this.userlist.millcode;
  mill_name = this.userlist.millname;
  language = this.userlist.language;

  baseurl = this.userlist.report_url;

  weburl;

  constructor(
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private httpservice: HttpserviceService,
    private zone: NgZone
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getUrl();
    //console.log(this.baseurl);
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

  ionViewWillLeave() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }

  getUrl() {
    let formatedurl =
      this.baseurl +
      "/index.php/Reports/Boiler_log_book?mobile=1&user_id=" +
      this.user_id +
      "&millcode=" +
      this.millcode +
      "&departmentid=" +
      this.department_id +
      "&language" +
      this.language;

    console.log(formatedurl);

    this.weburl = formatedurl;
  }
}
