import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { MapPage } from '../map/map';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  	

  	}
  	hospitals(){
console.log("Hospitals buton Clicked");
this.navCtrl.push(TabsPage);

  }

}
