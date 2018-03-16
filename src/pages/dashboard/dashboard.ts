
import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular'
import { IonicPage, ModalController, Platform, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { BloodbanksPage } from '../bloodbanks/bloodbanks';
import { AddcontactsPage } from '../addcontacts/addcontacts';
import { UserData } from '../../providers/userdata';
import { Toolbox } from '../../providers/toolbox';
import {Http,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from 'ionic-native';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [ UserData ]
})
export class DashboardPage {
authkey:string = "175066AfkBDqjLjK6e59be06c7";
options:any;
currentPos:any;
contactnumber:any;
data_latitude:any;
data_longitude:any;
mobiles:string;
message:string;
  constructor(public navCtrl: NavController, public http:Http, public navParams: NavParams, public modalCtrl : ModalController, public userdata : UserData) {

  }
   getUserPosition()
    {
          this.options = {
            enableHighAccuracy : false
                         };

        Geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     
        console.log(pos);
        this.data_latitude=pos.coords.latitude;
        this.data_longitude=pos.coords.longitude;
       },(err : PositionError)=>{
        console.log("error : " + err.message);
    
          })
    }

  ionViewDidLoad() {
    this.getUserPosition();
    this.getInfo();
}

  getInfo(){
    var this2 = this;
    var userId;

  Promise.resolve("proceed")
      .then((proceed) => {
        this.userdata.show_loading("Getting UID... Please wait.");
        // Validation. Ensure both passwords are identical
          userId = firebase.auth().currentUser.uid;

        if (userId == '') {
          this.userdata.pop_alert("Hang on...", "You have signed out", ["OK"]);
          return Promise.reject("uid not found");
        }
      }).then(() => {

        return this.generate_number(this2,userId);
      }).then((proceed) => {
        //TODO: this.navCtrl.setRoot(Activation);

        console.log(this2.contactnumber);
        this.userdata.dismiss_loading();
      }).catch((error) => {
        console.log("Error getting userid");
        console.log(error);
        this.userdata.dismiss_loading();
      });
  }
   generate_number(this2: any, userId: any): Promise<any> {
      return new Promise((resolve, reject) => {
        //  generate user token (auth details)
         firebase.database().ref('/userProfile/' + userId + '/contacts').once('value').then(function(snapshot) {
          this2.contactnumber=snapshot.val().ContactNumber;
          console.log(this2.contactnumber);
          resolve(this2.contactnumber);
        })

      });
      
    }


   hospitals(){
  console.log("Hospitals buton Clicked");
  this.navCtrl.push(MapPage);

  }
  bloodbanks(){
    this.navCtrl.push(BloodbanksPage);
  }
  addContacts(){
    this.navCtrl.push(AddcontactsPage);
  }
  signout(){
    this.navCtrl.push(HomePage);
    return firebase.auth().signOut();
    
  }
  sos(){
    this.message="I ashis in trouble at https://maps.google.com/?ie=UTF8&ll=" + this.data_latitude + "," + this.data_longitude + " Need urgent help and attention.";

let headers = new Headers();
        headers.append('Content-Type','application/json');
        let body={
     
     }
this.http.post("https://control.msg91.com/api/sendhttp.php?authkey=" + this.authkey + "&mobiles=" +this.contactnumber + "&message=" + this.message + "&sender=SAVEME&route=4&country=0",JSON.stringify(body), {headers: headers}).map(res=>res.json()).subscribe(response => {
console.log("Success");
})



let notifBody={

  "notification": {
    "title": "Help Needed!",
    "body": "Emergency Situation @ xyz place",
    "sound": "default",
    "color": "#FF0000"
  },
  "to": "exEVR04oXHs:APA91bHIF655MnqrfCGf4UsXxhICNTZ9ygDsdHP0pTCCRlcorZRoz9UQYK30hNOKAwm6ibqIl3lx6OdcHHEgkT3NNT0G3MILz9-n1AUsUSKC-UtfUkMqBusodGr96kp5CzZeXiq28DIg"


}
this.http.post("https://fcm.googleapis.com/fcm/send",JSON.stringify(notifBody), {headers: headers}).map(res=>res.json()).subscribe(response => {
  console.log(response);
})

  }

  sendreport(){
   this.openModal();
}
      openModal() {

      let modal = this.modalCtrl.create(ModalContentPage,{charNum: 0});
      modal.present();
    }


}

