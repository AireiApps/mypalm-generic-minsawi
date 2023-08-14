import { Component, OnInit } from '@angular/core';
import { CeoServiceService } from 'src/app/services/ceo-service/ceo-service.service';
import { Router } from "@angular/router";
import { AIREIService } from "src/app/api/api.service";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ImageUploadService } from 'src/app/services/imageupload-service/imageupload';

@Component({
  selector: 'app-ceocommunication',
  templateUrl: './ceocommunication.page.html',
  styleUrls: ['./ceocommunication.page.scss'],
})
export class CeocommunicationPage implements OnInit {
    
  userlist = JSON.parse(localStorage.getItem("userlist"));

  imagePaths = {
    communication_path: "",
  };

  communicationForm;

  constructor(private router: Router, private fb: FormBuilder, private commonservice: AIREIService, private imgUpload: ImageUploadService, private service: CeoServiceService) { 
    this.communicationForm = this.fb.group({
      taComments: new FormControl('', Validators.required),
      img1_path: new FormControl("")
    });
  }

  ngOnInit() {
  }

  ImageUpload() {    
    var areq = "communication";
    this.imgUpload.ImageUploadSupervisor(areq).then(
      (result) => {
        var resultdata: any;
        resultdata = result;

        resultdata = JSON.parse(resultdata.response);

        if (resultdata.httpcode == 200) {
          //this.imgePaths.mpob_path = resultdata.data.uploaded_path;
          // vs pathsa
          this.imagePaths.communication_path = resultdata.data.uploaded_path;
          
          this.commonservice.presentToast("Image Added Successfully!");
        } else {
          this.commonservice.presentToast("Image Added Failed!");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  btn_save()
  {
    if (this.communicationForm.valid) {

      var req = {
        user_id: this.userlist.userId,
        millcode: this.userlist.millcode,
        image_location : this.imagePaths.communication_path,
        comments : this.communicationForm.value.taComments
      };

      this.service.saveCommunication(req).then((result) => {
        var resultdata: any;
        resultdata = result;
        if (resultdata.httpcode == 200) {

          this.communicationForm.reset();
          this.imagePaths.communication_path='';
          
          this.commonservice.presentToast("Saved Successfully!");
        } else {
          this.commonservice.presentToast("Saved Failed!");
        }        
      });

    }else{
      this.commonservice.presentToast('Comment(s) are Mandatory...')
    }
  }

}
