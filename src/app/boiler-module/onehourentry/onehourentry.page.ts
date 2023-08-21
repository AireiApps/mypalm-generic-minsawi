import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { HttpserviceService } from "../../services/httpservice/httpservice.service";
import { BoilerServiceService } from "src/app/services/boiler-service/boiler-service.service";
import { ImageUploadService } from "src/app/services/imageupload-service/imageupload";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import * as moment from "moment";
import { ModalController, IonContent } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

import { GeneralserviceService } from "src/app/services/generalservice/generalservice.service";

@Component({
  selector: "app-onehourentry",
  templateUrl: "./onehourentry.page.html",
  styleUrls: ["./onehourentry.page.scss"],
})
export class OnehourentryPage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  powerdistributionArr = [];

  powerdistribution_id = 0;
  powerdistribution_name = "";
  boilerperformanceentryForm;
  turbineperformanceentryForm;

  imagePaths = {
    boilerpressuresteamoutputpath: "",
    boilerwaterlevelpath: "",
    smokeanalysispath: "",
    powerconsumptionpath: "",
    powerdistributionpath: "",
    frequencypath: "",
  };

  shiftid = "";
  shiftdate = "";

  currentdate = moment(new Date().toISOString()).format("YYYY-MM-DD");
  formattedcurrentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  currenthour = moment(new Date().toISOString()).format("HH:00");

  tabs_segment;

  isCommentsenable = false;

  public powerdistributionOptions: any = {
    header: "Power Distribution",
    cssClass: "multiselect",
  };

  constructor(
    private translate: TranslateService,
    public modalController: ModalController,
    private activeroute: ActivatedRoute,
    private router: Router,
    private httpservice: HttpserviceService,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private service: BoilerServiceService,
    private imgUpload: ImageUploadService,
    private generalservice: GeneralserviceService
  ) {
    this.boilerperformanceentryForm = this.fb.group({
      pick_bphour: new FormControl(this.currenthour),
      txt_boilerpressure: new FormControl("", Validators.required),
      txt_steamoutput: new FormControl("", Validators.required),
      txt_boilerwaterlevel: new FormControl("", Validators.required),
      txt_opacity: new FormControl("", Validators.required),
      txt_concentration: new FormControl("", Validators.required),
    });

    this.turbineperformanceentryForm = this.fb.group({
      pick_tphour: new FormControl(this.currenthour),
      txt_inletpressure: new FormControl("", Validators.required),
      txt_nozzlepressure: new FormControl("", Validators.required),
      txt_oilpressure: new FormControl("", Validators.required),
      txt_powerconsumption: new FormControl("", Validators.required),
      txt_frequency: new FormControl("", Validators.required),
      select_powerdistribution: new FormControl("", Validators.required),
      taReason: new FormControl(""),
    });

    this.tabs_segment = "BoilerPerformance";
  }

  ngOnInit() {}

  getpowerdistributionList() {
    const req = {
      millcode: this.userlist.millcode,
    };

    this.service.getpowerdistributionList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.powerdistributionArr = resultdata.data;
      }
    });
  }

  boilerperformance_save() {
    if (
      this.boilerperformanceentryForm.value.txt_boilerwaterlevel > 100 ||
      this.boilerperformanceentryForm.value.txt_opacity > 100
    ) {
      this.commonservice.presentToast(
        this.translate.instant("GRADINGHOME.percentagevalidation")
      );
      return;
    }
    if (this.boilerperformanceentryForm.valid) {
      var req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        millcode: this.userlist.millcode,
        low_water_level_testing: "",
        water_gauge_class_testing: "",
        watergageglasspath: "",
        pressuregagesteampath: "",
        steamoutputpath: "",
        frequency: this.boilerperformanceentryForm.value.pick_bphour,
        blowdown: "",
        ashremoval: "",
        pressuregaugesteam: "",
        watergaugeglass: "",
        type: "1",
        outputsteam: "",
        sootblow: "",
      };

      this.service.boilerloghourly_insert(req).then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          var areq = {
            userid: this.userlist.userId,
            departmentid: this.userlist.dept_id,
            millcode: this.userlist.millcode,
            boilerperformancefrequency:
              this.boilerperformanceentryForm.value.pick_bphour,
            boilerpressure:
              this.boilerperformanceentryForm.value.txt_boilerpressure,
            steamoutput: this.boilerperformanceentryForm.value.txt_steamoutput,
            boilerpressuresteamoutputpath:
              this.imagePaths.boilerpressuresteamoutputpath,

            boilerwaterlevel:
              this.boilerperformanceentryForm.value.txt_boilerwaterlevel,
            boilerwaterlevelpath: this.imagePaths.boilerwaterlevelpath,

            opacity: this.boilerperformanceentryForm.value.txt_opacity,
            concentration:
              this.boilerperformanceentryForm.value.txt_concentration,
            smokeanalysispath: this.imagePaths.smokeanalysispath,
            date: this.currentdate,
          };

          console.log(req);

          this.service.boilerperformance_insert(areq).then((result) => {
            var resultdata: any;
            resultdata = result;

            if (resultdata.httpcode == 200) {
              this.currenthour =
                this.boilerperformanceentryForm.value.pick_bphour;

              this.boilerperformanceentryForm.reset();

              this.boilerperformanceentryForm.controls.pick_bphour.setValue(
                this.currenthour
              );

              this.turbineperformanceentryForm.controls.pick_tphour.setValue(
                this.currenthour
              );

              this.imagePaths.boilerpressuresteamoutputpath = "";
              this.imagePaths.smokeanalysispath = "";

              this.tabs_segment = "TurbinePerformance";

              this.commonservice.presentToast(
                "Boiler Performance Inserted Successfully"
              );

              this.pageTop.scrollToTop();

              this.tabs_segment = "TurbinePerformance";
            } else {
              this.commonservice.presentToast(
                "Boiler Performance Insert Failed"
              );
            }
          });
        } else {
          this.commonservice.presentToast("Hourly Insert Failed");
        }
      });
    } else {
      this.commonservice.presentToast("Please Fill the Form");
    }
  }

  turbineperformance_save() {
    if (this.turbineperformanceentryForm.valid) {
      if (this.powerdistribution_id != 0) {
        if (this.turbineperformanceentryForm.value.taReason == "") {
          this.commonservice.presentToast("Reason is Mandatory");
          return;
        }
      }
      var areq = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        millcode: this.userlist.millcode,
        shift: this.generalservice.shiftid,
        shiftdate: this.generalservice.shiftdate,
        turbineperformancefrequency:
          this.turbineperformanceentryForm.value.pick_tphour,
        inletpressure: this.turbineperformanceentryForm.value.txt_inletpressure,
        nozzlepressure:
          this.turbineperformanceentryForm.value.txt_nozzlepressure,
        oilpressure: this.turbineperformanceentryForm.value.txt_oilpressure,
        powerconsumption:
          this.turbineperformanceentryForm.value.txt_powerconsumption,
        powerconsumptionpath: this.imagePaths.powerconsumptionpath,
        frequency: this.turbineperformanceentryForm.value.txt_frequency,
        frequencypath: this.imagePaths.frequencypath,
        powerdistribution: this.powerdistribution_id,
        powerdistributionpath: this.imagePaths.powerdistributionpath,
        remarks: this.turbineperformanceentryForm.value.taReason,
      };

      console.log(areq);

      this.service.turbineperformance_insert(areq).then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          this.turbineperformanceentryForm.reset();
          this.turbineperformanceentryForm.controls.pick_tphour.setValue(
            this.currenthour
          );
          this.imagePaths.powerconsumptionpath = "";
          this.imagePaths.frequencypath = "";
          this.imagePaths.powerdistributionpath = "";
          this.commonservice.presentToast(
            "Turbine Performance Inserted Successfully"
          );
          this.dismiss();
        } else {
          this.commonservice.presentToast("Turbine Performance Insert Failed");
        }
      });
    } else {
      this.commonservice.presentToast("Please Fill the Form");
    }
  }

  segmentChanged(ev: any) {
    if (ev.detail.value == "TurbinePerformance") {
      this.turbineperformanceentryForm.controls.pick_tphour.setValue(
        this.boilerperformanceentryForm.value.pick_bphour
      );
      this.getpowerdistributionList();
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      data: "",
    });
  }
  parseString(item) {
    return JSON.stringify(item);
  }
  powerdistributionhandleChange(e) {
    let value = e.detail.value;
    console.log(value);
    if (value.length > 0) {
      this.powerdistribution_id = JSON.parse(value).id;
      this.powerdistribution_name = JSON.parse(value).type;
      this.isCommentsenable = true;
      console.log(this.powerdistribution_id);
    } else {
      this.powerdistribution_id = 0;
      this.powerdistribution_name = "";
      this.isCommentsenable = false;
    }
  }
}
