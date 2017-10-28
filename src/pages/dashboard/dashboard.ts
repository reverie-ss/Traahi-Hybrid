import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, ModalController, Platform, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/userdata';
import { Toolbox } from '../../providers/toolbox';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public userdata : UserData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  	hospitals(){
		console.log("Hospitals buton Clicked");
		this.navCtrl.push(TabsPage);

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
 <ion-row class="top-section">
    <ion-col></ion-col>
    <ion-col col-8>
      <p style="color : white;">Upload Images</p>
    </ion-col>
    <ion-col></ion-col>
  </ion-row>
  <ion-row>
      <form [formGroup]="reportForm" style="margin: auto; width: 70%;">
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-row>
                <ion-col>
                    <ion-input class="white-line-text-input" type="textbox" placeholder="Enter Details of Incident"
                    formControlName="details"></ion-input>
                </ion-col>
              </ion-row>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
          
          </ion-col>
        </ion-row>
        <ion-row class="btn-row">
          <button class="white-long-btn" type="button" (tap)="verify()">Verify</button>
        </ion-row>
      </form>
  </ion-row>
</ion-content>
`,
providers: [ UserData ]
})

export class ModalContentPage {
  
  private OTPForm: FormGroup;
  public opened: number = 0;
  public countdownInterval: any;
  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder,
    public userdata: UserData) {
    this.OTPForm = this.formBuilder.group({
      otp: ['', Toolbox.isValidNumberFormat]
      })
  }

  dismiss() {
    clearInterval(this.countdownInterval);
    this.viewCtrl.dismiss();
  }

  verify(){
    //get number from textbox, call forgotpassword api, save new password
    Promise.resolve("proceed")
      .then((proceed) => {
        this.userdata.show_loading("Verifying... Please wait.");
        // Validation. Ensure both passwords are identical
        console.log(this.OTPForm.controls["otp"].value);
        if (this.OTPForm.controls["otp"].value == '') {
          this.userdata.pop_alert("Hang on...", "You have not entered any number", ["OK"]);
          return Promise.reject("number not entered");
        }
      }).then(() => {
        //value - data to be sent to register
        let values = {
          mobile_number: this.OTPForm.controls["otp"].value
        };

      }).then((proceed) => {
        //TODO: this.navCtrl.setRoot(Activation);
        this.userdata.dismiss_loading();
      }).catch((error) => {
        console.log("Error registering user");
        this.userdata.dismiss_loading();
      });
  }




}


