import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { Platform, IonContent } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { MaintenanceServiceService } from "src/app/services/maintenance-serivce/maintenance-service.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
@Component({
  selector: "app-chatbot-screen",
  templateUrl: "./chatbot-screen.page.html",
  styleUrls: ["./chatbot-screen.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ChatbotScreenPage implements OnInit {
  @ViewChild("pageTop") pageTop: IonContent;
  userlist = JSON.parse(localStorage.getItem("userlist"));

  chatform;
  messages = [];
  questionset = [];
  responseArr = [];
  newMessage = "";
  sendedtext = "";
  message = "";
  welcomemsg =
    "Hi! I'm MyPalm Bot. What information are you looking for?\n Click on one of the options below or type something to start.";
  messageflag = false;
  html: SafeHtml;
  //resultdata: any;
  getcurrenttime = moment(new Date().toISOString()).format("HH:mm");
  Intents = [
    {
      tag: "greeting",
      patterns: [
        "Hi",
        "Is anyone there?",
        "Hello",
        "Good day",
        "Good Morning",
        "Hii",
        "hey there",
        "good morning",
        "good afternoon",
        "good evening",
        "good day",
        "Hey",
        "hai",
      ],
      responses: ["Hi, I am MyPalm. Do you want to list the services?"],
      questions: ["Yes", "No"],
    },
    {
      tag: "yes",
      patterns: ["YES", "YES", "1", "Yes"],
      responses: ["Choose your Module "],
      questions: [
        "Production Module",
        "Maintenance Module",
        "General Questions",
      ],
    },
    {
      tag: "no",
      patterns: ["NO", "no", "2", "No"],
      responses: ["Alright ! Please ask the question."],
    },
    {
      tag: "modules in MyPalm",
      patterns: ["modules in MyPalm", "MyPalm modules", "MyPalm module"],
      responses: [
        "There are two modules in MyPalm : Production and Maintenance module.\n Production Module \n 1. Simplifying and digitizing the production records in Press and Sterilization Station.\n2. Predicting the oil losses in press machines.\n3. Auto-retrieval of machinery running hours.\n\nMaintenance Module\n1. Corrective Maintenance\n2. Routine Preventive Maintenance\n3. Replacement Preventive Maintenance.",
      ],
    },
    {
      tag: "change the password",
      patterns: ["password", "change the password", "password", "2"],
      responses: [
        "Go to Settings and click Change Password,By giving new password you can change the password",
      ],
    },
    {
      tag: " keep records",
      patterns: [" keep records", " record", "records", "4"],
      responses: [
        "Yes, MyPalm maintains records of all data entered into it.\n  Its user-friendly interface allows easy search, retrieval and access to records as needed..",
      ],
    },
    {
      tag: "add new user",
      patterns: ["add new user", "new user", "5"],
      responses: [
        "Go to Master data update and click User master in the drop down\n By clicking add new user we can able to add new user.",
      ],
    },
    {
      tag: "add new station",
      patterns: ["add new station", "station", "6"],
      responses: [
        "Go to Master data update and click Station master in the drop down\n By clcicking add new station we can able to add new station.",
      ],
    },
    {
      tag: "verification access",
      patterns: [" verification access", "verification", "7"],
      responses: [
        "It is for the user to give the verification access to either Foreman & Engineer or Foreman only.\n This verification access is to verify the Corrective Maintenance and Replacement Preventive Maintenance.\n The assigned job is done by the Fitter or Chargeman.\n Re-login into the system to see the change of settings. ",
      ],
    },
    {
      tag: "generate QR code ",
      patterns: ["generate QR code ", "QR code", "8"],
      responses: [
        "Yes, MyPalm maintains records of all data entered into it.\n Its user-friendly interface allows easy search, retrieval and access to records as needed.",
      ],
    },
    {
      tag: "Where to use the generated QR code ",
      patterns: [
        "Where  use the generated QR code ",
        " use QR code",
        " QR",
        "9",
      ],
      responses: [
        "Any users can scan the QR code via their mobile app under Scanner .\n Users can view the Maintenance History of a machinery including Maintenance Timeline.",
      ],
    },
    {
      tag: "parameter threshold ",
      patterns: ["parameter threshold ", "threshold", "10"],
      responses: [
        "Parameter threshold is to set the minimum and maximum value for certain parameters.\n The values will be used to show alert in MyPalm system.\nFor example, if the oil losses record keyed in by users exceeds the maximum value set, an alert will pop up to remind.\n the users that the value has been exceeding the threshold value.",
      ],
    },
    {
      tag: "weekly report  ",
      patterns: ["weekly report  ", "weekly data", "11"],
      responses: [
        "Weekly report displays the summary of maintenance and production processes in a week.\n The report will be automatically generated at the end of each week.\n User is also able to view the weekly report of previous weeks.",
      ],
    },
    {
      tag: "Scheduling",
      patterns: [" Scheduling ", "What is Scheduling", "12"],
      responses: [
        "MyPalm's scheduling feature allows users to view maintenance work that has been planned and set according to date and time. ",
      ],
    },
    {
      tag: "generate QR code for the machinery",
      patterns: [
        " generate QR code for the machinery",
        " QR code machinery",
        "13",
      ],
      responses: [
        "Go to Machinery QR code, By choosing station and machinery we can generate the QR code the selected machinery",
      ],
    },
    {
      tag: "use the generated QR code",
      patterns: [
        "use the generated QR code",
        "use generated QR code",
        "generated QR code use",
        "QR code use",
        "QRcode use",
      ],
      responses: [
        "Any users can scan the QR code via their mobile app under <b>Scanner</b>. Users can view the Maintenance History of a machinery including Maintenance Timeline",
      ],
    },
    {
      tag: "Foreman ",
      patterns: ["Foreman ", "responsibilities  Foreman", "14"],
      responses: [
        "Below are the list of task and responsibilities of an Foreman in MyPalm system\n1. Create Corrective Maintenance notification\n 2. Update Corrective Maintenance notification reported by Engineer and Supervisor.\n3. Assign Corrective Maintenance and Preventive Maintenance records to fitter and chargeman\n4. Do verification for Corrective Maintenance and Preventive Maintenance records \n5. View Maintenance reports via mobile application.",
      ],
    },
    {
      tag: "Engineer  ",
      patterns: ["Engineer  ", "responsibilities  Engineer ", "15"],
      responses: [
        "Below are the list of task and responsibilities of an Engineer in MyPalm system \n1. Create Corrective Maintenance notification \n2. Do verification for Corrective Maintenance and Preventive Maintenance records \n3. Do acknowledgement for Corrective Maintenance and Preventive Maintenance records \n4. Master data update:user list, station list, machinery list with parts details (with Routine Preventive Maintenance schedule & Replacement Preventive Maintenance maximum running hours settings). \n5. View production and maintenance reports via both mobile and web application.",
      ],
    },
    {
      tag: "Fitter  ",
      patterns: [
        "Fitter  ",
        "responsibilities Fitter ",
        "responsibilities of Fitter",
        "Fitter in MyPalm",
      ],
      responses: [
        "Fitter accepts and carry out the work order assigned to them",
      ],
    },
    {
      tag: "Chargeman   ",
      patterns: ["Chargeman", "responsibilities Chargeman  ", "17"],
      responses: [
        "Chargeman accepts and carry out the work order assigned to them",
      ],
    },
    {
      tag: "Supervisor    ",
      patterns: [
        "Supervisor",
        "responsibilities Supervisor",
        "responsibilities of Supervisor",
      ],
      responses: [
        "Below are the list of task and responsibilities of a Supervisor in MyPalm system\n1. Start-stop production & machineries\n2. Report mill breakdown\n3. Create Corrective Maintenance notification\n4. View Maintenance Report\n5. View Production Report",
      ],
    },
    {
      tag: "change mill name",
      patterns: ["change mill name", "name", "18"],
      responses: [
        "Go to Settings and click Mill Settings,you can change mill name by clicking mill name tab",
      ],
    },
    {
      tag: "Production Module ",
      patterns: ["Production", "Production Module"],
      responses: ["Choose the Module:"],
      questions: [
        "Sterilization",
        "Pressing",
        "Oil Losses",
        "Mill Production and Breakdown",
      ],
    },
    {
      tag: "Mill Production and Breakdown",
      patterns: ["Mill Production and Breakdown", "Mill Production"],
      responses: ["Select one :"],
      questions: [
        "How to start production?",
        "How to stop production?",
        "How to turn off the machine?",
        "How to turn on the machine?",
        "How to report mill breakdown?",
        "How to report machinery breakdown?",
      ],
    },
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private maintenanceservice: MaintenanceServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.chatform = this.fb.group({
      txt_message: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getMessages("yes");
  }

  getMessages(value) {
    this.sendedtext = value;
    this.messageflag = false;
    let text = "";
    if (value == "") {
      text = this.newMessage;
    } else {
      text = value;
    }
    this.maintenanceservice.getChatResponse(text).then((result) => {
      let resultdata: any;
      resultdata = result;
      this.responseArr.push(resultdata);
      //this.html = this.sanitizer.bypassSecurityTrustHtml(this.resultdata);
      const objects = {
        question: text,
        time: moment(new Date().toISOString()).format("HH:mm"),
      };
      this.questionset.push(objects);
      let eachArr = [];
      let eachreq;
      for (let i = 0; i < this.responseArr.length; i++) {
        let eachitem = this.responseArr[i];
        let item = this.questionset[i];
        if (i != 0) {
          eachreq = {
            responses: eachitem.responses,
            buttons: eachitem.buttons,
            time: eachitem.time,
            question: item.question,
            sendedtime: item.time,
          };
        } else {
          eachreq = {
            responses: eachitem.responses,
            buttons: eachitem.buttons,
            time: eachitem.time,
            question: "",
            sendedtime: "",
          };
        }

        eachArr.push(eachreq);
      }

      this.responseArr = eachArr;
      this.newMessage = "";
      console.log("Response:", this.responseArr);
      this.pageTop.scrollToBottom();
    });
  }

  messagehandler(value) {
    this.sendedtext = value;
    this.messageflag = false;
    let text = "";
    if (value == "") {
      text = this.newMessage;
    } else {
      text = value;
    }
    for (let i = 0; i < this.Intents.length; i++) {
      for (let j = 0; j < this.Intents[i].patterns.length; j++) {
        if (this.Intents[i].patterns[j] == text) {
          const objects = {
            question: text,
            time: moment(new Date().toISOString()).format("HH:mm"),
            message: this.Intents[i].responses,
            responsearr: this.Intents[i].questions,
          };
          this.responseArr.push(objects);
        } else {
          console.log("No response");
        }
      }
    }
    //this.messageflag = true;
  }
}
