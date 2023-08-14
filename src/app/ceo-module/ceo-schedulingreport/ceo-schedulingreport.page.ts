import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: 'app-ceo-schedulingreport',
  templateUrl: './ceo-schedulingreport.page.html',
  styleUrls: ['./ceo-schedulingreport.page.scss'],
})
export class CeoSchedulingreportPage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  language = this.userlist.language;
  //mill_name = appsettings.MILL_NAME;

  mill_name = this.userlist.millname;
  baseurl = this.userlist.report_url;

  weburl;

  constructor(
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
      this.baseurl + "/index.php/Maintenance_planning/schedule?mobile=1&user_id="+
      this.user_id +
      "&language=" +
      this.language;

    console.log(formatedurl)
    this.weburl = formatedurl;
  }

}
