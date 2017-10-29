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
    this.authProvider.loginUser(this.loginForm.value.phonenumber, 
      this.loginForm.value.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(DashboardPage);
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingController.create();
    this.loading.present();
  }
}
goToRegister() { 
  this.navCtrl.push(SignupPage); 
}

}
