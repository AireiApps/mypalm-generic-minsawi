import { Component, OnInit } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ModalController, NavParams, AlertController } from "@ionic/angular";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import * as moment from "moment";

@Component({
  selector: "app-maintenance-rewardpoints",
  templateUrl: "./maintenance-rewardpoints.page.html",
  styleUrls: ["./maintenance-rewardpoints.page.scss"],
})
export class MaintenanceRewardpointsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  rewardpoints = "";

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private commonservice: AIREIService,
    private service: MaintenanceServiceService
  ) {
    this.rewardpoints = navParams.get("rewards");

    console.log(this.rewardpoints);

    setTimeout(() => {
      this.close();
    }, 2000);
  }

  ngOnInit() {}

  close() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
