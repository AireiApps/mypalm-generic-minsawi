import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AIREIService } from 'src/app/api/api.service';

@Component({
  selector: 'app-productiontimelinehome',
  templateUrl: './productiontimelinehome.page.html',
  styleUrls: ['./productiontimelinehome.page.scss'],
})
export class ProductiontimelinehomePage implements OnInit {

  userlist = JSON.parse(localStorage.getItem("userlist"));

  constructor(private router: Router, private zone: NgZone, private commonservice: AIREIService) { }

  ngOnInit() {
  }

  viewproductiontimereport() {    
    this.router.navigate(["/mmslogreport"]);
  }

  communication() {    
    this.router.navigate(["/ceocommunication"]);
  }
}
