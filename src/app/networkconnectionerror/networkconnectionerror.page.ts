import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-networkconnectionerror",
  templateUrl: "./networkconnectionerror.page.html",
  styleUrls: ["./networkconnectionerror.page.scss"],
})
export class NetworkconnectionerrorPage implements OnInit {
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  retryButton() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
