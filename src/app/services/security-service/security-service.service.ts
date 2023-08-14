import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";
import { AIREIService } from "src/app/api/api.service";

@Injectable({
  providedIn: "root",
})
export class SecurityServiceService {
  constructor(public httpClient: HttpClient, private commonservice: AIREIService) {}

  formParams(params) {
    let postData = new FormData();
    if (params) {
      for (let k in params) {
        postData.append(k, params[k]);
      }
    }
    return postData;
  }

  getSecurityHistory(params, type) {
    var reqOpts: any;
    reqOpts = this.formParams(params);
    var api;
    if (type == "pk") {
      api = localStorage.getItem("endpoint") + appsettings.pkdeliverylistwithdatefilter;
    }
    if (type == "cpo") {
      api = localStorage.getItem("endpoint") + appsettings.cpodeliverylistwithdatefilter;
    }
    if (type == "ffb") {
      api = localStorage.getItem("endpoint") + appsettings.ffbdeliverylistwithdatefilter_security;
    }
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
}
