import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { HttpserviceService } from "../../services/httpservice/httpservice.service";
import { BoilerServiceService } from "src/app/services/boiler-service/boiler-service.service";
import { ImageUploadService } from "src/app/services/imageupload-service/imageupload";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import * as moment from "moment";
import { ModalController } from "@ionic/angular";

import { GeneralserviceService } from "src/app/services/generalservice/generalservice.service";

@Component({
  selector: "app-fourhoursentry",
  templateUrl: "./fourhoursentry.page.html",
  styleUrls: ["./fourhoursentry.page.scss"],
})
export class FourhoursentryPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  fourhoursentryForm;

  shiftid = '';
  shiftdate = '';

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  currenthour = moment(new Date().toISOString()).format("HH:00");

  constructor(
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
    this.fourhoursentryForm = this.fb.group({
      pickhour: new FormControl(this.currenthour),
      select_ashremoval: new FormControl("", Validators.required),
      select_sootblow: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  boilerlog_save() {
    if (this.fourhoursentryForm.valid) {
      var req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        millcode: this.userlist.millcode,
        shift: this.generalservice.shiftid,
        shiftdate: this.generalservice.shiftdate,
        type: "4",
        frequency: this.fourhoursentryForm.value.pickhour,
        watergaugeglass: "",
        watergageglasspath: "",
        pressuregaugesteam: "",
        pressuregagesteampath: "",
        outputsteam: "",
        steamoutputpath: "",
        low_water_level_testing: "",
        water_gauge_class_testing: "",
        blowdown: "",
        ashremoval: moment(
          this.fourhoursentryForm.value.select_ashremoval
        ).format("HH:mm"),
        sootblow: moment(this.fourhoursentryForm.value.select_sootblow).format(
          "HH:mm"
        ),
      };

      console.log(req);

      this.service.boilerloghourly_insert(req).then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          this.fourhoursentryForm.reset();
          this.commonservice.presentToast("4 Hours Log Inserted Successfully");

          this.dismiss();
          
          //this.router.navigate(["/boiler-log-entry"]);
        } else {
          this.commonservice.presentToast("4 Hours Log Insert Failed");
        }
      });
    } else {
      this.commonservice.presentToast("Please Fill the Form");
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      data: "",
    });
  }
}
