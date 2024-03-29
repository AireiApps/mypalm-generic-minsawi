import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { appsettings } from 'src/app/appsettings';
import { HttpserviceService } from 'src/app/services/httpservice/httpservice.service';

@Component({
  selector: 'app-store-statusupdate',
  templateUrl: './store-statusupdate.page.html',
  styleUrls: ['./store-statusupdate.page.scss'],
})
export class StoreStatusupdatePage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  user_id = this.userlist.userId;  
  //mill_name = appsettings.MILL_NAME

  mill_name = this.userlist.millname;
  baseurl = this.userlist.report_url;
  
  weburl;

  constructor(private router: Router, private httpservice: HttpserviceService, private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getUrl(); 
  }

  ionViewWillEnter()
  {
    this.getUrl(); 
  }

  getUrl()
  {

    let formatedurl = this.baseurl + "/index.php/Store_order_request_mobile?user_id=" + this.user_id;

    console.log(formatedurl)

    this.weburl = formatedurl; 
  }
}
