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
  selector: "app-twohoursentry",
  templateUrl: "./twohoursentry.page.html",
  styleUrls: ["./twohoursentry.page.scss"],
})
export class TwohoursentryPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  twohoursentryForm;

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
    this.twohoursentryForm = this.fb.group({
      pickhour: new FormControl(this.currenthour),
      select_blowdown: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  boilerlog_save() {
    if (this.twohoursentryForm.valid) {
      var req = {
        userid: this.userlist.userId,
        departmentid: this.userlist.dept_id,
        millcode: this.userlist.millcode,
        shift: this.generalservice.shiftid,
        shiftdate: this.generalservice.shiftdate,
        type: "2",
        frequency: this.twohoursentryForm.value.pickhour,
        watergaugeglass: "",
        watergageglasspath: "",
        pressuregaugesteam: "",
        pressuregagesteampath: "",
        outputsteam: "",
        steamoutputpath: "",
        low_water_level_testing: "",
        water_gauge_class_testing: "",
        blowdown: moment(this.twohoursentryForm.value.select_blowdown).format(
          "HH:mm"
        ),
        ashremoval: "",
        sootblow: "",
      };

      console.log(req);

      this.service.boilerloghourly_insert(req).then((result) => {
        var resultdata: any;
        resultdata = result;

        if (resultdata.httpcode == 200) {
          this.twohoursentryForm.reset();
          this.commonservice.presentToast("2 Hours Log Inserted Successfully");
          
          this.dismiss();
          
          //this.router.navigate(["/boiler-log-entry"]);
        } else {
          this.commonservice.presentToast("2 Hours Log Insert Failed");
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
