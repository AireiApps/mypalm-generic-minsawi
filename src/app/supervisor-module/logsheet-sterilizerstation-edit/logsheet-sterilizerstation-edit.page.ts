import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { AIREIService } from "src/app/api/api.service";
import { AlertController } from "@ionic/angular";
import { SupervisorService } from "../../services/supervisor-service/supervisor.service";
import {
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/services/language-service/language.service";

@Component({
  selector: 'app-logsheet-sterilizerstation-edit',
  templateUrl: './logsheet-sterilizerstation-edit.page.html',
  styleUrls: ['./logsheet-sterilizerstation-edit.page.scss'],
})
export class LogsheetSterilizerstationEditPage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));
  
  departmentid = this.userlist.dept_id;
  
  sterilizerstationlogsheetForm;

  currentdate = new Date().toISOString();

  getDate;
  showDate;

  reportdate="";
  reportid;  
  status;

  norecordsflag = false;
  
  logsheetArr = [];

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private route: ActivatedRoute, private screenOrientation: ScreenOrientation, private fb: FormBuilder, private alertController: AlertController, private commonservice: AIREIService, private service: SupervisorService)
  {
    this.reportdate = this.route.snapshot.paramMap.get("reportdate");
    
    if(this.reportdate=="")
    {
      this.reportdate = this.currentdate;
    }

    this.showDate = moment(this.reportdate).format("DD MMM YYYY");

    this.reportid = this.route.snapshot.paramMap.get("reportid");
    this.status = this.route.snapshot.paramMap.get("status");    
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getreport();
  }

  ngOnDestroy() {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
  }

  getreport() {
    this.getDate = moment(this.reportdate).format("YYYY-MM-DD");

    var req = {
      userid: this.userlist.userId,
      millcode: this.userlist.millcode,
      Fromdate: this.getDate,
      language: this.languageService.selected,
    };

    console.log(req);

    this.service.getlogsheetsterilizationstation(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.logsheetArr = resultdata.data; 
        this.norecordsflag = false;                         
      } else {
        this.logsheetArr = [];     
        this.norecordsflag = true;   
      }
    });   
  }

  remarksalert()
  {
    this.alertController
        .create({
          header: this.translate.instant("PRESSSTATIONLOGSHEET.enterremark"),
          cssClass:'managerdashboardmessage',
          backdropDismiss: false,
          inputs: [
            {
              name: 'reason',
              type: 'textarea',              
              cssClass: 'alertinput',              
              placeholder: this.translate.instant("PRESSSTATIONLOGSHEET.remark")
              
            }            
          ],      
          buttons: [
            {
              text: this.translate.instant("GENERALBUTTON.cancelbutton"),
              role: "cancel",         
              handler: (cancel) => {
                //console.log("Confirm Cancel");
              },
            },
            {
              text: this.translate.instant("GENERALBUTTON.okay"),
              handler: (data: any) => {                
                if(data.reason!='')
                {
                  this.updateremarks(data.reason);              
                }else{
                  return false;
                }
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
  }

  updateremarks(getremarks) {
    
    var req;

    if(this.departmentid == 4)
    {
      req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        id: Number(this.reportid),
        type: this.status,
        supervisorremarks: getremarks,   
        language: this.languageService.selected,     
      };
    }else{
      req = {
        userid: this.userlist.userId,
        millcode: this.userlist.millcode,
        id: Number(this.reportid),
        type: this.status,        
        engineerremarks: getremarks,
        language: this.languageService.selected,
      };
    }   
    console.log(req);

    this.service.updatenotificationremarks(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      if (resultdata.httpcode == 200) {
        this.commonservice.presentToast(this.translate.instant("PRESSSTATIONLOGSHEET.remarkssuccess"));
        this.getreport();                                         
      } else {                 
        this.commonservice.presentToast(this.translate.instant("PRESSSTATIONLOGSHEET.remarksfailed"));
      }
    });   
  }
}
