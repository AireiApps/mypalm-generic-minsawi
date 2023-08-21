import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { BoilerServiceService } from "src/app/services/boiler-service/boiler-service.service";
import { ImageUploadService } from "src/app/services/imageupload-service/imageupload";
import * as moment from "moment";

import { GeneralserviceService } from "src/app/services/generalservice/generalservice.service";

@Component({
  selector: "app-boilerlevels",
  templateUrl: "./boilerlevels.page.html",
  styleUrls: ["./boilerlevels.page.scss"],
})
export class BoilerlevelsPage implements OnInit {
  waterForm;
  chemicalForm;
  levelForm;

  getwater_cla_datetime;
  getsand_filter_datetime;
  getsoft_reg_datetime;
  getsoftener_hard_datetime;
  tds_datetime;
  getoverhead_datetime;
  getboilerfeedwatertank_datetime;
  getturbineoillevel_datetime;

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  todaydate = moment(new Date().toISOString()).format("YYYY-MM-DD");

  userlist = JSON.parse(localStorage.getItem("userlist"));

  tabs_segment;

  imagePaths = {
    steampressure_path: "",
    boilerfuelstatus_path: "",
    turbine_path: "",
    kilowatt_path: "",
    smokeanalysis_path: "",
    waterclarifierdrainout_path: "",
    sandfilterbackwash_path: "",
    softenerregeneration_path: "",
  };

  shiftid = '';
  shiftdate = '';

  statusArr = [];

  levelArr = [];

  constructor(
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private service: BoilerServiceService,
    private imgUpload: ImageUploadService,
    private generalservice: GeneralserviceService
  ) {
    this.waterForm = this.fb.group({
      water_cla_time: new FormControl("", Validators.required),
      water_cla_status: new FormControl("", Validators.required),
      sand_filter_time: new FormControl("", Validators.required),
      sand_filter_status: new FormControl("", Validators.required),
      soft_reg_time: new FormControl("", Validators.required),
      soft_reg_status: new FormControl("", Validators.required),
      softener_hard_time: new FormControl("", Validators.required),
      softener_hard_status: new FormControl("", Validators.required),
      tds_time: new FormControl("", Validators.required),
      tds_status: new FormControl("", Validators.required),
    });

    this.chemicalForm = this.fb.group({
      corrostion_in: new FormControl("", Validators.required),
      scale_in: new FormControl("", Validators.required),
      sludge_con: new FormControl("", Validators.required),
      online_clean: new FormControl("", Validators.required),
    });

    this.levelForm = this.fb.group({
      overhead_tank: new FormControl("", Validators.required),
      over_head_tank_time: new FormControl("", Validators.required),
      boiler_feed: new FormControl("", Validators.required),
      boiler_feed_water_tank_time: new FormControl("", Validators.required),
      turbine_oil: new FormControl("", Validators.required),
      turbine_oil_level_time: new FormControl("", Validators.required),
    });

    this.tabs_segment = "water";
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getwaterstatus();
  }

  ionViewWillLeave() {
    this.getwaterstatus();
  }

