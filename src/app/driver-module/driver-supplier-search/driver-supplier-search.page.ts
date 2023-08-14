import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { IonSearchbar } from "@ionic/angular";
import { DriverServiceService } from "src/app/services/driver-service/driver-service.service";
import { Router } from "@angular/router";
import { ModalController, NavParams } from "@ionic/angular";
import { LanguageService } from "src/app/services/language-service/language.service";

@Component({
  selector: "app-driver-supplier-search",
  templateUrl: "./driver-supplier-search.page.html",
  styleUrls: ["./driver-supplier-search.page.scss"],
})
export class DriverSupplierSearchPage implements OnInit {
  @ViewChild("search", { static: false }) search: IonSearchbar;

  userlist = JSON.parse(localStorage.getItem("userlist"));

  suppliersearchForm;

  supplierArr = [];
  searching: Boolean = false;
  searchTerm: string = "";
  size;
  totalpage;
  responsedata;

  norecordsflag = false;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    private driverservice: DriverServiceService,
    private router: Router
  ) {
    this.suppliersearchForm = this.fb.group({
      select_searchby: new FormControl(""),
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
    });

    this.loadData(true, "0", this.searching);
  }

  loadData(pagerefresh: Boolean, pagenum: string, search: Boolean) {
    let searchString = "";

    if (pagerefresh == true) {
      this.supplierArr = [];
    } else {
    }

    if (this.searchTerm != "") {
      searchString = this.searchTerm;
    }

    if (search == true) {
      if (pagerefresh == true) {
        this.supplierArr = [];
      }
      searchString = this.searchTerm;
    } else {
      if (pagerefresh == true) {
        this.supplierArr = [];
      }
    }

    searchString = this.searchTerm;

    const req = {
      user_id: this.userlist.userId,
      millcode: this.userlist.millcode,
      dept_id: this.userlist.dept_id,
      design_id: this.userlist.desigId,
      searchtext: searchString,
      page: parseInt(pagenum) + 1,
      language: this.languageService.selected,
    };

    console.log(req);

    this.driverservice.getSupplierList(req).then((result) => {
      let resultdata: any;
      resultdata = result;
      this.responsedata = resultdata;

      this.size = parseInt(resultdata.size);

      this.totalpage = resultdata.total_page * this.size;

      if (search == true) {
        if (pagerefresh == true) {
          this.supplierArr = [];
        } else {
        }
      } else {
        if (pagerefresh == true) {
          this.supplierArr = [];
        }
      }

      if (resultdata.httpcode == 200) {
        if (resultdata.supplierData.length > 0) {
          for (var i = 0; i < resultdata.supplierData.length; i++) {
            this.supplierArr.push(resultdata.supplierData[i]);
          }

          this.norecordsflag = false;
        }
      } else {
        this.norecordsflag = true;
      }
    });
  }

  onChangeSearchBy() {
    this.search.value = "";
  }

  _ionchange(event) {
    var val = event.detail.value;

    if (val && val.trim() != "") {
      this.searching = true;

      this.searchTerm = val;

      this.loadData(true, "0", this.searching);
    } else {
      this.searching = false;

      this.searchTerm = "";

      this.loadData(true, "0", this.searching);
    }
  }

  getvalue(getitem) {
    this.modalController.dismiss({
      dismissed: true,
      searchtext: this.searchTerm,
      data: JSON.stringify(getitem),
    });
  }

  pagination(event) {
    setTimeout(() => {
      if (this.supplierArr.length == this.totalpage / this.size) {
        event.target.complete();
        return;
      }

      event.target.complete();

      /*console.log(this.totalpage);
      console.log(this.supplierArr.length);
      console.log(this.supplierArr.length / this.size);*/

      var z = Math.ceil(this.supplierArr.length / this.size);

      if (this.supplierArr.length < this.totalpage) {
        this.loadData(false, String(z), this.searching);
      }
    }, 500);
  }

  gettextColor(status) {
    let color;

    if (status == 1) {
      color = "#006426";
    } else if (status == 0) {
      color = "#b91818";
    } else {
      color = "#000000";
    }
    return color;
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      searchtext: "",
      data: "",
    });
  }
}
