import { Component, OnInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.page.html",
  styleUrls: ["./chatbot.page.scss"],
})
export class ChatbotPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;
  language = this.userlist.language;
  chatboturl = this.userlist.chatbot_url;

  mill_name = this.userlist.millname;

  weburl;

  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUrl();
  }

  getUrl() {
    /*let formatedurl =
      this.baseurl +
      "/Production_dashboard/new?mobile=1&user_id=" +
      this.user_id +
      "&language=" +
      this.language;

    console.log(formatedurl);*/

    let formatedurl = this.chatboturl;

    this.weburl = formatedurl;
  }
}
