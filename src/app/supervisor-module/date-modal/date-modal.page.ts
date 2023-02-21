import { Component, OnInit } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ModalController, NavParams, AlertController } from "@ionic/angular";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import * as moment from "moment";

// Custom Date Picker
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
import { Plugins } from "@capacitor/core";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;

// Language Convertion
import { LanguageService } from "src/app/services/language-service/language.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-date-modal",
  templateUrl: "./date-modal.page.html",
  styleUrls: ["./date-modal.page.scss"],
})
export class DateModalPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));

  dateForm;

  gettransactionid;
  getproductionstatus;
  getmillstartdatetime;
  getmillstopdatetime;
  selectmillstartdatetime = "";
  selectmillstopdatetime = "";

  isdisabledmillstartdatetime = false;
  isdisabledmillstopdatetime = false;

  selectedlanguage = "";

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    public modalController: ModalController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private commonservice: AIREIService,
    private service: SupervisorService
  ) {
    this.selectedlanguage = this.languageService.selected;

    this.gettransactionid = navParams.get("id");
    this.getproductionstatus = navParams.get("productionstatus");
    this.getmillstartdatetime = navParams.get("millstart_datetime");
    this.selectmillstartdatetime = this.getmillstartdatetime;

    if (this.getmillstartdatetime != "") {
      this.selectmillstartdatetime = this.getmillstartdatetime;
      this.selectmillstartdatetime = moment(
        this.selectmillstartdatetime,
        "YYYY-MM-DD HH:mm"
      ).format("DD-MM-YYYY HH:mm");
    }

    this.getmillstopdatetime = navParams.get("millstop_datetime");

    if (this.getmillstopdatetime != "") {
      this.selectmillstopdatetime = this.getmillstopdatetime;

      this.selectmillstopdatetime = moment(
        this.selectmillstopdatetime,
        "YYYY-MM-DD HH:mm"
      ).format("DD-MM-YYYY HH:mm");
    }

    if (this.selectmillstartdatetime == "") {
      this.isdisabledmillstartdatetime = true;
    }

    if (this.selectmillstopdatetime == "") {
      this.isdisabledmillstopdatetime = true;
    }

    this.dateForm = this.fb.group({
      txt_millstartdatetime: new FormControl(this.selectmillstartdatetime),
      txt_millstopdatetime: new FormControl(this.selectmillstopdatetime),
    });
  }

  ngOnInit() {}

  openDateTimePicker(type) {
    if (type == "START" && this.isdisabledmillstartdatetime == true) {
      return;
    }

    if (type == "STOP" && this.isdisabledmillstopdatetime == true) {
      return;
    }

    DatePicker.present({
      mode: "dateAndTime",
      format: "dd-MM-yyyy HH:mm",
      theme: "dark",
      doneText: this.translate.instant("GENERALBUTTON.done"),
      cancelText: this.translate.instant("GENERALBUTTON.cancelbutton"),
    }).then(
      (val) => {
        if (val.value) {
          if (type == "START") {
            this.selectmillstartdatetime = val.value;
            this.dateForm.controls.txt_millstartdatetime.setValue(
              this.selectmillstartdatetime
            );
          }

          if (type == "STOP") {
            this.selectmillstopdatetime = val.value;
            this.dateForm.controls.txt_millstopdatetime.setValue(
              this.selectmillstopdatetime
            );
          }
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  save() {
    var millstartdatetime = "";
    var millstopdatetime = "";

    if (this.getmillstartdatetime != "") {
      if (this.selectmillstartdatetime == "") {
        this.commonservice.presentToast(
          this.translate.instant("SUPERVISORDASHBOARD.startdatetimemandatory")
        );
      } else {
        /*millstartdatetime = moment(
          this.dateForm.value.txt_millstartdatetime
        ).format("YYYY-MM-DD HH:mm:00");*/

        millstartdatetime = moment(
          this.selectmillstartdatetime,
          "DD-MM-YYYY HH:mm"
        ).format("YYYY-MM-DD HH:mm:00");
      }
    }

    if (this.getmillstopdatetime != "") {
      if (this.selectmillstopdatetime == "") {
        this.commonservice.presentToast(
          this.translate.instant("SUPERVISORDASHBOARD.stopdatetimemandatory")
        );
      } else {
        /*millstopdatetime = moment(
          this.dateForm.value.txt_millstopdatetime
        ).format("YYYY-MM-DD HH:mm:00");*/

        millstopdatetime = moment(
          this.selectmillstopdatetime,
          "DD-MM-YYYY HH:mm"
        ).format("YYYY-MM-DD HH:mm:00");
      }
    }

    if (this.getmillstartdatetime != "" && this.getmillstopdatetime != "") {
      /*As Remo said to change both start and stop date & time are same need to change don't show mill stop date and time should be greater than mill start date and time. Changed on 22.08.2022*/
      if (
        Date.parse(this.dateForm.value.txt_millstopdatetime) <
        Date.parse(this.dateForm.value.txt_millstartdatetime)
      ) {
        this.commonservice.presentToast(
          this.translate.instant("SUPERVISORDASHBOARD.greaterdatetime")
        );
        return;
      }
    }

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      id: this.gettransactionid,
      startdate: millstartdatetime,
      stopdate: millstopdatetime,
      status: this.getproductionstatus,
      language: this.languageService.selected,
    };

    //console.log(req);

    this.service.saveMillStartStopDateTime(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.modalController.dismiss({
          dismissed: true,
        });
      } else {
        this.commonservice.presentToast(
          this.translate.instant("SUPERVISORDASHBOARD.failed")
        );
      }
    });
  }

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
      item: "",
    });
  }
}
