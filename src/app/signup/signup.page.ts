import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  FormGroup,
} from "@angular/forms";
import { AIREIService } from "src/app/api/api.service";
import { Router } from "@angular/router";
import { LanguageService } from "src/app/services/language-service/language.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  signupForm;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private service: AIREIService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      emailid: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  btn_signup() {
    if (this.signupForm.valid) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(this.signupForm.value.emailid)) {
        this.service.presentToast("Invalid Email ID");
      } else {
        const req = {
          username: this.signupForm.value.username,
          password: this.signupForm.value.password,
          emailid: this.signupForm.value.emailid,
          language: this.languageService.selected,
        };

        //console.log(req);

        this.service.signup(req).then((result) => {
          var resultdata: any;
          resultdata = result;

          if (resultdata.httpcode == 200) {
            this.service.presentToast("User Created Successfully");

            this.router.navigate(["/login"]);
          } else {
            this.service.presentToast("User Creation Failed");
          }
        });
      }
    } else {
      this.service.presentToast("Please Fill the Form");
    }
  }
}
