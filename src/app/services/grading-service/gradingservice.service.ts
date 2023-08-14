import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";
import { AIREIService } from "src/app/api/api.service";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GradingserviceService {
  constructor(
    public httpClient: HttpClient,
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

  getVehicleList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.vehiclelist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);

          reject(error);
        }
      );
    });
  }

  getGradingList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.gradingvehiclelist;
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

  getGradingReport(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.gradingreport;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);

          reject(error);
        }
      );
    });
  }

  saveGrading(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.savegrading;
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

  saveGradingNew(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.savegradingnew;
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
  getGradingListNew(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.ffbtranslist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);

          reject(error);
        }
      );
    });
  }
  updateffb(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.ffbtransinsert;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);

          reject(error);
        }
      );
    });
  }
  getVehicleListNew(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.vehiclelistnew;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          console.log(error);

          reject(error);
        }
      );
    });
  }
  getGradingHistory(params) {
    this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.gradinginsertedlistwithdatefilter;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          this.commonservice.dimmissLoading();

          console.log(data);
          resolve(data);
        },
        (error) => {
          this.commonservice.dimmissLoading();

          console.log(error);

          reject(error);
        }
      );
    });
  }
}
