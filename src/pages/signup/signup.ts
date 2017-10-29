import { Component } from '@angular/core';
import { IonicPage, 
	NavController, 
	Loading,
	LoadingController,
	AlertController } from 'ionic-angular';
	import { FormBuilder, FormGroup, Validators } from '@angular/forms';
	import { AuthProvider } from '../../providers/auth/auth';
	import { EmailValidator } from '../../validators/email';
	import { HomePage } from '../home/home';
	import { Toolbox } from '../../providers/toolbox';
	import { UserData } from '../../providers/userdata';

	@IonicPage({
		name: 'signup'
	})
	@Component({
		selector: 'page-signup',
		templateUrl: 'signup.html',
	})
	export class SignupPage {
		public signupForm: FormGroup;
		public loading: Loading;
		public toggle:boolean;
		constructor(
			public navCtrl: NavController, 
			public authProvider: AuthProvider,
			public formBuilder: FormBuilder, 
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController,
			public userdata: UserData
			) {
			this.signupForm = formBuilder.group({
				email: ['', Toolbox.isValidMailFormat],
				password: ['', Toolbox.isValidPasswordFormat]
			});
		}


		notify()
		{
			this.toggle=(<HTMLInputElement>document.getElementById("ionToggle")).checked;
			console.log(this.toggle);
		}


		signupUser(){
			let volunteer : boolean;
			let buttons = [
			{
				text:'Yes',
				handler: () => {
					console.log("Clicked Yes");
					volunteer = true;
					this.sendData(volunteer);
				}
			},
			{
				text:'No',
				handler: () => {
					console.log("Clicked No");
					volunteer = false;
					this.sendData(volunteer);
				}
			}
			];

			if (!this.signupForm.valid){
				console.log(this.signupForm.value);
			} else {

				this.userdata.pop_alert("Traahi Sevak","Would You like to be a volunteer?",buttons);
			}
		}

		sendData(volunteer : boolean){
				this.authProvider.signupUser(this.signupForm.value.email, 
					this.signupForm.value.password,volunteer)
				.then(() => {
					this.loading.dismiss().then( () => {
						console.log(volunteer);
						this.navCtrl.setRoot(HomePage);
					});
				}, (error) => {
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
				this.loading = this.loadingCtrl.create();
				this.loading.present();	
		}
	}