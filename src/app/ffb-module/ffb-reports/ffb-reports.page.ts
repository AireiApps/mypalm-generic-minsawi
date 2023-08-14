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
import { FfbServiceService } from "src/app/services/ffb-service/ffb-service.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

// Custom Datepicker
import { Plugins } from "@capacitor/core";

import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

import { PressingsterilizerstationImageSliderPage } from "src/app/supervisor-module/pressingsterilizerstation-image-slider/pressingsterilizerstation-image-slider.page";

@Component({
  selector: "app-ffb-reports",
  templateUrl: "./ffb-reports.page.html",
  styleUrls: ["./ffb-reports.page.scss"],
})
export class FfbReportsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  millcode = this.userlist.millcode;
  mill_name = this.nl2br(this.userlist.millname);

  ffbReportForm;

  currentdate = moment(new Date().toISOString()).format("DD-MM-YYYY");

  fromdate = "";
  todate = "";
  despatchimageFlag = 0;

  ffblistArr = [];

  norecordFlag = false;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: FfbServiceService,
    private screenOrientation: ScreenOrientation
  ) {
    this.ffbReportForm = this.fb.group({
      from_date: new FormControl(this.currentdate),
      to_date: new FormControl(this.currentdate),
    });

    this.activatedroute.params.subscribe((val) => {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );

      this.fromdate = "";
      this.todate = "";

      this.getFFBReport();
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  ionViewDidEnter() {
    //this.getFFBReport();
  }

  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }

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

  getFFBReport() {
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
      type: 2,
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.getFFBRampReport(req).then((result) => {
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
        this.ffblistArr = resultdata.data;
        this.norecordFlag = false;
      } else {
        this.ffblistArr = [];
        this.norecordFlag = true;
      }
    });
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
          from: "FFBSupplierReport",
          ffbsupplieritem: despatchimages,
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
