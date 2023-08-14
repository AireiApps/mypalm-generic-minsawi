import { Component, OnInit } from '@angular/core';
import { GradingserviceService } from 'src/app/services/grading-service/gradingservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { TranslateService } from "@ngx-translate/core";

import {
  ModalController,NavParams
} from "@ionic/angular";
@Component({
  selector: 'app-grading-update-screen',
  templateUrl: './grading-update-screen.page.html',
  styleUrls: ['./grading-update-screen.page.scss'],
})
export class GradingUpdateScreenPage implements OnInit {
  
  userlist = JSON.parse(localStorage.getItem("userlist"));
  gradingForm;
  gradingdetails;
  ticket = '';
  constructor(
    private service: GradingserviceService,
    private fb: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    private translate: TranslateService,
    private commonservice: AIREIService,
    private route: ActivatedRoute) 
    {
      //let gradform = this.route.snapshot.paramMap.get("item")
      this.gradingdetails = navParams.get("item");
      this.gradingForm = this.fb.group({
        txt_overdue: new FormControl("", Validators.required),
      });
      console.log(this.gradingdetails)
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {}

  ionViewDidEnter() {}

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,1})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }
  checkData() {
  
    if (
      this.gradingForm.value.txt_overdue != "" &&
      typeof this.gradingForm.value.txt_overdue !== "undefined" &&
      this.gradingForm.value.txt_overdue !== null
    ) {
      if (Number.isInteger(this.gradingForm.value.txt_overdue)) {
        this.gradingForm.controls.txt_overdue.setValue(
          Number(this.gradingForm.value.txt_overdue).toFixed(1)
        );
      }
    }
  }
  btn_update() { 
    if (this.gradingForm.value.txt_overdue == "") {
      this.commonservice.presentToast('Overdue is Mandatory');
      return;
    }
    if (
      this.gradingForm.value.txt_overdue > 100
    ){
      this.commonservice.presentToast(
        this.translate.instant("GRADINGHOME.percentagevalidation")
      );
      return;
    }
    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      overdue: this.gradingForm.value.txt_overdue,
      ticket: this.gradingdetails.TICKET
    };
    console.log(req)
   
    this.service.updateffb(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast("Update Successfully!");
        this.btn_back();
      } else {
        this.commonservice.presentToast("Update Failed!");
        this.btn_back();
      }
    });
}
btn_back() {
  this.modalController.dismiss({
    dismissed: true,
    searchtext: "",
    data: "",
  });
}
}