//Modal For Forgot Password
@Component({
  
  
  template: `
<ion-header style="background-color: #5e493a">
  <ion-toolbar>
    <ion-title>
      Report Details
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content style="background-color: #5e493a;">
<ion-row></ion-row>
 <ion-row class="top-section">
    <ion-col></ion-col>
    <ion-col col-8>
    </ion-col>
    <ion-col></ion-col>
  </ion-row>
   <ion-row (tap)="getPhoto();">
    <ion-col></ion-col>
    <ion-col col-3>
      <img id="evidenceimage" src="./assets/img/uploadimage.png" style="height:64px ; width: 64px;" />
    </ion-col>
    <ion-col>
    </ion-col>
  </ion-row>
   <ion-row>
    <ion-col></ion-col>
    <ion-col col-8><p id="evidenceimageText" style="text-align: center; color : white;">Upload Image</p>
    </ion-col>
    <ion-col>
    </ion-col>
  </ion-row>

  <ion-row>
      <form [formGroup]="reportForm" style="margin: 0 auto;">
        <ion-row >
          <ion-col>
            <ion-list>
              <ion-row>
                <ion-col>
          <textarea placeholder="Enter the incident details here!" rows="10" name="comment[text]" id="report_details" cols="40" class="ui-autocomplete-input" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></textarea>
                </ion-col>
              </ion-row>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>

          </ion-col>
        </ion-row>
            <ion-scroll scrollX="true" style="width:100%; height:70px" >
            <ion-row nowrap class="headerChip">
                  <button ion-button id="type1" color="secondary" outline (tap)="emergencyType('1')">Murder</button>
                  <button ion-button id="type2" color="secondary" outline (tap)="emergencyType('2')">Rape</button>
                  <button ion-button id="type3" color="secondary" outline (tap)="emergencyType('3')">Accident</button>
                  <button ion-button id="type4" color="secondary" outline (tap)="emergencyType('4')">Assault</button>
            </ion-row>
          </ion-scroll>

        <ion-row class="btn-row">
          <button class="white-long-btn" type="button" (tap)="submitReport()">Send Report</button>
        </ion-row>
      </form>
  </ion-row>
</ion-content>
`,
providers: [ UserData ]
})

export class ModalContentPage {

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder,
    public userdata: UserData, public actionSheetCtrl: ActionSheetController, public toolbox: Toolbox) {
    this.reportForm = this.formBuilder.group({
      details: ['', Toolbox.isValidNumberFormat]
      })
  }

  private database = firebase.database();
  private reportForm: FormGroup;
  public opened: number = 0;
  public countdownInterval: any;

  dismiss() {
    clearInterval(this.countdownInterval);
    this.viewCtrl.dismiss();
  }

  submitReport(){
    //get number from textbox, call forgotpassword api, save new password
    var textarea = (<HTMLTextAreaElement>document.getElementById("report_details"));
    let emergencyInfo : string;
    Promise.resolve("proceed")
      .then((proceed) => {
        this.userdata.show_loading("Sending... Please wait.");
        // Validation. Ensure both passwords are identical
        console.log("pelawpelaw");
        console.log(textarea.value);

        if (textarea.value == '') {
          this.userdata.pop_alert("Hang on...", "You have not entered any details", ["OK"]);
          return Promise.reject("details not entered");
        }
      }).then((proceed) => {
          emergencyInfo = this.checkEmergencyTypes();
         if(emergencyInfo != '')
           Promise.resolve(emergencyInfo);
         else
           Promise.reject("No Type Selected");
      }).then((proceed) => {
        //value - data to be sent to register
        this.sendToDatabase(textarea.value,emergencyInfo,"huhu");
      }).then((proceed) => {
        //TODO: this.navCtrl.setRoot(Activation);
        this.userdata.dismiss_loading();
      }).catch((error) => {
        console.log("Error registering user");
        this.userdata.dismiss_loading();
      });
  }

  emergencyType(button: number){
    console.log();

    if(document.getElementById("type"+button).style.backgroundColor == "rgb(50, 219, 100)"){
          document.getElementById("type"+button).style.backgroundColor = "";
        document.getElementById("type"+button).style.color = "#32db64";
    }else{
          document.getElementById("type"+button).style.backgroundColor = "#32db64";
        document.getElementById("type"+button).style.color = "#fdfdfd";
    }
    
  }

  checkEmergencyTypes(){
    let emergency : string;
    emergency = "";
    var types = ["Murder", "Rape", "Accident", "Assault", "Others"];

    for(let i=1;i<=5;i++){
      if(document.getElementById("type"+i).style.backgroundColor == "rgb(50, 219, 100)"){
        emergency =  types[i-1] + "," + emergency ;
      }
    
    }
    console.log(emergency);
    return emergency;
  }

sendToDatabase(details: any, emergencyInfo: string, email: any) {
  console.log(details);
  firebase.database().ref('reports').push().set({
    emergencyDetails: details,
    emergencyInfo: emergencyInfo
  });
}

getDeviceTokens(){

}

sendNotification(device_tokens: string){

}

getPhoto(){
  let base64data : any;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload An Image',
      buttons: [
        {
          text: 'From Galley',
          role: 'gallery',
          handler: () => {
            this.fetchImage(0);
          }
        },{
          text: 'Use Camera',
          role: 'camera',
          handler: () => {
            this.fetchImage(1);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  
}

    fetchImage(typeFetch: number){
 Promise.resolve("proceed")
      .then((proceed) => {
        this.userdata.show_loading("Uploading");
      }).then((proceed) => {
        //value - data to be sent to register
        return Toolbox.launch_camera_or_gallery(typeFetch);
      }).then((base64data: any) => {

        console.log("Storing data in local");
        //store details in local db

     (<HTMLImageElement>document.getElementById("evidenceimage")).src = "data:image/png;base64, " + base64data;
     document.getElementById("evidenceimageText").textContent = "Image Uploaded";
        this.userdata.dismiss_loading();
        return "proceed";
      }).then((proceed) => {
          //go to dashboard page
        console.log("Navigating to dashboard page");
        //this.navCtrl.push(DashBoardPage);
      }).catch((error) => {
        document.getElementById("evidenceimageText").textContent = "Image Uploading Error";
        console.log("Error registering user");
        this.userdata.dismiss_loading();
      });


    }

}


