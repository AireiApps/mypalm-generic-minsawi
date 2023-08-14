import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import {
  Platform,
  ModalController,
  NavParams,
  AlertController,
  IonSelect,
  IonContent,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";
import { RampserviceService } from "src/app/services/ramp-service/rampservice.service";
import * as moment from "moment";

import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

import { GradingVehicleSearchPage } from "src/app/grading-module/grading-vehicle-search/grading-vehicle-search.page";

@Component({
  selector: "app-ramp-edit",
  templateUrl: "./ramp-edit.page.html",
  styleUrls: ["./ramp-edit.page.scss"],
})
export class RampEditPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;

  rampeditForm;

  // Variables
  params;
  selectvehicleFlag = true;
  entervehicleFlag = false;

  gettransactionid = "";
  getvehicleid;
  getvehiclenumber = "";
  getnetweight = "";
  getdestination = "";

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private languageService: LanguageService,
    private activatedroute: ActivatedRoute,
    public modalController: ModalController,
    public vehiclemodalController: ModalController,
    private router: Router,
    private fb: FormBuilder,
    private commonservice: AIREIService,
    private service: RampserviceService,
    public navParams: NavParams
  ) {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.modalController.getTop().then((modal) => {
        if (modal != null) {
          return;
        } // Don't go back if there's a modal opened
      });
    });

    let viewform = navParams.get("item");
    this.params = JSON.parse(viewform);

    //console.log(viewform);

    this.gettransactionid = this.params.ffb_trans_id;

    this.getvehicleid = Number(this.params.vehicle_id);

    this.getvehiclenumber = this.params.vehicle_no;

    this.getnetweight = this.params.netweight;

    if (this.getnetweight == "-" || this.getnetweight == null) {
      this.getnetweight = "0";
    }

    this.getdestination = this.params.destination;

    this.rampeditForm = this.fb.group({
      txt_searchvehicle: new FormControl(this.getvehiclenumber),
      txt_vehiclenumber: new FormControl(""),
      txt_netweight: new FormControl(this.getnetweight),
    });
  }

  ngOnInit() {}

  save() {
    var get_vehicleid;
    var get_vehiclenumber;

    if (this.gettransactionid == "") {
      this.commonservice.presentToast("Something went Wrong");
      return false;
    }

    if (this.getvehicleid != 0) {
      if (this.getvehiclenumber != "") {
        get_vehicleid = this.getvehicleid;
        get_vehiclenumber = this.getvehiclenumber;
      } else {
        this.commonservice.presentToast(
          this.translate.instant("RAMPHOME.vehiclenumbermandatory")
        );
        return;
      }
    } else {
      if (
        this.rampeditForm.value.txt_vehiclenumber != 0 &&
        typeof this.rampeditForm.value.txt_vehiclenumber !== "undefined" &&
        this.rampeditForm.value.txt_vehiclenumber !== null
      ) {
        get_vehicleid = this.getvehicleid;
        get_vehiclenumber = this.rampeditForm.value.txt_vehiclenumber;
      } else {
        this.commonservice.presentToast(
          this.translate.instant("RAMPHOME.vehiclenumbermandatory")
        );
        return;
      }
    }

    if (
      this.rampeditForm.value.txt_netweight == "" ||
      this.rampeditForm.value.txt_netweight == null
    ) {
      this.commonservice.presentToast(
        this.translate.instant("RAMPEDIT.netweightmandatory")
      );
      return false;
    }

    var req = {
      userid: this.userlist.userId,
      departmentid: this.userlist.dept_id,
      designationid: this.userlist.desigId,
      millcode: this.userlist.millcode,
      acc_id: this.userlist.accId,
      dealer_id: this.userlist.dealer_id,
      supplier_acc_id: this.userlist.supplier_acc_id,
      vehicle_id: get_vehicleid,
      vehicle_no: get_vehiclenumber,
      id: Number(this.gettransactionid),
      net_weight: this.rampeditForm.value.txt_netweight,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.updateRamp(req).then((result) => {
      var resultdata: any;
      resultdata = result;

      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast(
          this.translate.instant("RAMPEDIT.rampdataupdatedsuccessfully")
        );

        this.modalController.dismiss({
          dismissed: true,
          item: "Saved",
        });
      } else {
        this.commonservice.presentToast(
          this.translate.instant("RAMPEDIT.rampdataupdatedfailed")
        );
      }
    });
  }

  backtoselect() {
    this.rampeditForm.controls.txt_searchvehicle.setValue("");
    this.rampeditForm.controls.txt_vehiclenumber.setValue("");

    this.selectvehicleFlag = true;
    this.entervehicleFlag = false;
  }

  async callmodalcontroller(type) {
    if (type == "Vehicle") {
      const vehiclemodal = await this.vehiclemodalController.create({
        component: GradingVehicleSearchPage,
        showBackdrop: true,
        backdropDismiss: false,
        cssClass: ["vehicle-modal"],
      });

      vehiclemodal.onDidDismiss().then((modeldata) => {
        let viewform = modeldata.data.data;

        //console.log("GetData --->" + viewform);

        if (viewform != "") {
          this.params = JSON.parse(viewform);

          //console.log(this.params.id);

          if (this.params.id != 0) {
            this.getvehicleid = this.params.id;
            this.getvehiclenumber = this.params.vehicle_no;

            //console.log(this.vehiclenumber);

            this.rampeditForm.controls.txt_searchvehicle.setValue(
              this.getvehiclenumber
            );
            this.rampeditForm.controls.txt_vehiclenumber.setValue("");
          } else {
            this.getvehicleid = this.params.id;
            this.getvehiclenumber = this.params.vehicle_no;

            //console.log(modeldata.data.searchtext);

            this.rampeditForm.controls.txt_searchvehicle.setValue("");

            if (modeldata.data.searchtext != "") {
              this.rampeditForm.controls.txt_vehiclenumber.setValue(
                modeldata.data.searchtext
              );
            }

            this.selectvehicleFlag = false;
            this.entervehicleFlag = true;
          }
        }
      });

      return await vehiclemodal.present();
    }
  }

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
      item: "",
    });
  }

  alphanumberFilter(event: any) {
    const reg = /^[a-zA-Z0-9\s]{0,15}$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }
}
