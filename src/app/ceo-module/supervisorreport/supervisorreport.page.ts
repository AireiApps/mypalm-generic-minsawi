import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-supervisorreport',
  templateUrl: './supervisorreport.page.html',
  styleUrls: ['./supervisorreport.page.scss'],
})
export class SupervisorreportPage implements OnInit {

  itemsArr = [
    [      
      {
        title: "Mill Report",
        path: "/supervisormillreport",
        imgpath: "../../assets/img/millreport.png",
      },
      {
        title: "Production Report",
        path: "/supervisorproductionreport",
        imgpath: "../../assets/img/report.png",
      }
    ]
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  btn_Action(item) {
    this.router.navigate([item.path]);
  }

}
