import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { CeoServiceService } from "src/app/services/ceo-service/ceo-service.service";
import * as moment from "moment";
import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
import { DatePickerPluginInterface } from "@capacitor-community/date-picker";
const DatePicker: DatePickerPluginInterface = Plugins.DatePickerPlugin as any;
@Component({
  selector: "app-compliancereport",
  templateUrl: "./compliancereport.page.html",
  styleUrls: ["./compliancereport.page.scss"],
})
export class CompliancereportPage implements OnInit {
  sopreportForm;

  sopreportlist;

  getDate;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  currentdate = new Date().toISOString();

  checklist = [];
  reportdate = "";
  norecordsflag = false;

  constructor(
    private commonservice: AIREIService,
    private service: CeoServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reportdate = moment(this.currentdate).format("DD-MM-YYYY");
    this.sopreportForm = this.fb.group({
      pickdate: new FormControl(this.reportdate),
      shift: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  callAPI() {
    if (this.sopreportForm.valid) {
      this.getsopcompliancereport();
    } else {
      this.commonservice.presentToast("Please Select the Shift");
    }
  }

  openDateTimePicker() {
    DatePicker.present({
      mode: "date",
      format: "dd-MM-yyyy",
      date: this.reportdate,
      max: this.currentdate,
      theme: "dark",
      doneText: "Done",
      cancelText: "Cancel",
    }).then(
      (val) => {
        if (val.value) {
          this.reportdate = val.value;
          this.sopreportForm.controls.pickdate.setValue(this.reportdate);
        }
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }

  getsopcompliancereport() {
    if (this.reportdate != "") {
      this.getDate = moment(this.reportdate, "DD-MM-YYYY").format("YYYY-MM-DD");
    } else {
      this.getDate = "";
    }

    var req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      fromdate: this.getDate,
      shift: this.sopreportForm.value.shift,
    };

    console.log(req);

    this.service.getsopcompliancereportdetails(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.sopreportlist = resultdata.data;

        let eachitem = resultdata.data[0].checklist;
        let splitted = eachitem.split(",");
        let statuscount = 0;

        for (let i = 0; i < splitted.length; i++) {
          statuscount = statuscount + 1;
          this.checklist.push(statuscount + ". " + splitted[i]);
        }

        /*for (let i = 0; i < resultdata.data.length; i++) {
          let eachitem = resultdata.data[i].statusofproduction;
          let splitted = eachitem.split(",");

          let statuscount = 1;

          for (let j = 0; j < splitted.length; j++) {
            console.log(splitted[j]);

            statuscount = statuscount + j;
            this.statusofproductionlist.push(statuscount + ". " + splitted[j]);
          }
        }*/
        this.norecordsflag = false;
      } else {
        this.sopreportlist = [];
        this.norecordsflag = true;
        //this.commonservice.presentToast("No Record Found!");
      }
    });
  }

  /*showPhoto(path:any)
  {
    //console.log(path);
    this.viewer.show(path);
  }*/

  viewimage(value) {
    //console.log(value);
    this.router.navigate(["/zoomimage", { item: value }]);
  }
}
