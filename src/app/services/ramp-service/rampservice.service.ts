import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { HttpClient, HttpParams } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";
import { AIREIService } from "src/app/api/api.service";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RampserviceService {
  constructor(
    public httpClient: HttpClient,
    private toastCtrl: ToastController,
    private commonservice: AIREIService
  ) {}

  formParams(params) {
    let postData = new FormData();
    if (params) {
      for (let k in params) {
        postData.append(k, params[k]);
      }
    }
    return postData;
  }

  getDestinationList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.destinationlist;
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(api, reqOpts)
        .pipe(timeout(15000))
        .subscribe(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (error) => {
            console.log(error);
            if (error.name == "TimeoutError" || error.status == 500) {
              this.commonservice.presentToast("Something went wrong...!");
            }
            reject(error);
          }
        );
    });
  }

  saveRamp(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.saverampdata;
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(api, reqOpts)
        .pipe(timeout(15000))
        .subscribe(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (error) => {
            if (error.name == "TimeoutError" || error.status == 500) {
              this.commonservice.presentToast("Something went wrong...!");
            }
            reject(error);
          }
        );
    });
  }

  updateRamp(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.updaterampdata;
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(api, reqOpts)
        .pipe(timeout(15000))
        .subscribe(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (error) => {
            if (error.name == "TimeoutError" || error.status == 500) {
              this.commonservice.presentToast("Something went wrong...!");
            }
            reject(error);
          }
        );
    });
  }

  getRampReport(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.getffbrampreport;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          if (error.name == "TimeoutError" || error.status == 500) {
            this.commonservice.presentToast("Something went wrong...!");
          }

          reject(error);
        }
      );
    });
  }
}
