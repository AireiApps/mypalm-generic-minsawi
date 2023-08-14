import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";
import { AIREIService } from "src/app/api/api.service";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DriverServiceService {
  collectionName = "mmsairei";

  vechicleListRef: AngularFireList<any>;
  vechicleRef: AngularFireObject<any>;

  constructor(
    public httpClient: HttpClient,
    private commonservice: AIREIService
  ) {}

  formParams(params) {
    const postData = new FormData();
    if (params) {
      for (const k in params) {
        postData.append(k, params[k]);
      }
    }
    return postData;
  }

  getDriversRecentTrackingList(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api =
      localStorage.getItem("endpoint") + appsettings.driverrecenttrackinglist;
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

  getLocationHistoryPath(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api =
      localStorage.getItem("endpoint") + appsettings.driverlocationhistory;
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

  getDriversPending(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api = localStorage.getItem("endpoint") + appsettings.driverpendinglist;
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

  approveService(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api = localStorage.getItem("endpoint") + appsettings.driverupdatestatus;
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

  async ourserverLatLng(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api =
      localStorage.getItem("endpoint") + appsettings.driverlocationconti;
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

  createVechicleGEO(eachdata, latitude, longtitude) {
    let trans_id = "";
    let vechicle_no = "";

    if (eachdata.ffbTrans_Id) {
      trans_id = eachdata.ffbTrans_Id;
    }
    if (eachdata.ffb_trans_id) {
      trans_id = eachdata.ffb_trans_id;
    }

    if (eachdata.vehicle_name) {
      vechicle_no = eachdata.vehicle_name;
    }
    if (eachdata.vehicle_no) {
      vechicle_no = eachdata.vehicle_no;
    }

    if (trans_id != "") {
      const lat = latitude;
      const lng = longtitude;

      const docRef = firebase
        .firestore()
        .collection("ffb")
        .doc(String(trans_id))
        .collection("vechicle")
        .doc(String(vechicle_no))
        .set({ lat, lng });

      let req = {
        ffbtransactionid: trans_id,
        lat: lat,
        lang: lng,
      };
      this.ourserverLatLng(req);

      return docRef;
    }
  }

  getDriverDetailList(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api = localStorage.getItem("endpoint") + appsettings.driverdetaillist;
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

  getDriverVechicleList(params) {
    let reqOpts: any;
    reqOpts = this.formParams(params);

    let api = localStorage.getItem("endpoint") + appsettings.drivervehiclelist;
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

  getDriveLoadList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.driverloadlist;
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

  getSupplierList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.supplierlist;
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

  saveNewLoad(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.savenewload;
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

  getDriverHistoryReport(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.driverhistoryreport;
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
