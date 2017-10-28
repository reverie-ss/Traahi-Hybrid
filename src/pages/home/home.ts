import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { UserData } from '../../providers/userdata';
import { Toolbox } from '../../providers/toolbox';
import { Connectivity} from '../../providers/connectivity/connectivity';
import { Firebase } from '@ionic-native/firebase';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { IonicPage, ModalController, Platform, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ UserData ]
})
export class HomePage {

  private loginForm: FormGroup;
  constructor(public navCtrl: NavController,public connectivity: Connectivity,
   private loadingController:LoadingController,  private formBuilder: FormBuilder, private firebase: Firebase, public userdata: UserData) {
  	    this.loginForm = this.formBuilder.group({
      phonenumber: ['', Validators.required],
      password: ['', Validators.required]
    });

  	}


   login(){
      this.navCtrl.push(DashboardPage);
    //call generate token api
      // this.userdata.number = this.loginForm.controls["phonenumber"].value;
      // this.userdata.password = this.loginForm.controls["password"].value;

      // Promise.resolve("proceed")
      // .then((proceed) => {
      //   this.userdata.show_loading("Authenticating");
      // }).then((proceed) => {
      //   //value - data to be sent to register
      //   let auth = {
      //     mobile_number: this.userdata.number,
      //     password: this.userdata.password,
      //   };
      //   let values = {
      //     auth
      //   }

      // }).then((auth_details: any) => {

      //   console.log("Storing data in local");
      //   //store details in local db
      //   this.userdata.localdb.set("number", this.userdata.number);
      //   this.userdata.localdb.set("password", this.userdata.password);

      //   this.userdata.dismiss_loading();
      //   return "proceed";
      // }).then((proceed) => {
      //     //go to dashboard page
      //   console.log("Navigating to dashboard page");
      //   this.navCtrl.push(DashboardPage);
      // }).catch((error) => {
      //   console.log("Error registering user");
      //   this.userdata.dismiss_loading();
      // });
  }

}
