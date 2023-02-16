import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ModalController,
  NavParams,
  AlertController,
  IonContent,
} from "@ionic/angular";
import * as moment from "moment";

@Component({
  selector: "app-production-hourlysterilizerstation-alert",
  templateUrl: "./production-hourlysterilizerstation-alert.page.html",
  styleUrls: ["./production-hourlysterilizerstation-alert.page.scss"],
})
export class ProductionHourlysterilizerstationAlertPage implements OnInit {
  sterilizerstationArr = [];

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    public navParams: NavParams
  ) {
    this.sterilizerstationArr = navParams.get("item");
  }

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
