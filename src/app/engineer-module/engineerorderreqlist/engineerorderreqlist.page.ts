import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpserviceService } from "src/app/services/httpservice/httpservice.service";
import { EngineerServiceService } from "src/app/services/engineer-service/engineer-service.service";
import { AIREIService } from "src/app/api/api.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-engineerorderreqlist",
  templateUrl: "./engineerorderreqlist.page.html",
  styleUrls: ["./engineerorderreqlist.page.scss"],
})
export class EngineerorderreqlistPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  recentStore = [];
  uinorecordFlag = true;
  norecordFlag = false;
  pleasewaitflag = false;

  constructor(
    private httpservice: HttpserviceService,
    private service: EngineerServiceService,
    private router: Router,
    private commonservice: AIREIService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getMaintanceOrder();
  }

  ionViewDidEnter() {
    this.getMaintanceOrder();
  }

  getMaintanceOrder() {
    this.norecordFlag = false;
    this.pleasewaitflag = true;
    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      department_id: this.userlist.dept_id,
    };

    this.service.getRecentMaintanceList(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      // this.profileForm.reset();
      if (resultdata.httpcode == 200) {
        this.recentStore = resultdata.data;
        this.norecordFlag = false;
        this.pleasewaitflag = false;
      } else {
        this.norecordFlag = true;
        this.recentStore = [];
        this.pleasewaitflag = false;
      }
    });
  }

  btn_OrderRequest() {
    this.router.navigate(["/engineerorderreq-add"]);
  }

  btn_detailAction(value) {
    this.router.navigate([
      "/engineerorderreq-detail",
      { item: JSON.stringify(value) },
    ]);
  }

  async confirmReceived(value) {
    this.alertController
      .create({
        mode: "md",
        message: "Do you received all item(s) as you requested?",
        cssClass: "millstartstopalertmessagetwobuttons",
        backdropDismiss: false,
        buttons: [
          {
            text: "",
            cssClass: "cancelbutton",
            handler: () => {
              //console.log("Cancel");
            },
          },
          {
            text: "",
            handler: (data: any) => {
              this.btn_delete(value);
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  btn_delete(value) {
    for (let i = 0; i < this.recentStore.length; i++) {
      if (this.recentStore[i] == value) {
        this.recentStore.splice(i, 1);
        this.deleteSOR(JSON.parse(value.sor_id));
      }
    }
  }

  deleteSOR(sorid) {
    let req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      sor_id: sorid,
    };

    console.log(req);

    this.service.deleteSOR(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast("Items Received Successfully...");
      }
    });
  }
}
