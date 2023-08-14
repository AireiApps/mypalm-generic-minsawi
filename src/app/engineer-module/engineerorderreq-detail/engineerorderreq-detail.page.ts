import { Component, OnInit } from '@angular/core';
import { EngineerServiceService } from 'src/app/services/engineer-service/engineer-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-engineerorderreq-detail',
  templateUrl: './engineerorderreq-detail.page.html',
  styleUrls: ['./engineerorderreq-detail.page.scss'],
})
export class EngineerorderreqDetailPage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));

  recentOrder = [];
  orderdetail;

  constructor(private service: EngineerServiceService, private route: ActivatedRoute) { 
    let orderform = this.route.snapshot.paramMap.get("item")
    this.orderdetail = JSON.parse(orderform); 
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getOrderDetails()
  }

  ionViewDidEnter() {
    this.getOrderDetails()

  }

  getOrderDetails() {
    let req = {
      "millcode": this.userlist.millcode,
      "sor_id": this.orderdetail.sor_id
    }

    this.service.getRecentStoreListDetails(req).then(result => {
      var resultdata: any;
      resultdata = result;
      // this.profileForm.reset();
      if (resultdata.httpcode == 200) {
        this.recentOrder = resultdata.data
      }
    });
  }

}
