import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";

@Injectable({
  providedIn: "root",
})
export class MoreServiceService {
  constructor(public httpClient: HttpClient) {}

  formParams(params) {
    let postData = new FormData();
    if (params) {
      for (let k in params) {
        postData.append(k, params[k]);
      }
    }
    return postData;
  }

  saveForgotPassword(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.change_password;
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
