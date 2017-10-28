import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Connectivity} from '../providers/connectivity/connectivity';
import { GoogleMaps } from '../providers/connectivity/google-maps';
import { Locations } from '../providers/connectivity/locations';

import {HomePage} from '../pages/home/home'
@Component({
  templateUrl: 'app.html',
   providers: [GoogleMaps, Connectivity,Locations]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

