import { Injectable } from "@angular/core";
import { ToastController, Platform } from "@ionic/angular";
import { ImageUploadService } from "../imageupload-service/imageupload";
import { Camera } from "@ionic-native/camera/ngx";
import { appsettings } from "src/app/appsettings";
import { HttpClient } from "@angular/common/http";
import { OpenNativeSettings } from "@ionic-native/open-native-settings/ngx";
import { AIREIService } from "../../api/api.service";
import { UniqueDeviceID } from "@ionic-native/unique-device-id/ngx";

@Injectable({
  providedIn: "root",
})
export class HttpserviceService {
  recordsFound: any;
  recordsFoundText: string;
  userlist = JSON.parse(localStorage.getItem("userlist"));
  name = 1;

  constructor(
    private toastCtrl: ToastController,
    public appService: AIREIService,
    private uniqueDeviceID: UniqueDeviceID,
    private openNativeSettings: OpenNativeSettings,
    public httpClient: HttpClient,
    private platform: Platform
  ) {}

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  formParams(params) {
    let postData = new FormData();
    if (params) {
      for (let k in params) {
        postData.append(k, params[k]);
      }
    }
    return postData;
  }

  async bgAPICall() {
    this.uniqueDeviceID
      .get()
      .then((uuid: any) => {
        console.log("uuid" + uuid);
        let reqparam = {
          from_id: uuid,
          user_name: this.userlist.Username,
          call_log_json: JSON.stringify(this.recordsFound),
        };

        var reqOpts: any;
        reqOpts = this.formParams(reqparam);

        var api =
          localStorage.getItem("endpoint") + appsettings.log_file_upload;
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
      })
      .catch((error: any) => console.log(error));
  }

  getContactLogin() {
    this.name = this.userlist.department;
    //console.log(this.name);

    if (this.name) {
      this.appService.presentLoading();
      //   this.getPermissonContacts();
    }
  }
}
