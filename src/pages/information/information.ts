import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/userdata';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-information',
 	templateUrl: 'information.html',
 })
 export class InformationPage {

 	constructor(public navCtrl: NavController, public navParams: NavParams, public userdata: UserData) {
 		// this.userdata.departure = "Mumbai";
 		// this.userdata.arrival = "Bbsr";
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad InformationPage');
 		this.updateFlights();
 	}

 	updateFlights(){
 		this.userdata.flights = [{
 			name:"Air India",
 			no:101,
 			dept:10,
 			arr:1,
 			from:"Mumbai",
 			to:"Delhi",
 			seats:40,
 			fseat:10,
 			price:10000,
 			discountPrice: 0

 		},
 		{
 			name:"Indigo",
 			no:102,
 			dept:14,
 			arr:16,
 			from:"Mumbai",
 			to:"Bbsr",
 			seats:50,
 			fseat:10,
 			price:5000,
 			discountPrice: 0

 		},
 		{

 			name:"Air India",
 			no:103,
 			dept:1,
 			arr:5,
 			from:"Bbsr",
 			to:"Delhi",
 			seats:40,
 			fseat:30,
 			price:7000,
 			discountPrice: 0

 		},
 		{
 			name:"Indian Airlines",
 			no:104,
 			dept:4,
 			arr:15,
 			from:"Pune",
 			to:"Delhi",
 			seats:45,
 			fseat:15,
 			price:5500,
 			discountPrice: 0
 		},
 		{
 			name:"Air India",
 			no:105,
 			dept:11,
 			arr:17,
 			from:"Mumbai",
 			to:"Pune",
 			seats:40,
 			fseat:25,
 			price:8000,
 			discountPrice: 0
 		},
 		{
 			name:"Indian Airlines",
 			no:106,
 			dept:14,
 			arr:15,
 			from:"Pune",
 			to:"Bbsr",
 			seats:40,
 			fseat:10,
 			price:6000,
 			discountPrice: 0
 		},
 		{
 			name:"Air India", 
 			no:107,
 			dept:4,
 			arr:19,
 			from:"Delhi",
 			to:"Mumbai",
 			seats:100,
 			fseat:50,
 			price:9000,
 			discountPrice: 0
 		},
 		{
 			name:"Indigo",
 			no:108,
 			dept:3,
 			arr:15,
 			from:"Pune",
 			to:"Kolkata",
 			seats:45,
 			fseat:20,
 			price:5000,
 			discountPrice: 0
 		},
 		{
 			name:"Air India",
 			no:109,
 			dept:12,
 			arr:18,
 			from:"Delhi",
 			to:"Bbsr",
 			seats:20,
 			fseat:15,
 			price:6000,
 			discountPrice: 0
 		},
 		{
 			name:"Indigo",
 			no:110,
 			dept:22,
 			arr:1,
 			from:"Mumbai",
 			to:"Kolkata",
 			seats:50,
 			fseat:10,
 			price:4000,
 			discountPrice: 0
 		},
 		{
 			name:"Air India",
 			no:111,
 			dept:15,
 			arr:20,
 			from:"Kolkata",
 			to:"Delhi",
 			seats:60,
 			fseat:30,
 			price:5000,
 			discountPrice: 0
 		},

 		{
 			name:"Indian Airlines",
 			no:112,
 			dept:19,
 			arr:24,
 			from:"Kolkata",
 			to:"Mumbai",
 			seats:30,
 			fseat:20,
 			price:9000,
 			discountPrice: 0
 		},
 		{
 			name:"Air India",
 			no:113,
 			dept:14,
 			arr:15,
 			from:"Bbsr",
 			to:"Kolkata",
 			seats:45,
 			fseat:20,
 			price:5000,
 			discountPrice: 0
 		},

 		{
 			name:"Indian Airlines",
 			no:114,
 			dept:14,
 			arr:18,
 			from:"Bbsr",
 			to:"Pune",
 			seats:25,
 			fseat:15,
 			price:8000,
 			discountPrice: 0
 		},
 		{
 			name:"Indigo",
 			no:115,
 			dept:4,
 			arr:15,
 			from:"Bbsr",
 			to:"Mumbai",
 			seats:55,
 			fseat:20,
 			price:9000,
 			discountPrice: 0
 		}];

 		this.searchFlights();
 	}

 	searchFlights(){
 		let i=0;
 		
 		while(i<this.userdata.flights.length){
 			if(this.userdata.flights[i].from == this.userdata.departure && this.userdata.flights[i].to == this.userdata.arrival ){
 				let fseat = this.userdata.flights[i].fseat;
 				let seat = this.userdata.flights[i].seats;
 				let discount;
 				let price = this.userdata.flights[i].price;
 				
 				if(fseat<=(0.2*seat))
 				{
 					discount=0.5*price;
 				}
 				else if(fseat<=(0.4*seat))
 				{
 					discount=0.4*price;
 				}
 				else if(fseat<=(0.6*seat))
 				{
 					discount=0.3*price;
 				}
 				else if(fseat<=(0.8*seat))
 				{
 					discount=0.2*price;
 				}
 				else
 				{
 					discount=0.1*price;
 				}

 				this.userdata.flights[i].discountPrice = discount;
 				this.userdata.flights[i].fseat++;
 				this.userdata.flights[i].seats--;
 				this.userdata.bookflights.push(this.userdata.flights[i]);
 			}
 			i++;
 		}
 	}

 }
