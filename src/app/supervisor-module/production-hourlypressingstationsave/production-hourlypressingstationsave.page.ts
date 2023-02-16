import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { ImageUploadService } from "src/app/services/imageupload-service/imageupload";

import {
  ModalController,
  NavParams,
  AlertController,
  IonContent,
  IonSlides,
} from "@ionic/angular";
import * as moment from "moment";
import { Router } from "@angular/router";

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-production-hourlypressingstationsave",
  templateUrl: "./production-hourlypressingstationsave.page.html",
  styleUrls: ["./production-hourlypressingstationsave.page.scss"],
})
export class ProductionHourlypressingstationsavePage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  pressstationForm;

  levelArr = [];
  temperatureArr = [];
  digestordrainoilflowArr = [];
  fiberflowArr = [];
  hydraulicpressureArr = [];
  pressureampsArr = [];
  digestorampsArr = [];

  machinename = "";
  presstitle = "";
  digestortitle = "";
  pressingstationid = "";
  digestorstationid = "";
  pressingstationstatus = "";

  observationtime = new Date().toISOString();

  isDisabled = false;
  viewFlag = false;
  levelimagesettingsflag = 0;
  drainageimagesettingsflag = 0;
  temperatureimagesettingsflag = 0;

  levelimageuiflag = false;
  drainageimageuiflag = false;
  temperatureimageuiflag = false;

  levelimageviewFlag = false;
  drainageimageviewFlag = false;
  temperatureimageviewFlag = false;

  imagetype = "";

  /*Variable to for to View entered Data*/
  view_observationtime = "";
  view_temperature = "";
  view_digestormotoramps = "";
  view_level = "";
  view_digestordrainoilflow = "";
  view_pressmotoramps = "";
  view_fiberflow = "";
  view_hydraulicpressure = "";
  view_dilutiontemperature = "";

  imagePaths = {
    levelimage_path: "",
    drainageimage_path: "",
    temperatureimage_path: "",
  };

  levelimagesArr = [];
  drainageimagesArr = [];
  temperatureimagesArr = [];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    private alertController: AlertController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private supervisorservice: SupervisorService,
    private imgUpload: ImageUploadService,
    private router: Router
  ) {
    let params = navParams.get("item");

    this.machinename = params.machine_name;
    this.presstitle = params.presstitle;
    this.digestortitle = params.digestortitle;
    this.pressingstationid = params.machine_id;
    this.digestorstationid = params.digestor_machine_id;
    this.pressingstationstatus = params.status;

    this.pressstationForm = this.fb.group({
      txt_observationtime: new FormControl(this.observationtime),
      select_level: new FormControl("", Validators.required),
      select_temperature: new FormControl("", Validators.required),
      select_digestordrainoilflow: new FormControl("", Validators.required),
      select_fiberflow: new FormControl("", Validators.required),
      select_hydraulicpressure: new FormControl("", Validators.required),
      select_pressmotoramps: new FormControl("", Validators.required),
      select_digestormotoramps: new FormControl("", Validators.required),
      //txt_dilutiontemperature: new FormControl("", Validators.required),
      txt_levelimageupload: new FormControl(""),
      txt_drainageimageupload: new FormControl(""),
      txt_temperatureimageupload: new FormControl(""),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getImageSettingsFlag();
  }

  getImageSettingsFlag() {
    //this.imageuiflag = true;
    const req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getSettings(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.levelimagesettingsflag = resultdata.data[0].levelimagesettingsflag;
        this.drainageimagesettingsflag =
          resultdata.data[0].drainageimagesettingsflag;
        this.temperatureimagesettingsflag =
          resultdata.data[0].temperatureimagesettingsflag;

        /*this.levelimagesettingsflag = 1;
        this.drainageimagesettingsflag = 1;
        this.temperatureimagesettingsflag = 1;*/

        if (this.levelimagesettingsflag == 1) {
          this.levelimageuiflag = true;
        } else {
          this.levelimageuiflag = false;
        }

        if (this.drainageimagesettingsflag == 1) {
          this.drainageimageuiflag = true;
        } else {
          this.drainageimageuiflag = false;
        }

        if (this.temperatureimagesettingsflag == 1) {
          this.temperatureimageuiflag = true;
        } else {
          this.temperatureimageuiflag = false;
        }

        this.getPercentageValue();
      } else {
        this.levelimagesettingsflag = 0;
        this.drainageimagesettingsflag = 0;
        this.temperatureimagesettingsflag = 0;
        this.getPercentageValue();
      }
    });
  }

  slideOpts = {
    centeredSlides: true,
    autoplay: {
      disableOnInteraction: true,
    },
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  imageUpload(type) {
    this.imgUpload.ImageUploadCommon(type).then(
      (result) => {
        var resultdata: any;
        resultdata = result;

        resultdata = JSON.parse(resultdata.response);

        if (resultdata.httpcode == 200) {
          if (type == "Level") {
            this.imagePaths.levelimage_path = resultdata.data.uploaded_path;

            this.levelimagesArr.push(this.imagePaths.levelimage_path);

            if (this.levelimagesArr.length == 1) {
              this.pressstationForm.controls.txt_levelimageupload.setValue(
                this.translate.instant("HOURLYPRESSSTATIONSAVE.uploded") +
                  this.levelimagesArr.length +
                  this.translate.instant("HOURLYPRESSSTATIONSAVE.image1")
              );
            } else if (this.levelimagesArr.length > 1) {
              this.pressstationForm.controls.txt_levelimageupload.setValue(
                this.translate.instant("HOURLYPRESSSTATIONSAVE.uploded") +
                  this.levelimagesArr.length +
                  this.translate.instant("HOURLYPRESSSTATIONSAVE.image2")
              );
            } else {
              this.pressstationForm.controls.txt_levelimageupload.setValue("");
            }
          }

          if (type == "Drainage") {
            this.imagePaths.drainageimage_path = resultdata.data.uploaded_path;

            this.drainageimagesArr.push(this.imagePaths.drainageimage_path);

            if (this.drainageimagesArr.length == 1) {
              this.pressstationForm.controls.txt_drainageimageupload.setValue(
                this.translate.instant("HOURLYPRESSSTATIONSAVE.uploded") +
                  this.drainageimagesArr.length +
                  this.translate.instant("HOURLYPRESSSTATIONSAVE.image1")
              );
            } else if (this.drainageimagesArr.length > 1) {
              this.pressstationForm.controls.txt_drainageimageupload.setValue(
                this.translate.instant("HOURLYPRESSSTATIONSAVE.uploded") +
                  this.drainageimagesArr.length +
                  this.translate.instant("HOURLYPRESSSTATIONSAVE.image2")
              );
            } else {
              this.pressstationForm.controls.txt_drainageimageupload.setValue(
                ""
              );
            }
          }

          if (type == "Temperature") {
            this.imagePaths.temperatureimage_path =
              resultdata.data.uploaded_path;

            this.temperatureimagesArr.push(
              this.imagePaths.temperatureimage_path
            );

            if (this.temperatureimagesArr.length == 1) {
              this.pressstationForm.controls.txt_temperatureimageupload.setValue(
                this.translate.instant("HOURLYPRESSSTATIONSAVE.uploded") +
                  this.temperatureimagesArr.length +
                  this.translate.instant("HOURLYPRESSSTATIONSAVE.image1")
              );
            } else if (this.temperatureimagesArr.length > 1) {
              this.pressstationForm.controls.txt_temperatureimageupload.setValue(
                this.translate.instant("HOURLYPRESSSTATIONSAVE.uploded") +
                  this.temperatureimagesArr.length +
                  this.translate.instant("HOURLYPRESSSTATIONSAVE.image2")
              );
            } else {
              this.pressstationForm.controls.txt_temperatureimageupload.setValue(
                ""
              );
            }
          }

          //this.commonservice.presentToast(type + " Image Added Successfully!");
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imageaddedfailed")
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPercentageValue() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getPercentageValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.levelArr = resultdata.data;

        this.getTemperature();
      } else {
        this.levelArr = [];

        this.getTemperature();
      }
    });
  }

  getTemperature() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getTemperature(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.temperatureArr = resultdata.data;

        this.getDigestorDrainPipe();
      } else {
        this.temperatureArr = [];

        this.getDigestorDrainPipe();
      }
    });
  }

  getDigestorDrainPipe() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getDigestorDrainPipeValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.digestordrainoilflowArr = resultdata.data;

        this.getFiberFlow();
      } else {
        this.digestordrainoilflowArr = [];

        this.getFiberFlow();
      }
    });
  }

  getFiberFlow() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getFiberFlowValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.fiberflowArr = resultdata.data;

        this.getHydraulicPressure();
      } else {
        this.fiberflowArr = [];

        this.getHydraulicPressure();
      }
    });
  }

  getHydraulicPressure() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getHydraulicPressureValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.hydraulicpressureArr = resultdata.data;

        this.getPressureAmps();
      } else {
        this.hydraulicpressureArr = [];

        this.getPressureAmps();
      }
    });
  }

  getPressureAmps() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getPressureAmpsValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.pressureampsArr = resultdata.data;
        //this.digestorampsArr = resultdata.data;
        this.getDigestorPressureAmps();
      } else {
        this.pressureampsArr = [];

        this.getDigestorPressureAmps();
      }
    });
  }

  getDigestorPressureAmps() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getDigestorPressureAmpsValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.digestorampsArr = resultdata.data;
      }
    });
  }

  confirm() {
    if (this.pressstationForm.valid) {
      this.view_observationtime = moment(
        this.pressstationForm.value.txt_observationtime
      ).format("HH:mm");
      this.view_temperature = JSON.parse(
        this.pressstationForm.value.select_temperature
      ).temperature;
      this.view_digestormotoramps = JSON.parse(
        this.pressstationForm.value.select_digestormotoramps
      ).digestoramps;
      this.view_level = JSON.parse(
        this.pressstationForm.value.select_level
      ).percentage;
      this.view_digestordrainoilflow = JSON.parse(
        this.pressstationForm.value.select_digestordrainoilflow
      ).digestordrainpipevalue;
      this.view_pressmotoramps = JSON.parse(
        this.pressstationForm.value.select_pressmotoramps
      ).pressureamps;
      this.view_fiberflow = JSON.parse(
        this.pressstationForm.value.select_fiberflow
      ).level;
      this.view_hydraulicpressure = JSON.parse(
        this.pressstationForm.value.select_hydraulicpressure
      ).pressure;

      //this.view_dilutiontemperature = this.pressstationForm.value.txt_dilutiontemperature;

      this.pageTop.scrollToTop();

      this.viewFlag = true;
    } else {
      this.pageTop.scrollToTop();

      this.viewFlag = false;

      this.commonservice.presentToast(
        this.translate.instant("HOURLYPRESSSTATIONSAVE.pleasefilltheform")
      );
    }
  }

  cancelconfirm() {
    this.pageTop.scrollToTop();

    this.viewFlag = false;

    this.isDisabled = false;
  }

  btn_view(type) {
    this.imagetype = type;

    if (this.imagetype == "Level") {
      if (this.levelimagesArr.length > 0) {
        this.levelimageviewFlag = true;
      } else {
        if (this.levelimagesArr.length > 1) {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imagesnotfound")
          );
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imagenotfound")
          );
        }
      }
    }

    if (this.imagetype == "Drainage") {
      if (this.drainageimagesArr.length > 0) {
        this.drainageimageviewFlag = true;
      } else {
        if (this.drainageimagesArr.length > 1) {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imagesnotfound")
          );
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imagenotfound")
          );
        }
      }
    }

    if (this.imagetype == "Temperature") {
      if (this.temperatureimagesArr.length > 0) {
        this.temperatureimageviewFlag = true;
      } else {
        if (this.temperatureimagesArr.length > 1) {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imagesnotfound")
          );
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant("HOURLYPRESSSTATIONSAVE.imagenotfound")
          );
        }
      }
    }
  }

  imageviewcancel() {
    if (this.imagetype == "Level") {
      this.levelimageviewFlag = false;
    }

    if (this.imagetype == "Drainage") {
      this.drainageimageviewFlag = false;
    }

    if (this.imagetype == "Temperature") {
      this.temperatureimageviewFlag = false;
    }
  }

  async showalert() {
    if (this.pressstationForm.valid) {
      const alert = await this.alertController.create({
        header: this.translate.instant("HOURLYPRESSSTATIONSAVE.alertheader"),
        cssClass: "alertmessage",
        message: this.translate.instant("HOURLYPRESSSTATIONSAVE.alertmessage"),
        buttons: [
          {
            text: this.translate.instant("GENERALBUTTON.cancelbutton"),
            role: "cancel",
            cssClass: "secondary",
            handler: (cancel) => {},
          },
          {
            text: this.translate.instant("GENERALBUTTON.savebutton"),
            handler: () => {
              this.save();
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.translate.instant("HOURLYPRESSSTATIONSAVE.pleasefilltheform");
    }
  }

  save() {
    if (this.pressstationForm.valid) {
      this.isDisabled = true;

      var getcurrentdate = moment(new Date().toISOString()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      var observation_time = moment(
        this.pressstationForm.value.txt_observationtime
      ).format("HH:mm");

      var req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        dept_id: this.userlist.dept_id,
        machineId: this.pressingstationid,
        digestor_machine_id: this.digestorstationid,
        status: this.pressingstationstatus,
        observationtime: observation_time,
        level: JSON.parse(this.pressstationForm.value.select_level).id,
        temperature: JSON.parse(this.pressstationForm.value.select_temperature)
          .id,
        diegestorDrainOilLow: JSON.parse(
          this.pressstationForm.value.select_digestordrainoilflow
        ).id,
        fiberFlow: JSON.parse(this.pressstationForm.value.select_fiberflow).id,
        hydralicPressure: JSON.parse(
          this.pressstationForm.value.select_hydraulicpressure
        ).id,
        pressMotorAmp: JSON.parse(
          this.pressstationForm.value.select_pressmotoramps
        ).id,
        digestorMotorAmp: JSON.parse(
          this.pressstationForm.value.select_digestormotoramps
        ).id,
        //dilutionTemperature: this.pressstationForm.value.txt_dilutiontemperature,
        dilutionTemperature: "",
        running_user_id: localStorage.getItem("runninghourid"),
        date: getcurrentdate,
        levelimages: this.levelimagesArr.join("~"),
        drainageimages: this.drainageimagesArr.join("~"),
        temperatureimages: this.temperatureimagesArr.join("~"),
        language: this.languageService.selected,
      };

      //console.log(req);

      this.supervisorservice.saveHourlyPressingStation(req).then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          this.commonservice.presentToast(
            this.translate.instant("HOURLYPRESSSTATIONSAVE.savedsuccess")
          );

          this.isDisabled = false;

          this.modalController.dismiss({
            dismissed: true,
            level: this.pressstationForm.value.select_level,
            temperature: this.pressstationForm.value.select_temperature,
            digestordrainoilflow:
              this.pressstationForm.value.select_digestordrainoilflow,
            pressoilflow: this.pressstationForm.value.select_fiberflow,
            hydraulicpressure:
              this.pressstationForm.value.select_hydraulicpressure,
            pressmotoramps: this.pressstationForm.value.select_pressmotoramps,
            digestormotoramps:
              this.pressstationForm.value.select_digestormotoramps,
            //dilutiontemperature: this.pressstationForm.value.txt_dilutiontemperature,
            recordstatus: "1",
          });
        } else {
          this.isDisabled = false;

          this.commonservice.presentToast(
            this.translate.instant("HOURLYPRESSSTATIONSAVE.savedfail")
          );
        }
      });
    } else {
      this.commonservice.presentToast(
        this.translate.instant("HOURLYPRESSSTATIONSAVE.pleasefilltheform")
      );
    }
  }

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
      item: [],
    });
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
