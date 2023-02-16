import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class PreloadingserviceService {
  isLoading = false;

  constructor(
    private translate: TranslateService,
    public loadingController: LoadingController
  ) {}

  /*async present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        //message: this.translate.instant("NORECORDSFOUND.loading"),
        spinner: null,
        cssClass: "custom-loader",
        // duration: 5000,
      })
      .then((a) => {
        a.present().then(() => {
          console.log("presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort presenting"));
          }
        });
      });
  }*/

  async present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: this.translate.instant("NORECORDSFOUND.loading"),
        spinner: "circles",
        cssClass: "my-loading-class",
        // duration: 5000,
      })
      .then((a) => {
        a.present().then(() => {
          console.log("presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort presenting"));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("dismissed"));
  }
}
