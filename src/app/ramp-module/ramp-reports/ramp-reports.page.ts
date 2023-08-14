import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { FormBuilder, FormControl } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, AlertController, IonList } from "@ionic/angular";
import { RampserviceService } from "src/app/services/ramp-service/rampservice.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

// Custom Datepicker
import { Plugins } from "@capacitor/core";

import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

import { RampEditPage } from "src/app/ramp-module/ramp-edit/ramp-edit.page";
import { PressingsterilizerstationImageSliderPage } from "src/app/supervisor-module/pressingsterilizerstation-image-slider/pressingsterilizerstation-image-slider.page";

@Component({
  selector: "app-ramp-reports",
  templateUrl: "./ramp-reports.page.html",
  styleUrls: ["./ramp-reports.page.scss"],
})
export class RampReportsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  millcode = this.userlist.millcode;
  mill_name = this.nl2br(this.userlist.millname);

  ffbReportForm;

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  fromdate = "";
  todate = "";
  despatchimageFlag = 0;

  ramplistArr = [];

  norecordFlag = false;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    public rampeditmodalController: ModalController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: RampserviceService,
    private screenOrientation: ScreenOrientation
  ) {
    this.ffbReportForm = this.fb.group({
      from_date: new FormControl(this.currentdate),
      to_date: new FormControl(this.currentdate),
    });

    this.activatedroute.params.subscribe((val) => {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      );

      this.fromdate = "";
      this.todate = "";

      this.getRampReport();
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  ionViewDidEnter() {
    //this.getFFBReport();
  }

  /*ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }*/

  openFromDateTimePicker() {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      date: this.fromdate,
      max: this.currentdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          this.fromdate = val.value;
          this.ffbReportForm.controls.from_date.setValue(this.fromdate);
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  openToDateTimePicker() {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      date: this.todate,
      max: this.currentdate,
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          this.todate = val.value;
          this.ffbReportForm.controls.to_date.setValue(this.todate);
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  getRampReport() {
    let getfromdate;
    let gettodate;

    //console.log(this.fromdate);

    if (this.fromdate != "" || this.todate != "") {
      getfromdate = moment(this.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD");
      gettodate = moment(this.todate, "DD-MM-YYYY").format("YYYY-MM-DD");
    } else {
      getfromdate = "";
      gettodate = "";
    }

    let req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      acc_id: this.userlist.accId,
      dealer_id: this.userlist.dealer_id,
      supplier_acc_id: this.userlist.supplier_acc_id,
      fromdate: getfromdate,
      todate: gettodate,
      type: 1,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getRampReport(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      this.despatchimageFlag = Number(resultdata.despatchimageflag);

      if (this.fromdate == "" || this.todate == "") {
        this.fromdate = moment(resultdata.Fromdate, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        );

        this.ffbReportForm.controls.from_date.setValue(this.fromdate);

        this.todate = moment(resultdata.Todate, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        );

        this.ffbReportForm.controls.to_date.setValue(this.todate);
      }

      if (resultdata.httpcode == 200) {
        this.ramplistArr = resultdata.data;
        this.norecordFlag = false;
      } else {
        this.ramplistArr = [];
        this.norecordFlag = true;
      }
    });
  }

  async btn_Edit(value) {
    const rampeditmodal = await this.rampeditmodalController.create({
      component: RampEditPage,
      componentProps: {
        item: JSON.stringify(value),
      },
      showBackdrop: true,
      backdropDismiss: false,
      cssClass: ["ramppopup-modal"],
    });

    rampeditmodal.onDidDismiss().then((modeldata) => {
      let getdata = modeldata["data"]["item"];

      if (getdata != "") {
        this.getRampReport();
      }
    });

    return await rampeditmodal.present();
  }

  async btn_ViewImages(despatchimages) {
    if (despatchimages != "") {
      /*this.screenOrientation.unlock();
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
      );*/

      const modal = await this.modalController.create({
        component: PressingsterilizerstationImageSliderPage,
        componentProps: {
          from: "Ramp",
          rampitem: despatchimages,
        },
      });

      modal.onDidDismiss().then((data) => {
        /*this.screenOrientation.lock(
          this.screenOrientation.ORIENTATIONS.LANDSCAPE
        );*/
      });

      return await modal.present();
    }
  }

  nl2br(text: string) {
    return text.replace(new RegExp("\r?\n", "g"), "<br />");
  }
}
