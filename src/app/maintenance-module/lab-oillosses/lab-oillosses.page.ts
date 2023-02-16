import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";
// Custom Datepicker
import { Plugins } from "@capacitor/core";
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

@Component({
  selector: "app-lab-oillosses",
  templateUrl: "./lab-oillosses.page.html",
  styleUrls: ["./lab-oillosses.page.scss"],
})
export class LabOillossesPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  oillossesForm;

  selectoillossesdate = moment(new Date().toISOString()).format("DD-MM-YYYY");
  selectoillossestime = moment(new Date().toISOString()).format("HH:mm");

  // Variables
  showFlag = false;
  oillossalertFlag = false;
  isDisabled = false;

  detailsArr = [];
  pressArr = [];
  pressidArr = [];
  oillossvaluearr = [];

  oillossthreshold_max = "";
  oillossthreshold_min = "";
  oillossalerttitle = "";
  oillossalertmessage = "";

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private maintenanceservice: MaintenanceServiceService
  ) {
    this.oillossesForm = this.fb.group({
      txt_date: new FormControl(this.selectoillossesdate),
      txt_time: new FormControl(this.selectoillossestime),
      pressRows: this.fb.array([]),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    (<FormArray>this.oillossesForm.get("pressRows")).clear();

    this.getDetails();
  }

  openDatePicker(type) {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      max: this.selectoillossesdate,
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

  add() {
    const control = new FormControl(null);
    (<FormArray>this.oillossesForm.get("pressRows")).push(control);
  }

  getDetails() {
    const req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      language: this.languageService.selected,
      id: 0,
    };

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
          this.pressArr.push(this.detailsArr[i].pressname);
        }

        for (let i = 0; i < resultdata.totalpress; i++) {
          //console.log(i);
          this.add();
        }

        this.showFlag = true;
      } else {
        this.detailsArr = [];
        this.pressidArr = [];
        this.pressidArr = [];
        this.showFlag = false;
      }
    });
  }

  async showalert() {
    if (this.oillossesForm.valid) {
      this.oillossvaluearr = [];
      var novalues = 0;

      const rowcontrol = this.oillossesForm.get("pressRows");
      for (let i = 0; i < rowcontrol.length; i++) {
        const controlsub = <FormArray>this.oillossesForm.get(["pressRows", i]);

        if (controlsub.value != null && controlsub.value != "") {
          if (
            controlsub.value >= this.oillossthreshold_min &&
            controlsub.value <= this.oillossthreshold_max
          ) {
            this.oillossvaluearr.push(String(controlsub.value));
          } else {
            this.oillossalertFlag = true;
            this.oillossvaluearr.push(String(controlsub.value));
          }

          /*if (
            controlsub.value >= this.oillossthreshold_min &&
            controlsub.value <= this.oillossthreshold_max
          ) {
            this.oillossvaluearr.push(String(controlsub.value));
          } else {
            this.thresholdalert(
              this.oillossalerttitle,
              this.oillossalertmessage
            );
            return;
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

      if (this.oillossalertFlag) {
        this.thresholdalert(this.oillossalerttitle, this.oillossalertmessage);
      } else {
        const alert = await this.alertController.create({
          header: this.translate.instant("OILLOSSESSREPORT.header"),
          cssClass: "alertmessage",
          message: this.translate.instant("OILLOSSESSREPORT.savealert"),
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
      }
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
    this.isDisabled = true;

    let getdate = moment(this.selectoillossesdate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );

    let gettime = moment(this.selectoillossestime, "HH:mm").format("HH:mm");

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: 0,
      date: getdate,
      time: gettime,
      pressvalue: this.oillossvaluearr.join(","),
      pressid: this.pressidArr.join(","),
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
          this.translate.instant("OILLOSSESSREPORT.insertedsuccessfully")
        );

        this.router.navigate(["/lab-oillosses-list"]);
      } else {
        this.isDisabled = false;

        this.commonservice.presentToast(
          this.translate.instant("OILLOSSESSREPORT.insertedfailed")
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
