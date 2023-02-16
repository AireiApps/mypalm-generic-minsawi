import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";
import { AIREIService } from "src/app/api/api.service";

@Injectable({
  providedIn: "root",
})
export class DashboardserviceService {
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

  getPredictionAnalysis(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getproductionpredictionanalysis;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          //this.commonservice.dimmissLoading();
          console.log(data);
          resolve(data);
        },
        (error) => {
          //this.commonservice.dimmissLoading();
          console.log(error);

          reject(error);
        }
      );
    });
  }

  getPredictionAnalysisAtMarker(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getproductionpredictionanalysisatmarker;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          //this.commonservice.dimmissLoading();
          console.log(data);
          resolve(data);
        },
        (error) => {
          //this.commonservice.dimmissLoading();
          console.log(error);

          reject(error);
        }
      );
    });
  }

  getPredictionAnalysisChart(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getproductionpredictionanalysischart;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          //this.commonservice.dimmissLoading();
          console.log(data);
          resolve(data);
        },
        (error) => {
          //this.commonservice.dimmissLoading();
          console.log(error);

          reject(error);
        }
      );
    });
  }
}
