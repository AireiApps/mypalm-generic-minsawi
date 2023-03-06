import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { Plugins } from "@capacitor/core";
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-lab-oillosses-edit",
  templateUrl: "./lab-oillosses-edit.page.html",
  styleUrls: ["./lab-oillosses-edit.page.scss"],
})
export class LabOillossesEditPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  oillossesForm;

  params;

  oillossesid = "";
  oillossesdate = "";
  oillossestime = "";

  detailsArr = [];
  pressArr = [];
  pressidArr = [];
  oillossesdetidArr = [];
  oillossvaluearr = [];

  oillossthreshold_max = "";
  oillossthreshold_min = "";
  oillossalerttitle = "";
  oillossalertmessage = "";

  pressno1 = "";
  pressno2 = "";
  pressno3 = "";
  pressno4 = "";
  pressno5 = "";

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  selectoillossesdate = "";
  selectoillossestime = "";

  isDisabled = false;
  oillossalertFlag = false;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private maintenanceservice: MaintenanceServiceService
  ) {
    let viewform = this.route.snapshot.paramMap.get("item");
    this.params = JSON.parse(viewform);

    this.oillossesid = this.params.id;

    this.oillossesdate = this.params.oillossdate;
    //this.selectoillossesdate = this.oillossesdate;

    if (this.oillossesdate != "") {
      this.selectoillossesdate = this.oillossesdate;

      this.selectoillossesdate = moment(
        this.selectoillossesdate,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY");
    }

    this.oillossestime = this.params.time;
    //this.selectoillossestime = this.oillossestime;

    if (this.oillossestime != "") {
      this.selectoillossestime = this.oillossestime;

      this.selectoillossestime = moment(
        this.selectoillossestime,
        "HH:mm"
      ).format("HH:mm");
    }

    this.oillossesForm = this.fb.group({
      txt_date: new FormControl(this.selectoillossesdate, Validators.required),
      txt_time: new FormControl(this.selectoillossestime, Validators.required),

      pressRows: this.fb.array([]),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getDetails();
  }

  openDatePicker(type) {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      max: this.currentdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          if (type == "LED") {
            this.selectoillossesdate = val.value;
            this.oillossesForm.controls.txt_date.setValue(
              this.selectoillossesdate
            );
          }
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  openTimePicker(type) {
    DatePicker.present({
      mode: "time",
      format: "HH:mm",

      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          if (type == "LET") {
            this.selectoillossestime = val.value;
            this.oillossesForm.controls.txt_time.setValue(
              this.selectoillossestime
            );
          }
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  getDetails() {
    const req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      id: this.oillossesid,
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.getOilLossPressDetails(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.oillossalerttitle = resultdata.oillossthreshold_alerttitle;
        this.oillossalertmessage = resultdata.oillossthreshold_alertmessage;
        this.oillossthreshold_max = resultdata.oillossthreshold_max;
        this.oillossthreshold_min = resultdata.oillossthreshold_min;

        this.detailsArr = resultdata.data;

        for (let i = 0; i < this.detailsArr.length; i++) {
          this.pressidArr.push(this.detailsArr[i].pressid);
          this.oillossesdetidArr.push(this.detailsArr[i].oilloss_detid);
          this.pressArr.push(this.detailsArr[i].pressname);
          this.add(this.detailsArr[i].oillossvalue);
        }
      } else {
        this.detailsArr = [];
        this.pressidArr = [];
        this.oillossesdetidArr = [];
        this.pressArr = [];
      }
    });
  }

  add(value) {
    const control = new FormControl(value);
    (<FormArray>this.oillossesForm.get("pressRows")).push(control);
  }

  async showalert() {
    if (this.oillossesForm.valid) {
      this.oillossvaluearr = [];
      var novalues = 0;

      const rowcontrol = this.oillossesForm.get("pressRows");

      for (let i = 0; i < rowcontrol.length; i++) {
        const controlsub = <FormArray>this.oillossesForm.get(["pressRows", i]);
        if (controlsub.value != null && controlsub.value != "") {
          this.oillossvaluearr.push(String(controlsub.value));
          /*if (
            controlsub.value >= this.oillossthreshold_min &&
            controlsub.value <= this.oillossthreshold_max
          ) {
            this.oillossvaluearr.push(String(controlsub.value));
          } else {
            this.oillossalertFlag = true;
            this.oillossvaluearr.push(String(controlsub.value));
          }*/
        } else {
          this.oillossvaluearr.push("~");
          novalues = novalues + 1;
        }
      }

      if (rowcontrol.length == novalues) {
        this.commonservice.presentToast(
          this.translate.instant("OILLOSSESSREPORT.mandatory")
        );
        return;
      }

      /*if (this.oillossalertFlag) {
        this.thresholdalert(this.oillossalerttitle, this.oillossalertmessage);
      } else {
        const alert = await this.alertController.create({
          header: this.translate.instant("OILLOSSESSREPORT.header"),
          cssClass: "alertmessage",
          message: this.translate.instant("OILLOSSESSREPORT.alertmessage"),
          buttons: [
            {
              text: this.translate.instant("GENERALBUTTON.cancelbutton"),
              role: "cancel",
              cssClass: "secondary",
              handler: (cancel) => {},
            },
            {
              text: this.translate.instant("GENERALBUTTON.sure"),
              handler: () => {
                this.save();
              },
            },
          ],
        });

        await alert.present();
      }*/

      const alert = await this.alertController.create({
        header: this.translate.instant("OILLOSSESSREPORT.header"),
        cssClass: "alertmessage",
        message: this.translate.instant("OILLOSSESSREPORT.alertmessage"),
        buttons: [
          {
            text: this.translate.instant("GENERALBUTTON.cancelbutton"),
            role: "cancel",
            cssClass: "secondary",
            handler: (cancel) => {},
          },
          {
            text: this.translate.instant("GENERALBUTTON.sure"),
            handler: () => {
              this.save();
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.commonservice.presentToast(
        this.translate.instant("GENERALBUTTON.pleasefilltheform")
      );
    }
  }

  async thresholdalert(alerttitle, alertmessage) {
    const alert = await this.alertController.create({
      header: alerttitle,
      cssClass: "thresholdalertmessage",
      message: alertmessage,
      buttons: [
        {
          text: this.translate.instant("GENERALBUTTON.okay"),
          handler: () => {
            this.save();
          },
        },
      ],
    });

    await alert.present();
  }

  save() {
    //this.isDisabled = true;

    let getdate = moment(this.selectoillossesdate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );

    let gettime = moment(this.selectoillossestime, "HH:mm").format("HH:mm");

    //console.log(this.oillossvaluearr.join(","));

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: this.oillossesid,
      date: getdate,
      time: gettime,
      pressvalue: this.oillossvaluearr.join(","),
      pressid: this.pressidArr.join(","),
      oillossdetid: this.oillossesdetidArr.join(","),
      language: this.languageService.selected,
    };

    console.log(req);

    this.maintenanceservice.saveOilLosses(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.oillossesForm.reset();

        this.isDisabled = false;

        this.commonservice.presentToast(
          this.translate.instant("OILLOSSESSREPORT.successmessage")
        );

        this.router.navigate(["/lab-oillosses-list", { reportdate: "" }]);
      } else {
        this.isDisabled = false;

        this.commonservice.presentToast(
          this.translate.instant("OILLOSSESSREPORT.failedmessage")
        );
      }
    });
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }
}
