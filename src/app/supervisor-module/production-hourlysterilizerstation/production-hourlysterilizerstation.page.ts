import { Component, ViewChild, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import {
  ModalController,
  AlertController,
  IonContent,
  IonSlides,
} from "@ionic/angular";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { ImageUploadService } from "src/app/services/imageupload-service/imageupload";
import * as moment from "moment";

import { ProductionHourlysterilizerstationAlertPage } from "src/app/supervisor-module/production-hourlysterilizerstation-alert/production-hourlysterilizerstation-alert.page";

// Custom Date Picker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
import { Plugins } from "@capacitor/core";

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-production-hourlysterilizerstation",
  templateUrl: "./production-hourlysterilizerstation.page.html",
  styleUrls: ["./production-hourlysterilizerstation.page.scss"],
})
export class ProductionHourlysterilizerstationPage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;
  @ViewChild("backpressurereceiver") backpressureInput;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  sterilizerstationForm;

  sterilizerArr = [];
  fruittypeArr = [];
  sterilizerstationalertArr = [];

  cycleno = "";

  p1peakthreshold_min = "";
  p1peakthreshold_max = "";
  p2peakthreshold_min = "";
  p2peakthreshold_max = "";
  p3peakthreshold_min = "";
  p3peakthreshold_max = "";

  p1peakalerttitle = "";
  p1peakalertmessage = "";

  p2peakalerttitle = "";
  p2peakalertmessage = "";

  p3peakalerttitle = "";
  p3peakalertmessage = "";

  cookingtimethreshold = "";

  cookingtimealerttitle = "";
  cookingtimealertmessage = "";

  backpressurethreshold_min = "";
  backpressurethreshold_max = "";

  backpressurealerttitle = "";
  backpressurealertmessage = "";

  validationflag = 0;
  p1validationflag = 0;
  p2validationflag = 0;
  p3validationflag = 0;
  cookingtimevalidationflag = 0;
  backpressurevalidationflag = 0;

  //backpressurealertok = 0;
  //p1peakalertok = 0;
  //p2peakalertok = 0;
  //p3peakalertok = 0;

  uienableflag = false;
  norecordsflag = false;

  currendatetime = new Date().toISOString();
  cookingstartdate = new Date().toISOString();
  cooingstopdate = new Date().toISOString();

  isDisabled = false;
  viewFlag = false;
  fruittypeimagesettingsflag = 0;
  p1imagesettingsflag = 0;
  p3imagesettingsflag = 0;

  fruittypeimageuiflag = false;
  p1imageuiflag = false;
  p3imageuiflag = false;

  fruittypeimageviewFlag = false;
  p1imageviewFlag = false;
  p3imageviewFlag = false;

  imagetype = "";

  /*Variable to for to View entered Data*/
  view_cycleno = "";
  view_doorshuttime = "";
  view_dooropentime = "";
  view_initialsteamadmissiontime = "";
  view_finalblowdowntime = "";
  view_cookingstarttime = "";
  view_cookingstoptime = "";
  view_sterilizername = "";
  view_fruittype = "";
  view_backpressurereceiver = "";
  view_p1peak = "";
  view_p2peak = "";
  view_p3peak = "";
  sterilizerstationalertflag = 0;

  imagePaths = {
    fruittypeimage_path: "",
    p1image_path: "",
    p3image_path: "",
  };

  fruittypeimagesArr = [];
  p1imagesArr = [];
  p3imagesArr = [];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private router: Router,
    private commonservice: AIREIService,
    private supervisorservice: SupervisorService,
    private imgUpload: ImageUploadService,
    private location: Location
  ) {
    this.sterilizerstationForm = this.fb.group({
      txt_cyclenumber: new FormControl("", Validators.required),
      txt_doorshuttime: new FormControl("", Validators.required),
      txt_dooropentime: new FormControl("", Validators.required),
      select_sterilizer: new FormControl("", Validators.required),
      select_fruittype: new FormControl("", Validators.required),
      txt_backpressurereceiver: new FormControl("", Validators.required),
      txt_p1: new FormControl("", Validators.required),
      txt_p2: new FormControl("", Validators.required),
      txt_p3: new FormControl("", Validators.required),
      txt_fruittypeimageupload: new FormControl(""),
      txt_p1imageupload: new FormControl(""),
      txt_p3imageupload: new FormControl(""),
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getSterilizerStationAlertFlag();
    //this.getCycleNo();
  }

  ionViewDidEnter() {
    //this.getCycleNo();
  }

  openDateTimePicker(type) {
    DatePicker.present({
      mode: "dateAndTime",
      format: "dd-MM-yyyy HH:mm",
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          if (type == "DST") {
            this.view_doorshuttime = val.value;
            this.sterilizerstationForm.controls.txt_doorshuttime.setValue(
              this.view_doorshuttime
            );
          }

          if (type == "DOT") {
            this.view_dooropentime = val.value;
            this.sterilizerstationForm.controls.txt_dooropentime.setValue(
              this.view_dooropentime
            );
          }

          if (type == "ISAT") {
            this.view_initialsteamadmissiontime = val.value;
            this.sterilizerstationForm.controls.txt_initialsteamadmissiontime.setValue(
              this.view_initialsteamadmissiontime
            );
          }

          if (type == "FBDT") {
            this.view_finalblowdowntime = val.value;
            this.sterilizerstationForm.controls.txt_finalblowdowntime.setValue(
              this.view_finalblowdowntime
            );
          }

          if (type == "CSRT") {
            this.view_cookingstarttime = val.value;
            this.sterilizerstationForm.controls.txt_cookingstarttime.setValue(
              this.view_cookingstarttime
            );
          }

          if (type == "CSPT") {
            this.view_cookingstoptime = val.value;
            this.sterilizerstationForm.controls.txt_cookingstoptime.setValue(
              this.view_cookingstoptime
            );
          }
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
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
          if (type == "FruitType") {
            this.imagePaths.fruittypeimage_path = resultdata.data.uploaded_path;

            this.fruittypeimagesArr.push(this.imagePaths.fruittypeimage_path);

            if (this.fruittypeimagesArr.length == 1) {
              this.sterilizerstationForm.controls.txt_fruittypeimageupload.setValue(
                this.translate.instant(
                  "HOURLYSTERILIZATIONSTATIONSAVE.uploded"
                ) +
                  this.fruittypeimagesArr.length +
                  this.translate.instant(
                    "HOURLYSTERILIZATIONSTATIONSAVE.image1"
                  )
              );
            } else if (this.fruittypeimagesArr.length > 1) {
              this.sterilizerstationForm.controls.txt_fruittypeimageupload.setValue(
                this.translate.instant(
                  "HOURLYSTERILIZATIONSTATIONSAVE.uploded"
                ) +
                  this.fruittypeimagesArr.length +
                  this.translate.instant(
                    "HOURLYSTERILIZATIONSTATIONSAVE.image2"
                  )
              );
            } else {
              this.sterilizerstationForm.controls.txt_fruittypeimageupload.setValue(
                ""
              );
            }
          }

          if (type == "P1") {
            this.imagePaths.p1image_path = resultdata.data.uploaded_path;

            this.p1imagesArr.push(this.imagePaths.p1image_path);

            if (this.p1imagesArr.length == 1) {
              this.sterilizerstationForm.controls.txt_p1imageupload.setValue(
                this.translate.instant(
                  "HOURLYSTERILIZATIONSTATIONSAVE.uploded"
                ) +
                  this.p1imagesArr.length +
                  this.translate.instant(
                    "HOURLYSTERILIZATIONSTATIONSAVE.image1"
                  )
              );
            } else if (this.p1imagesArr.length > 1) {
              this.sterilizerstationForm.controls.txt_p1imageupload.setValue(
                this.translate.instant(
                  "HOURLYSTERILIZATIONSTATIONSAVE.uploded"
                ) +
                  this.p1imagesArr.length +
                  this.translate.instant(
                    "HOURLYSTERILIZATIONSTATIONSAVE.image2"
                  )
              );
            } else {
              this.sterilizerstationForm.controls.txt_p1imageupload.setValue(
                ""
              );
            }
          }

          if (type == "P3") {
            this.imagePaths.p3image_path = resultdata.data.uploaded_path;

            this.p3imagesArr.push(this.imagePaths.p3image_path);

            if (this.p3imagesArr.length == 1) {
              this.sterilizerstationForm.controls.txt_p3imageupload.setValue(
                this.translate.instant(
                  "HOURLYSTERILIZATIONSTATIONSAVE.uploded"
                ) +
                  this.p3imagesArr.length +
                  this.translate.instant(
                    "HOURLYSTERILIZATIONSTATIONSAVE.image1"
                  )
              );
            } else if (this.p3imagesArr.length > 1) {
              this.sterilizerstationForm.controls.txt_p3imageupload.setValue(
                this.translate.instant(
                  "HOURLYSTERILIZATIONSTATIONSAVE.uploded"
                ) +
                  this.p3imagesArr.length +
                  this.translate.instant(
                    "HOURLYSTERILIZATIONSTATIONSAVE.image2"
                  )
              );
            } else {
              this.sterilizerstationForm.controls.txt_p3imageupload.setValue(
                ""
              );
            }
          }

          //this.commonservice.presentToast(type + " Image Added Successfully!");
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imageaddedfailed"
              )
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSterilizerStationAlertFlag() {
    const req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getPressSterilizerAlertFlag(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.sterilizerstationalertflag =
          resultdata.data[0].pressstationalertenableflag;

        if (this.sterilizerstationalertflag == 1) {
          this.getSterilizerStationAlertData();
        } else {
          this.getCycleNo();
        }
      } else {
        this.sterilizerstationalertflag = 0;
        this.getCycleNo();
      }
    });
  }

  getSterilizerStationAlertData() {
    const req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getSterilizerStationAlertData(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.sterilizerstationalertArr = resultdata.data;
        this.sterilizerstationalert();
      } else {
        this.sterilizerstationalertArr = [];
        this.getCycleNo();
      }
    });
  }

  getCycleNo() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getCycleNoValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.cycleno = resultdata.data[0].cycleno;

        this.p1peakthreshold_min = resultdata.data[0].p1peakthreshold_min;
        this.p1peakthreshold_max = resultdata.data[0].p1peakthreshold_max;

        this.p2peakthreshold_min = resultdata.data[0].p2peakthreshold_min;
        this.p2peakthreshold_max = resultdata.data[0].p2peakthreshold_max;

        this.p3peakthreshold_min = resultdata.data[0].p3peakthreshold_min;
        this.p3peakthreshold_max = resultdata.data[0].p3peakthreshold_max;

        this.p1peakalerttitle = resultdata.data[0].p1peakalerttitle;
        this.p1peakalertmessage = resultdata.data[0].p1peakalertmessage;

        this.p2peakalerttitle = resultdata.data[0].p2peakalerttitle;
        this.p2peakalertmessage = resultdata.data[0].p2peakalertmessage;

        this.p3peakalerttitle = resultdata.data[0].p3peakalerttitle;
        this.p3peakalertmessage = resultdata.data[0].p3peakalertmessage;

        this.cookingtimethreshold = resultdata.data[0].cookingtimethreshold;
        this.cookingtimealerttitle = resultdata.data[0].cookingtimealerttitle;
        this.cookingtimealertmessage =
          resultdata.data[0].cookingtimealertmessage;

        this.backpressurethreshold_min =
          resultdata.data[0].backpressurethreshold_min;
        this.backpressurethreshold_max =
          resultdata.data[0].backpressurethreshold_max;

        this.backpressurealerttitle = resultdata.data[0].backpressurealerttitle;
        this.backpressurealertmessage =
          resultdata.data[0].backpressurealertmessage;

        this.validationflag = resultdata.data[0].validationflag;

        this.sterilizerstationForm.controls.txt_cyclenumber.setValue(
          this.cycleno
        );

        this.getSterilizers();
      } else {
        this.cycleno = "";

        this.p1peakthreshold_min = "0";
        this.p1peakthreshold_max = "50";

        this.p2peakthreshold_min = "0";
        this.p2peakthreshold_max = "50";

        this.p3peakthreshold_min = "0";
        this.p3peakthreshold_max = "50";

        this.p1peakalerttitle = "Alert";
        this.p1peakalertmessage = "Something went wrong...";

        this.p2peakalerttitle = "Alert";
        this.p2peakalertmessage = "Something went wrong...";

        this.p3peakalerttitle = "Alert";
        this.p3peakalertmessage = "Something went wrong...";

        this.cookingtimethreshold = "0";
        this.cookingtimealerttitle = "Alert";
        this.cookingtimealertmessage = "Something went wrong...";

        this.backpressurethreshold_min = "0";
        this.backpressurethreshold_max = "50";

        this.backpressurealerttitle = "Alert";
        this.backpressurealertmessage = "Something went wrong...";

        this.validationflag = 0;

        this.sterilizerstationForm.controls.txt_cyclenumber.setValue(
          this.cycleno
        );

        this.getSterilizers();
      }
    });
  }

  getSterilizers() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getSterilizersValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.sterilizerArr = resultdata.data;

        this.uienableflag = true;
        this.norecordsflag = false;

        this.getFruitType();
      } else {
        this.sterilizerArr = [];

        this.uienableflag = false;
        this.norecordsflag = true;

        this.getFruitType();
      }
    });
  }

  getFruitType() {
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      language: this.languageService.selected,
    };

    this.supervisorservice.getFruitTypeValue(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.fruittypeArr = resultdata.data;

        this.getImageSettingsFlag();
      } else {
        this.getImageSettingsFlag();
      }
    });
  }

  getImageSettingsFlag() {
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
        this.fruittypeimagesettingsflag =
          resultdata.data[0].fruittypeimagesettingsflag;
        this.p1imagesettingsflag = resultdata.data[0].p1imagesettingsflag;
        this.p3imagesettingsflag = resultdata.data[0].p3imagesettingsflag;

        if (this.fruittypeimagesettingsflag == 1) {
          this.fruittypeimageuiflag = true;
        } else {
          this.fruittypeimageuiflag = false;
        }

        if (this.p1imagesettingsflag == 1) {
          this.p1imageuiflag = true;
        } else {
          this.p1imageuiflag = false;
        }

        if (this.p3imagesettingsflag == 1) {
          this.p3imageuiflag = true;
        } else {
          this.p3imageuiflag = false;
        }
      } else {
        this.fruittypeimagesettingsflag = 0;
        this.p1imagesettingsflag = 0;
        this.p3imagesettingsflag = 0;
      }
    });
  }

  onChangeBackPressureReceiver() {
    if (this.sterilizerstationForm.value.txt_backpressurereceiver != "") {
      if (
        this.sterilizerstationForm.value.txt_backpressurereceiver >=
          this.backpressurethreshold_min &&
        this.sterilizerstationForm.value.txt_backpressurereceiver <=
          this.backpressurethreshold_max
      ) {
        this.backpressurevalidationflag = 0;
      } else {
        this.backpressurevalidationflag = 1;
      }
    }

    /*if (this.sterilizerstationForm.value.txt_backpressurereceiver != "") {
      if (
        this.sterilizerstationForm.value.txt_backpressurereceiver >
        this.backpressurethreshold_max
      ) {
        this.backpressurevalidationflag = 1;

        this.peakthresholdalert(
          this.backpressurealerttitle,
          this.backpressurealertmessage
        );
      } else {
        this.backpressurevalidationflag = 0;
      }
    }*/
  }

  onChangeP1() {
    if (this.sterilizerstationForm.value.txt_p1 != "") {
      if (
        this.sterilizerstationForm.value.txt_p1 >= this.p1peakthreshold_min &&
        this.sterilizerstationForm.value.txt_p1 <= this.p1peakthreshold_max
      ) {
        this.p1validationflag = 0;
      } else {
        this.p1validationflag = 1;
      }
    }

    /*if (this.sterilizerstationForm.value.txt_p1 != "") {
      if (this.sterilizerstationForm.value.txt_p1 > this.p1peakthreshold_max) {
        this.p1validationflag = 1;
        this.peakthresholdalert(this.p1peakalerttitle, this.p1peakalertmessage);
      } else {
        this.p1validationflag = 0;
      }
    }*/
  }

  onChangeP2() {
    if (this.sterilizerstationForm.value.txt_p2 != "") {
      if (
        this.sterilizerstationForm.value.txt_p2 >= this.p2peakthreshold_min &&
        this.sterilizerstationForm.value.txt_p2 <= this.p2peakthreshold_max
      ) {
        this.p2validationflag = 0;
      } else {
        this.p2validationflag = 1;
      }
    }

    /*if (this.sterilizerstationForm.value.txt_p2 != "") {
      if (this.sterilizerstationForm.value.txt_p2 > this.p2peakthreshold_max) {
        this.p2validationflag = 1;

        this.peakthresholdalert(this.p2peakalerttitle, this.p2peakalertmessage);
      } else {
        this.p2validationflag = 0;
      }
    }*/
  }

  onChangeP3() {
    if (this.sterilizerstationForm.value.txt_p3 != "") {
      if (
        this.sterilizerstationForm.value.txt_p3 >= this.p3peakthreshold_min &&
        this.sterilizerstationForm.value.txt_p3 <= this.p3peakthreshold_max
      ) {
        this.p3validationflag = 0;
      } else {
        this.p3validationflag = 1;
      }
    }

    /*if (this.sterilizerstationForm.value.txt_p3 != "") {
      if (this.sterilizerstationForm.value.txt_p3 > this.p3peakthreshold_max) {
        this.p3validationflag = 1;

        this.peakthresholdalert(this.p3peakalerttitle, this.p3peakalertmessage);
      } else {
        this.p3validationflag = 0;
      }
    }*/
  }

  btn_view(type) {
    this.imagetype = type;

    if (this.imagetype == "FruitType") {
      if (this.fruittypeimagesArr.length > 0) {
        this.fruittypeimageviewFlag = true;
      } else {
        if (this.fruittypeimagesArr.length > 1) {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagesnotfound"
              )
          );
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagenotfound"
              )
          );
        }
      }
    }

    if (this.imagetype == "P1") {
      if (this.p1imagesArr.length > 0) {
        this.p1imageviewFlag = true;
      } else {
        if (this.p1imagesArr.length > 1) {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagesnotfound"
              )
          );
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagenotfound"
              )
          );
        }
      }
    }

    if (this.imagetype == "P3") {
      if (this.p3imagesArr.length > 0) {
        this.p3imageviewFlag = true;
      } else {
        if (this.p3imagesArr.length > 1) {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagesnotfound"
              )
          );
        } else {
          this.commonservice.presentToast(
            type +
              this.translate.instant(
                "HOURLYSTERILIZATIONSTATIONSAVE.imagenotfound"
              )
          );
        }
      }
    }
  }

  imageviewcancel() {
    if (this.imagetype == "FruitType") {
      this.fruittypeimageviewFlag = false;
    }

    if (this.imagetype == "P1") {
      this.p1imageviewFlag = false;
    }

    if (this.imagetype == "P3") {
      this.p3imageviewFlag = false;
    }
  }

  async savealert() {
    if (this.sterilizerstationForm.valid) {
      if (!Number.isInteger(this.sterilizerstationForm.value.txt_cyclenumber)) {
        this.commonservice.presentToast(
          this.translate.instant(
            "HOURLYSTERILIZATIONSTATIONSAVE.cycleshouldbenumber"
          )
        );
        return;
      }

      if (this.view_doorshuttime == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "HOURLYSTERILIZATIONSTATIONSAVE.doorshuttimemandatory"
          )
        );
        return;
      }

      if (this.view_dooropentime == "") {
        this.commonservice.presentToast(
          this.translate.instant(
            "HOURLYSTERILIZATIONSTATIONSAVE.dooropentimemandatory"
          )
        );
        return;
      }

      if (
        Date.parse(
          moment(this.view_dooropentime, "DD-MM-YYYY HH:mm").format()
        ) <=
        Date.parse(moment(this.view_doorshuttime, "DD-MM-YYYY HH:mm").format())
      ) {
        this.commonservice.presentToast(
          this.translate.instant(
            "HOURLYSTERILIZATIONSTATIONSAVE.doorshutandopentimevalidation"
          )
        );
        return;
      }

      if (this.validationflag == 1) {
        /*if (this.backpressurevalidationflag == 1) {
          this.peakthresholdalert(
            this.backpressurealerttitle,
            this.backpressurealertmessage
          );
          return;
        }

        if (this.p1validationflag == 1) {
          this.peakthresholdalert(
            this.p1peakalerttitle,
            this.p1peakalertmessage
          );
          return;
        }

        if (this.p2validationflag == 1) {
          this.peakthresholdalert(
            this.p2peakalerttitle,
            this.p2peakalertmessage
          );
          return;
        }

        if (this.p3validationflag == 1) {
          this.peakthresholdalert(
            this.p3peakalerttitle,
            this.p3peakalertmessage
          );
          return;
        }*/

        if (
          this.backpressurevalidationflag == 1 ||
          this.p1validationflag == 1 ||
          this.p2validationflag == 1 ||
          this.p3validationflag == 1
        ) {
          this.thresholdalert();
        } else {
          this.save();
        }
      } else {
        this.save();
      }
    } else {
      this.commonservice.presentToast(
        this.translate.instant(
          "HOURLYSTERILIZATIONSTATIONSAVE.pleasefilltheform"
        )
      );
    }
  }

  async thresholdalert() {
    var alertmessage = "";

    if (this.backpressurevalidationflag == 1) {
      alertmessage = this.backpressurealertmessage;
    }

    if (this.p1validationflag == 1) {
      if (alertmessage == "") {
        alertmessage = alertmessage + this.p1peakalertmessage;
      } else {
        alertmessage = alertmessage + "<br/>" + this.p1peakalertmessage;
      }
    }

    if (this.p2validationflag == 1) {
      if (alertmessage == "") {
        alertmessage = alertmessage + this.p2peakalertmessage;
      } else {
        alertmessage = alertmessage + "<br/>" + this.p2peakalertmessage;
      }
    }

    if (this.p3validationflag == 1) {
      if (alertmessage == "") {
        alertmessage = alertmessage + this.p3peakalertmessage;
      } else {
        alertmessage = alertmessage + "<br/>" + this.p3peakalertmessage;
      }
    }

    const alert = await this.alertController.create({
      header: this.backpressurealerttitle,
      cssClass: "thresholdalertmessage",
      message: alertmessage,
      backdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.okay"),
          handler: () => {
            //console.log("Confirm Okay");
            this.save();
          },
        },
      ],
    });

    await alert.present();
  }

  save() {
    if (this.sterilizerstationForm.valid) {
      this.view_cycleno = this.sterilizerstationForm.value.txt_cyclenumber;
      this.view_doorshuttime = moment(
        this.view_doorshuttime,
        "DD-MM-YYYY HH:mm"
      ).format("DD-MM-YYYY HH:mm");
      this.view_dooropentime = moment(
        this.view_dooropentime,
        "DD-MM-YYYY HH:mm"
      ).format("DD-MM-YYYY HH:mm");

      this.view_sterilizername = JSON.parse(
        this.sterilizerstationForm.value.select_sterilizer
      ).machine_name;
      this.view_fruittype = JSON.parse(
        this.sterilizerstationForm.value.select_fruittype
      ).fruittype;
      this.view_backpressurereceiver =
        this.sterilizerstationForm.value.txt_backpressurereceiver;
      this.view_p1peak = this.sterilizerstationForm.value.txt_p1;
      this.view_p2peak = this.sterilizerstationForm.value.txt_p2;
      this.view_p3peak = this.sterilizerstationForm.value.txt_p3;

      this.pageTop.scrollToTop();

      this.viewFlag = true;
    } else {
      this.pageTop.scrollToTop();

      this.viewFlag = false;

      this.commonservice.presentToast(
        this.translate.instant(
          "HOURLYSTERILIZATIONSTATIONSAVE.pleasefilltheform"
        )
      );
    }
  }

  async peakthresholdalert(alerttitle, alertmessage) {
    const alert = await this.alertController.create({
      header: alerttitle,
      cssClass: "thresholdalertmessage",
      message: alertmessage,
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.okay"),
          handler: () => {
            //console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmalert() {
    if (this.sterilizerstationForm.valid) {
      const alert = await this.alertController.create({
        header: this.translate.instant(
          "HOURLYSTERILIZATIONSTATIONSAVE.alertheader"
        ),
        cssClass: "alertmessage",
        message: this.translate.instant(
          "HOURLYSTERILIZATIONSTATIONSAVE.alertmessage"
        ),
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
              this.confirm();
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.translate.instant(
        "HOURLYSTERILIZATIONSTATIONSAVE.pleasefilltheform"
      );
    }
  }

  confirm() {
    if (this.sterilizerstationForm.valid) {
      this.isDisabled = true;

      var getcurrentdate = moment(new Date().toISOString()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      var doorshuttime = moment(
        this.view_doorshuttime,
        "DD-MM-YYYY HH:mm"
      ).format("YYYY-MM-DD HH:mm:00");

      var dooropentime = moment(
        this.view_dooropentime,
        "DD-MM-YYYY HH:mm"
      ).format("YYYY-MM-DD HH:mm:00");

      if (!Number.isInteger(this.sterilizerstationForm.value.txt_cyclenumber)) {
        this.commonservice.presentToast(
          this.translate.instant(
            "HOURLYSTERILIZATIONSTATIONSAVE.cycleshouldbenumber"
          )
        );
        return;
      }

      var req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        dept_id: this.userlist.dept_id,
        machineId: JSON.parse(
          this.sterilizerstationForm.value.select_sterilizer
        ).machine_id,
        status: "1",
        cycleno: this.sterilizerstationForm.value.txt_cyclenumber,
        door_shut_time: doorshuttime,
        door_open_time: dooropentime,
        initial_stream_admission_time: "",
        final_blow_down_time: "",
        cooking_start_time: "",
        cooking_stop_time: "",
        fruittype: JSON.parse(this.sterilizerstationForm.value.select_fruittype)
          .id,
        backPressureReceiver:
          this.sterilizerstationForm.value.txt_backpressurereceiver,
        p1: this.sterilizerstationForm.value.txt_p1,
        p2: this.sterilizerstationForm.value.txt_p2,
        p3: this.sterilizerstationForm.value.txt_p3,
        running_user_id: localStorage.getItem("runninghourid"),
        date: getcurrentdate,
        fruittypeimages: this.fruittypeimagesArr.join("~"),
        p1images: this.p1imagesArr.join("~"),
        p3images: this.p3imagesArr.join("~"),
        language: this.languageService.selected,
      };

      //console.log(req);

      this.supervisorservice.saveHourlySterilizerStation(req).then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          this.sterilizerstationForm.reset();

          this.isDisabled = false;

          this.commonservice.presentToast(
            this.translate.instant(
              "HOURLYSTERILIZATIONSTATIONSAVE.savedsuccess"
            )
          );

          this.router.navigate(["tabs/tabsupervisorhome"]);
        } else {
          this.isDisabled = false;

          this.commonservice.presentToast(
            this.translate.instant("HOURLYSTERILIZATIONSTATIONSAVE.savedfail")
          );
        }
      });
    } else {
      this.translate.instant(
        "HOURLYSTERILIZATIONSTATIONSAVE.pleasefilltheform"
      );
    }
  }

  async sterilizerstationalert() {
    const modal = await this.modalController.create({
      component: ProductionHourlysterilizerstationAlertPage,
      componentProps: {
        item: this.sterilizerstationalertArr,
      },
    });

    modal.onDidDismiss().then((data) => {
      this.getCycleNo();
    });

    return await modal.present();
  }

  cancelconfirm() {
    this.pageTop.scrollToTop();

    this.viewFlag = false;

    this.isDisabled = false;
  }

  cancel() {
    this.location.back();
  }

  parseString(item) {
    return JSON.stringify(item);
  }
}