  getwaterstatus() {
    this.statusArr = [];

    const req = {
      millcode: this.userlist.millcode,
    };

    this.service.getwaterstatusList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.statusArr = resultdata.data;
      }
    });
  }

  getlevelstatus() {
    this.levelArr = [];

    const req = {
      millcode: this.userlist.millcode,
    };

    this.service.getlevelstatusList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.levelArr = resultdata.data;
      }
    });
  }

  ImageUpload(type) {
    //this.keyboard.hide;

    if (type == "SteamPressure") {
      var areq = "steampressure";
    }

    if (type == "BoilerFuelStatus") {
      var areq = "boilerfuelstatus";
    }

    if (type == "Turbine") {
      var areq = "turbine";
    }

    if (type == "Kilowatt") {
      var areq = "kilowatt";
    }

    if (type == "SmokeAnalysis") {
      var areq = "smokeanalysis";
    }

    if (type == "WaterClarifierDrainOut") {
      var areq = "waterclarifierdrainout";
    }

    if (type == "SandFilterBackwash") {
      var areq = "sandfilterbackwash";
    }

    if (type == "SoftenerRegeneration") {
      var areq = "softenerregeneration";
    }

    this.imgUpload.ImageUploadBoiler(areq).then(
      (result) => {
        var resultdata: any;
        resultdata = result;

        resultdata = JSON.parse(resultdata.response);

        if (resultdata.httpcode == 200) {
          if (type == "WaterClarifierDrainOut") {
            this.imagePaths.waterclarifierdrainout_path =
              resultdata.data.uploaded_path;
          }

          if (type == "SandFilterBackwash") {
            this.imagePaths.sandfilterbackwash_path =
              resultdata.data.uploaded_path;
          }

          if (type == "SoftenerRegeneration") {
            this.imagePaths.softenerregeneration_path =
              resultdata.data.uploaded_path;
          }

          this.commonservice.presentToast("Image Added Successfully!");
        } else {
          this.commonservice.presentToast("Image Added Failed!");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  boiler_log_save(type) {
    if (type == "water") {
      if (!this.waterForm.valid) {
        this.commonservice.presentToast("Please Fill the Form");
        return;
      }
    }

    if (type == "chemical") {
      if (!this.chemicalForm.valid) {
        this.commonservice.presentToast("Please Fill the Form");
        return;
      }
    }

    if (type == "level") {
      if (!this.levelForm.valid) {
        this.commonservice.presentToast("Please Fill the Form");
        return;
      }
    }

    var req = {
      log_date: this.todaydate,
      Entrydate: this.todaydate,
      user_id: this.userlist.userId,
      department_id: this.userlist.dept_id,
      millcode: this.userlist.millcode,
    };

    this.service.boiler_log_insert(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        let boilerId = resultdata.HeadBoilerId;

        if (type == "water") {
          this.btn_water_save(type, boilerId);
        }

        if (type == "chemical") {
          this.btn_chemical_save(type, boilerId);
        }

        if (type == "level") {
          this.btn_level_save(type, boilerId);
        }
      } else {
        this.commonservice.presentToast("Boiler log insert failed");
      }
    });
  }

  btn_water_save(type, boilerId) {
    this.getwater_cla_datetime = moment(
      this.waterForm.value.water_cla_time
    ).format("HH:mm");
    this.getsand_filter_datetime = moment(
      this.waterForm.value.sand_filter_time
    ).format("HH:mm");
    this.getsoft_reg_datetime = moment(
      this.waterForm.value.soft_reg_time
    ).format("HH:mm");
    this.getsoftener_hard_datetime = moment(
      this.waterForm.value.softener_hard_time
    ).format("HH:mm");
    this.tds_datetime = moment(this.waterForm.value.tds_time).format("HH:mm");

    var req = {
      userid: this.userlist.userId,
      department_id: this.userlist.dept_id,
      millcode: this.userlist.millcode,
      water_clarifier_drain_out: this.waterForm.value.water_cla_status,
      water_clarifier_drain_out_time: this.getwater_cla_datetime,
      water_clarifier_drain_out_image: this.imagePaths.waterclarifierdrainout_path,
      sand_filter_backwash: this.waterForm.value.sand_filter_status,
      sand_filter_backwash_time: this.getsand_filter_datetime,
      sand_filter_backwash_image: this.imagePaths.sandfilterbackwash_path,
      softener_regeneration: this.waterForm.value.soft_reg_status,
      softener_regeneration_time: this.getsoft_reg_datetime,
      softener_regeneration_image: this.imagePaths.softenerregeneration_path,
      softener_hardness: this.waterForm.value.softener_hard_status,
      softener_hardness_time: this.getsoftener_hard_datetime,
      tds: this.waterForm.value.tds_status,
      tdstime: this.tds_datetime,
      HeadBoilerId: boilerId,
    };

    console.log(req);

    this.service.boiler_insert(type, req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.waterForm.reset();

        this.imagePaths.waterclarifierdrainout_path = "";
        this.imagePaths.sandfilterbackwash_path = "";
        this.imagePaths.softenerregeneration_path = "";

        this.waterForm.controls.water_cla_status.setValue("");
        this.waterForm.controls.sand_filter_status.setValue("");
        this.waterForm.controls.soft_reg_status.setValue("");
        this.waterForm.controls.softener_hard_status.setValue("");
        this.waterForm.controls.tds_status.setValue("");

        this.commonservice.presentToast("Boiler Water Inserted");
      } else {
        this.commonservice.presentToast("Boiler Water insert failed");
      }
    });
  }

  btn_chemical_save(type, boilerId) {
    var req = {
      userid: this.userlist.userId,
      department_id: this.userlist.dept_id,
      millcode: this.userlist.millcode,
      shift: this.generalservice.shiftid,
      shiftdate: this.generalservice.shiftdate,
      corrosion_inhibitor: this.chemicalForm.value.corrostion_in,
      scale_inhibitor: this.chemicalForm.value.scale_in,
      HeadBoilerId: boilerId,
      sludge_conditioner: this.chemicalForm.value.sludge_con,
      on_line_cleaning: this.chemicalForm.value.online_clean,
    };

    this.service.boiler_insert(type, req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.chemicalForm.reset();

        this.commonservice.presentToast("Boiler Chemical Inserted");
      } else {
        this.commonservice.presentToast("Boiler Chemical insert failed");
      }
    });
  }

  btn_level_save(type, boilerId) {
    this.getoverhead_datetime = moment(
      this.levelForm.value.over_head_tank_time
    ).format("HH:mm");
    this.getboilerfeedwatertank_datetime = moment(
      this.levelForm.value.boiler_feed_water_tank_time
    ).format("HH:mm");
    this.getturbineoillevel_datetime = moment(
      this.levelForm.value.turbine_oil_level_time
    ).format("HH:mm");

    var req = {
      userid: this.userlist.userId,
      department_id: this.userlist.dept_id,
      millcode: this.userlist.millcode,
      shift: this.generalservice.shiftid,
      shiftdate: this.generalservice.shiftdate,
      over_head_tank: this.levelForm.value.overhead_tank,
      over_head_tank_time: this.getoverhead_datetime,
      boiler_feed_water_tank: this.levelForm.value.boiler_feed,
      boiler_feed_water_tank_time: this.getboilerfeedwatertank_datetime,
      turbine_oil_level: this.levelForm.value.turbine_oil,
      turbine_oil_level_time: this.getturbineoillevel_datetime,
      HeadBoilerId: boilerId,
    };

    //console.log(req);

    this.service.boiler_insert(type, req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.levelForm.reset();

        this.levelForm.controls.overhead_tank.setValue("");
        this.levelForm.controls.boiler_feed.setValue("");
        this.levelForm.controls.turbine_oil.setValue("");

        this.commonservice.presentToast("Boiler Level Inserted");
      } else {
        this.commonservice.presentToast("Boiler Level insert failed");
      }
    });
  }

  segmentChanged(ev: any) {
    //console.log("Segment changed", ev);

    if (ev.detail.value == "water") {
      this.getwaterstatus();
    }

    if (ev.detail.value == "level") {
      this.getlevelstatus();
    }
  }
}
