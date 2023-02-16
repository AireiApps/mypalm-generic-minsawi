import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ModalController,
  NavParams,
  AlertController,
  IonContent,
} from "@ionic/angular";
import * as moment from "moment";

@Component({
  selector: "app-production-hourlpressingstation-alert",
  templateUrl: "./production-hourlpressingstation-alert.page.html",
  styleUrls: ["./production-hourlpressingstation-alert.page.scss"],
})
export class ProductionHourlpressingstationAlertPage implements OnInit {
  pressstationArr = [];

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    public navParams: NavParams
  ) {
    this.pressstationArr = navParams.get("item");
  }

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
