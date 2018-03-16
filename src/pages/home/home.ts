import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { AlertController } from 'ionic-angular';
import { UserData } from '../../providers/userdata';
import { Toolbox } from '../../providers/toolbox';
import { Connectivity} from '../../providers/connectivity/connectivity';
import { Firebase } from '@ionic-native/firebase';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';


import { IonicPage, ModalController, Loading, Platform, NavParams, ViewController, NavController, LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ UserData ]
})
export class HomePage {
public loading: Loading;

  private loginForm: FormGroup;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public connectivity: Connectivity,
   private loadingController:LoadingController,  public authProvider: AuthProvider, 
  private formBuilder: FormBuilder, private firebase: Firebase, public userdata: UserData) {
  	    this.loginForm = this.formBuilder.group({
      phonenumber: ['', Validators.required],
      password: ['', Validators.required]
    });

  	}


login(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      Promise.resolve("proceed")
      .then((proceed) => {
        this.userdata.show_loading("Logging In... Please wait.");
        // Validation. Ensure both passwords are identical
        if(this.loginForm.value.phonenumber == 1 && this.loginForm.value.password == 1)
          Promise.resolve("proceed");
        else
          Promise.reject("Invalid Credentials");
      }).then((proceed) => {
        //TODO: this.navCtrl.setRoot(Activation);
    this.navCtrl.push(SignupPage);
        this.userdata.dismiss_loading();
      }).catch((error) => {
        console.log("Error getting userid");
        console.log(error);
        this.userdata.dismiss_loading();
      });

    }
  }

  goToRegister(){
    this.navCtrl.push(SignupPage);
  }
}

