import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from 'src/app/appsettings';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  constructor(public httpClient: HttpClient) { }

  formParams(params) {
    let postData = new FormData();
    if (params) {
      for (let k in params) {
        postData.append(k, params[k]);
      }
    }
    return postData
  }

  getStationList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.stationlist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }

  getLocation(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.locationlist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }

  getItems(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.part_list;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }
  getIssuedtoList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.get_issuedto;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }
  getRecentStoreList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.sorlist_new;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }

  getRecentMaintanceList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    //var api = appsettings.sorinsertedlist;
    var api = localStorage.getItem("endpoint") + appsettings.sorlist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }
  getRecentStoreListDetails(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.sorlist_detail;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)
          reject(error);
        }
      );
    });
  }
  saveSOR(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.sor_insert;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }
  getChecklistItems(params) {
    var newurl =
      localStorage.getItem("endpoint") +
      appsettings.get_checklist +
      "?" +
      "stationid=" +
      params.stationid +
      "&" +
      "locationid=" +
      params.locationid +
      "&" +
      "partsid=" +
      params.partsid +
      "&" +
      "language=" +
      params.language;

    //console.log(newurl);

    return new Promise((resolve, reject) => {
      this.httpClient.get(newurl).subscribe(
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

  getPartsQrcode(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)
    console.log("Parameters:",reqOpts)
    var api = localStorage.getItem("endpoint") + appsettings.get_items_qrcode;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }
  savestoreissue(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params)

    var api = localStorage.getItem("endpoint") + appsettings.save_store_insert;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        data => {
          console.log(data)
          resolve(data);
        },
        error => {
          console.log(error)

          reject(error);
        }
      );
    });
  }
  }
