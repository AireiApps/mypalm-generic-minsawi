import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";

import { Plugins } from "@capacitor/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AIREIService } from "src/app/api/api.service";
import { ActivatedRoute } from "@angular/router";
import { DriverServiceService } from "src/app/services/driver-service/driver-service.service";
import * as moment from "moment";
import { Router } from "@angular/router";

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: "app-googlemap",
  templateUrl: "./googlemap.page.html",
  styleUrls: ["./googlemap.page.scss"],
})
export class GooglemapPage implements OnInit {
  userlist = JSON.parse(localStorage.getItem("userlist"));
  detailValue;
  name;
  newPosition;
  screentype;
  roleid;
  additional = "";
  trans_id = "";
  vechicle_no = "";

  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  user = null;

  @ViewChild("map") mapElement: ElementRef;
  map: any;
  markers = [];

  isTracking = false;
  watch = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

  milllatLng;

  icon_ffb = {
    url: "assets/icon/start.png", // image url
    scaledSize: new google.maps.Size(32, 42), // scaled size
  };

  icon_mill = {
    url: "assets/icon/end.png", // image url
    scaledSize: new google.maps.Size(32, 42), // scaled size
  };

  icon_truck = {
    url: "assets/icon/trucklocation.png", // image url
    scaledSize: new google.maps.Size(32, 42), // scaled size
  };

  constructor(
    private service: DriverServiceService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private commonservice: AIREIService,
    private router: Router
  ) {
    //this.anonLogin();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.name = this.userlist.department;

    this.milllatLng = new google.maps.LatLng(
      this.userlist.mill_lat,
      this.userlist.mill_lang
    );

    const detailform = this.route.snapshot.paramMap.get("item");
    this.detailValue = JSON.parse(detailform);

    if (this.detailValue.ffb_trans_id) {
      this.trans_id = this.detailValue.ffb_trans_id;
    }

    if (this.detailValue.vehicle_no) {
      this.vechicle_no = this.detailValue.vehicle_no;
    }

    this.loadMap();
  }

  ionViewWillEnter() {}

  loadMap() {
    let mapOptions = {
      center: this.milllatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false,
      linksControl: false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const markermill = {
      position: this.milllatLng,
      map: this.map,
      icon: this.icon_mill,
    };
    new google.maps.Marker(markermill);

    this.anonLogin();
    this.startTracking();
    this.getCurrentPosition();
  }

  anonLogin() {
    this.afAuth.signInAnonymously().then((res) => {
      console.log(res);

      this.user = res;

      console.log(this.user);

      let newtrans = String(this.trans_id);
      let newvechicle_no = String(this.vechicle_no);

      this.locationsCollection = this.afs.collection(
        `locations/${newtrans}/vechicle/${newvechicle_no}/track`,
        (ref) => ref.limit(1).orderBy("timestamp", "desc")
      );

      this.locations = this.locationsCollection.snapshotChanges().pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

      this.locations.subscribe((locations) => {
        console.log("Updated Locations: ", locations);
        this.updateMap(locations);
      });
    });
  }

  startTracking() {
    this.isTracking = true;

    this.watch = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        //console.log('New Position: ', position);

        if (position) {
          this.zone.run(() => {
            this.newPosition =
              position.coords.latitude + "," + position.coords.longitude;
          });

          let dateTime = moment().format("DD-MM-YYYY HH:mm:ss");

          this.addNewLocation(
            position.coords.latitude,
            position.coords.longitude,
            dateTime
          );
        }
      }
    );
  }

  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
  }

  addNewLocation(lat, lng, timestamp) {
    this.locationsCollection.add({
      lat,
      lng,
      timestamp,
    });

    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(15);

    let req = {
      ffbtransactionid: this.trans_id,
      lat: lat,
      lang: lng,
    };
    this.service.ourserverLatLng(req);
  }

  updateMap(locations) {
    this.markers.map((marker) => marker.setMap(null));
    this.markers = [];

    for (let loc of locations) {
      let latLng = new google.maps.LatLng(loc.lat, loc.lng);

      let marker = new google.maps.Marker({
        position: latLng,
        icon: this.icon_truck,
        map: this.map,
      });

      this.markers.push(marker);
    }
  }

  async getCurrentPosition() {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
      (coordinates) => {
        let latLng = new google.maps.LatLng(
          coordinates.coords.latitude,
          coordinates.coords.longitude
        );

        this.startNavigating(latLng);
      }
    );
  }

  startNavigating(currentlatLng) {
    this.directionsDisplay.setMap(this.map);

    this.directionsService.route(
      {
        origin: this.milllatLng,
        destination: currentlatLng,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsDisplay.setDirections(response);

          if (this.screentype == "driver") {
            this.startTracking();
          }
        } else {
          window.alert("Direction Request Failed due to " + status);
        }
      }
    );
  }

  getHistoryPolyLine() {
    // var req = {
    //   ffbtransid: this.detailValue.ffbTrans_Id,
    //   millcode: this.userlist.millcode
    // };

    var req = {
      ffbtransid: this.trans_id,
      millcode: this.userlist.millcode,
    };

    //console.log(req);

    this.service.getLocationHistoryPath(req).then((result) => {
      var resultdata: any;
      resultdata = result;
      let path = [];
      if (resultdata.httpcode == 200) {
        //console.log(resultdata.data[0]);

        for (var i = 0; i < resultdata.data.length; i++) {
          //console.log(i + resultdata.data[i]);

          let eachdata = resultdata.data[i];

          let eachreq = {
            lat: eachdata.lat,
            lng: eachdata.lang,
          };

          //console.log("Polyline" + eachreq);

          path.push(eachreq);
        }
        console.log("Map Path: " + path);
        this.updateMapPolyLine(path);
      } else {
        //  this.commonservice.presentToast('No Record Found!')
      }
    });
  }

  updateMapPolyLine(newpath) {
    console.log(newpath);
    var polyline = new google.maps.Polyline({
      path: newpath,
      strokeColor: "#AA00FF",
      strokeOpacity: 0.7,
      strokeWeight: 4,
      geodesic: true,
    });
    polyline.setMap(this.map);
  }

  btn_recenter() {
    this.startTracking();
  }

  back() {
    this.router.navigate(["/tabs/history"]);
  }
}
