// tslint:disable-next-line: triple-equals
// tslint:disable-next-line: use-lifecycle-interface

import { Component, OnInit, NgZone } from "@angular/core";
import { HttpserviceService } from "../services/httpservice/httpservice.service";
import "rxjs/add/observable/interval";
import { Observable } from "rxjs";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  designationid = this.userlist.desigId;
  departmentId = 1;
  constructor(private httpservice: HttpserviceService, private zone: NgZone) {
    // Observable.interval(10000)
    //   .subscribe((val) => {  });
    // this.zone.runOutsideAngular(() => {
    //   setInterval(() => { this.httpservice.getContacts(); }, 15 * 60 * 1000);
    // });
    // this.zone.runOutsideAngular(() => {
    //   setInterval(() => { this.httpservice.getPermissonContacts(); }, 1000);
    // });
  }

  ngOnInit() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.departmentId = this.userlist.dept_id;
  }

  ionViewDidEnter() {
    this.departmentId = this.userlist.dept_id;
  }

  getTabCheck(currentId) {
    // tslint:disable-next-line: triple-equals
    if (this.departmentId == currentId) {
      return true;
    } else {
      return false;
    }
  }
}
