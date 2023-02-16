import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";

import {
  ModalController,
  AlertController,
  Platform,
  Animation,
  AnimationController,
} from "@ionic/angular";

import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";
import { AuthGuardService } from "src/app/services/authguard/auth-guard.service";
const { PushNotifications } = Plugins;

@Component({
  selector: "app-maintenance-preventivemaintenance-category",
  templateUrl: "./maintenance-preventivemaintenance-category.page.html",
  styleUrls: ["./maintenance-preventivemaintenance-category.page.scss"],
})
export class MaintenancePreventivemaintenanceCategoryPage implements OnInit {
  @ViewChild("myElementRef", { static: false }) myElementRef: ElementRef;

  userlist = JSON.parse(localStorage.getItem("userlist"));
  usermillcode = this.userlist.millcode;
  userdepartment = this.userlist.department;
  userdepartmentid = this.userlist.dept_id;
  userdesignation = this.userlist.desigId;

  count = 0;

  categoryArr = [
    [
      {
        title: "Routine",
        subtitle: "Preventive Maintenance",
        name: "Routine Preventive Maintenance",
        path: "/maintenance-routine",
        imgpath: "../../assets/img/checklist.png",
      },
    ],
    [
      {
        title: "Replacement",
        subtitle: "Preventive Maintenance",
        name: "Replacement Preventive Maintenance",
        path: "/maintenance-replacement",
        imgpath: "../../assets/img/preventivemaintenance.png",
      },
    ],
  ];

  constructor(
    private zone: NgZone,
    private router: Router,
    private notifi: AuthGuardService,
    private commonservice: AIREIService,
    private animationCtrl: AnimationController,
    private service: MaintenanceServiceService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(this.myElementRef.nativeElement)
      .duration(1000)
      .fromTo("opacity", "0", "1");

    animation.play();

    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  ionViewDidEnter() {
    PushNotifications.removeAllDeliveredNotifications();

    this.count = parseInt(localStorage.getItem("badge_count"));
    this.notifi.updateNotification();
    this.updateNotification();
    this.getLiveNotification();
  }

  btn_notification() {
    localStorage.setItem("badge_count", "0");
    this.router.navigate(["/segregatenotification"]);
  }

  updateNotification() {
    this.zone.run(() => {
      this.count = parseInt(localStorage.getItem("badge_count"));
    });
  }

  getLiveNotification() {
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {
        // alert('Push received: ' + JSON.stringify(notification));
        this.updateNotification();
      }
    );
  }

  btn_Action(item) {
    this.router.navigate([item.path]);
  }
}
