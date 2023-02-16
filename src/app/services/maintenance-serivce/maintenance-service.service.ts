import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { appsettings } from "src/app/appsettings";
import { AIREIService } from "src/app/api/api.service";

@Injectable({
  providedIn: "root",
})
export class MaintenanceServiceService {
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

  getStationList(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.stationlist;
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

  getBreakdownCodingList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.breakdowncodinglist;
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

  getMaintenanceTypeList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.maintenancetypelist;
    console.log(api);
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

  getDamageList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.damagelist;
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

  getBreakDownCausesList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.breakdowncauseslist;
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

  getSequenceNumber(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.sequencenumber;
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

  saveMaintenanceNotification(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.savemaintenancenotification;
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

  saveFitterAcceptNotification(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.savefitteracceptnotification;
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

  getNotificationList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getmaintenancenotificationlist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getActivityList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.activitylist;
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

  getCarryOutByList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.carryoutbylist;
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

  getAssignedToList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.assignedtolist;
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

  getNotificationView(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getmaintenancenotificationview;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getNotificationQRcodeScanDetails(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getnotificationqrcodescandetails;
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

  getNotificationTimelineScanDetails(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.getnotificationtimeline;
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

  getNotificationListReport(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getmaintenancenotificationlistreport;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getPVRPVReport(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.pvrpveport;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getPerformanceDetails(params) {
    this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.getdb1performancedetails;
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

  getDB2MonthlyMillPerformanceDetails(params) {
    this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.getdb2performancedetails;
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

  getMaintenanceStatusList(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.maintenancestatuslist;
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

  getOilLossesList(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.oillosseslist;
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

  saveOilLosses(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.saveoillosses;
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

  deleteOilLosses(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.deleteoillosses;
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

  saveBalanceCrop(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.savebalancecrop;
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

  getPreventiveMaintenanceList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.getpreventivemaintenancelist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getFitterNotificationList(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.getfitternotificationlist;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          //this.commonservice.dimmissLoading();

          console.log(data);
          resolve(data);
        },
        (error) => {
          //this.commonservice.dimmissLoading();

          reject(error);
        }
      );
    });
  }

  getTaskList(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.tasklist;
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

  updateTaskListStatus(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.updatetaskliststatus;
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

  updateCheckListStatus(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.updatecheckliststatus;
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

  getSettings(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.getsettings;
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

  saveAssignedTo(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.saveassignedto;
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

  updateViewedStatus(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.updateviewedstatus;
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

  updateCorrectiveMaintenanceAuthorize(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.updatecorrectivemaintenanceauthorize;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  formanCorrectiveMaintenanceVerify(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") +
      appsettings.formancorrectivemaintenanceverify;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getNotificationHistoryDetails(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.getnotificationhistory;
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

  getReason(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.getreason;
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

  getPartList(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.partslist;
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

  getOilLossPressDetails(params) {
    //this.commonservice.presentLoading();

    var reqOpts: any;

    reqOpts = this.formParams(params);

    var api =
      localStorage.getItem("endpoint") + appsettings.oillosspressdetails;

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

  getVerificationFlag(params) {
    var reqOpts: any;
    reqOpts = this.formParams(params);

    var api = localStorage.getItem("endpoint") + appsettings.verificationflag;
    return new Promise((resolve, reject) => {
      this.httpClient.post(api, reqOpts).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
