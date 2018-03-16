import { Component } from '@angular/core';
import { IonicPage, 
	NavController, 
	Loading,
	LoadingController,
	AlertController,
	ActionSheetController } from 'ionic-angular';
	import { FormBuilder, FormGroup, Validators } from '@angular/forms';
	import { AuthProvider } from '../../providers/auth/auth';
	import { EmailValidator } from '../../validators/email';
	import { HomePage } from '../home/home';
	import { InformationPage } from '../information/information';
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
		public bookForm: FormGroup;
		public loading: Loading;
		public toggle:boolean;

		constructor(
			public navCtrl: NavController, 
			public authProvider: AuthProvider,
			public formBuilder: FormBuilder, 
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController,
			public userdata: UserData,
			public actionSheetCtrl: ActionSheetController
			) {
			this.bookForm = formBuilder.group({
				from: [''],
				to: ['']
			});
		}


		notify()
		{
			this.toggle=(<HTMLInputElement>document.getElementById("ionToggle")).checked;
			console.log(this.toggle);
		}


		// signupUser(){
			// 	let volunteer : boolean;
			// 	let buttons = [
			// 	{
				// 		text:'Yes',
				// 		handler: () => {
					// 			console.log("Clicked Yes");
					// 			volunteer = true;
					// 			this.sendData(volunteer);
					// 		}
					// 	},
					// 	{
						// 		text:'No',
						// 		handler: () => {
							// 			console.log("Clicked No");
							// 			volunteer = false;
							// 			this.sendData(volunteer);
							// 		}
							// 	}
							// 	];

							// 	if (!this.bookForm.valid){
								// 		console.log(this.bookForm.value);
								// 	} else {

									// 		//this.userdata.pop_alert("Traahi Sevak","Would You like to be a volunteer?",buttons);
									// 	}
									// }

									// sendData(volunteer : boolean){
										// 		this.authProvider.signupUser(this.bookForm.value.email, 
										// 			this.bookForm.value.password,volunteer)
										// 		.then(() => {
											// 			this.loading.dismiss().then( () => {
												// 				console.log(volunteer);
												// 				this.navCtrl.setRoot(HomePage);
												// 			});
												// 		}, (error) => {
													// 			this.loading.dismiss().then( () => {
														// 				let alert = this.alertCtrl.create({
															// 					message: error.message,
															// 					buttons: [
															// 					{
																// 						text: "Ok",
																// 						role: 'cancel'
																// 					}
																// 					]
																// 				});
																// 				alert.present();
																// 			});
																// 		});
																// 		this.loading = this.loadingCtrl.create();
																// 		this.loading.present();	
																// }

																bookTicket(){
																	Promise.resolve("proceed")
																	.then(proceed => {
																		if(this.userdata.departure != "Departure" || this.userdata.arrival != "Arrival"){
																			//show routes and price

																			let buttons = [
																			{
																				text: 'Yes',
																				handler: () => {
																					console.log('User has said yes');
																					this.navCtrl.push(InformationPage);
																				}
																			},
																			{
																				text: 'No',
																				handler: () => {
																					console.log('User has said no');
																					this.navCtrl.push(InformationPage);
																				}
																			}
																			]
																			this.userdata.pop_alert("Return ?","Would you like to book return ticket as well?",buttons);
																			
																		}

																	});

																}

																openPlacesDeparture() {
																	let actionSheet = this.actionSheetCtrl.create({
																		title: 'Departue',
																		buttons: [
																		{
																			text: 'Delhi',
																			role: 'Cancel',
																			handler: () => {
																				console.log('Delhi clicked');
																				this.userdata.departure = 'Delhi';
																			}
																		},
																		{
																			text: 'Pune',
																			role: 'Cancel',
																			handler: () => {
																				console.log('Pune clicked');
																				this.userdata.departure = 'Pune';         }
																			},
																			{
																				text: 'Mumbai',
																				role: 'Cancel',
																				handler: () => {
																					console.log('Mumbai clicked');
																					this.userdata.departure = 'Mumbai';
																				}
																			},
																			{
																				text: 'Kolkata',
																				role: 'Cancel',
																				handler: () => {
																					console.log('Kolkata clicked');
																				}
																			},
																			{
																				text: 'Bhubaneswar',
																				role: 'Cancel',
																				handler: () => {
																					console.log('Bhubaneswar clicked');
																					this.userdata.departure = 'Bbsr';
																				}
																			}
																			]
																		});
																	actionSheet.present();
																}
																openPlacesArrival() {
																	let actionSheet = this.actionSheetCtrl.create({
																		title: 'Arrival',
																		buttons: [
																		{
																			text: 'Delhi',
																			role: 'Cancel',
																			handler: () => {
																				console.log('Delhi clicked');
																				this.userdata.arrival = 'Delhi';
																			}
																		},
																		{
																			text: 'Pune',
																			role: 'Cancel',
																			handler: () => {
																				console.log('Pune clicked');
																				this.userdata.arrival = 'Pune';         }
																			},
																			{
																				text: 'Mumbai',
																				role: 'Cancel',
																				handler: () => {
																					console.log('Mumbai clicked');
																					this.userdata.arrival = 'Mumbai';
																				}
																			},
																			{
																				text: 'Kolkata',
																				role: 'Cancel',
																				handler: () => {
																					console.log('Kolkata clicked');
																				}
																			},
																			{
																				text: 'Bhubaneswar',
																				role: 'Cancel',
																				handler: () => {
																					console.log('Bhubaneswar clicked');
																					this.userdata.arrival = 'Bbsr';
																				}
																			}
																			]
																		});
																	actionSheet.present();
																}

															}