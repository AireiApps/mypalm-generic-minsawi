import { Component, OnInit } from "@angular/core";
import { AIREIService } from "src/app/api/api.service";
import { SupervisorService } from "src/app/services/supervisor-service/supervisor.service";
import { Router } from "@angular/router";
import { ModalController, NavParams, IonSlides } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-pressingsterilizerstation-image-slider",
  templateUrl: "./pressingsterilizerstation-image-slider.page.html",
  styleUrls: ["./pressingsterilizerstation-image-slider.page.scss"],
})
export class PressingsterilizerstationImageSliderPage implements OnInit {
  levelimages = [];
  digestorimages = [];
  temperatureimages = [];

  fruittypeimages = [];
  p1images = [];
  p3images = [];

  imagesArr = [];

  constructor(
    private translate: TranslateService,
    public modalController: ModalController,
    public navParams: NavParams,
    private router: Router,
    private supervisorservice: SupervisorService
  ) {
    let fromparams = navParams.get("from");

    if (fromparams == "Press") {
      let levelparams = navParams.get("levelitem");
      let digestorparams = navParams.get("digestoritem");
      let temperatureparams = navParams.get("temperatureitem");

      console.log(
        levelparams + "\n" + digestorparams + "\n" + temperatureparams
      );

      if (levelparams.length > 0) {
        this.levelimages = levelparams.split("~");
      }

      if (digestorparams.length > 0) {
        this.digestorimages = digestorparams.split("~");
      }

      if (temperatureparams.length > 0) {
        this.temperatureimages = temperatureparams.split("~");
      }

      for (let i = 0; i < this.levelimages.length; i++) {
        let eachitem = this.levelimages[i];
        let eachreq = {
          image: eachitem,
          title: this.translate.instant("IMAGESLIDER.levelimage") + (i + 1),
        };

        this.imagesArr.push(eachreq);
      }

      for (let i = 0; i < this.digestorimages.length; i++) {
        let eachitem = this.digestorimages[i];
        let eachreq = {
          image: eachitem,
          title: this.translate.instant("IMAGESLIDER.digestorimage") + (i + 1),
        };

        this.imagesArr.push(eachreq);
      }

      for (let i = 0; i < this.temperatureimages.length; i++) {
        let eachitem = this.temperatureimages[i];
        let eachreq = {
          image: eachitem,
          title:  this.translate.instant("IMAGESLIDER.temperatureimage") + (i + 1),
        };

        this.imagesArr.push(eachreq);
      }
    }

    if (fromparams == "Sterilisation") {
      let fruittypeparams = navParams.get("fruitypeitem");
      let p1params = navParams.get("p1item");
      let p3params = navParams.get("p3item");

      console.log(fruittypeparams + "\n" + p1params + "\n" + p3params);

      if (fruittypeparams.length > 0) {
        this.fruittypeimages = fruittypeparams.split("~");
      }

      if (p1params.length > 0) {
        this.p1images = p1params.split("~");
      }

      if (p3params.length > 0) {
        this.p3images = p3params.split("~");
      }

      for (let i = 0; i < this.fruittypeimages.length; i++) {
        let eachitem = this.fruittypeimages[i];
        let eachreq = {
          image: eachitem,
          title: this.translate.instant("IMAGESLIDER.fruittypeimage") + (i + 1),
        };

        this.imagesArr.push(eachreq);
      }

      for (let i = 0; i < this.p1images.length; i++) {
        let eachitem = this.p1images[i];
        let eachreq = {
          image: eachitem,
          title: this.translate.instant("IMAGESLIDER.p1image") + (i + 1),
        };

        this.imagesArr.push(eachreq);
      }

      for (let i = 0; i < this.p3images.length; i++) {
        let eachitem = this.p3images[i];
        let eachreq = {
          image: eachitem,
          title: this.translate.instant("IMAGESLIDER.p3image") + (i + 1),
        };

        this.imagesArr.push(eachreq);
      }
    }

    console.log(this.imagesArr);
  }

  ngOnInit() {}

  slideOpts = {
    centeredSlides: true,
    autoplay: {
      disableOnInteraction: true,
    },
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
      item: [],
    });
  }
}
