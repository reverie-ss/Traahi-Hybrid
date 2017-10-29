import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Connectivity} from '../providers/connectivity/connectivity';
import { GoogleMaps } from '../providers/connectivity/google-maps';
import { Locations } from '../providers/connectivity/locations';
import { FCM } from '@ionic-native/fcm';
import { UserData } from '../providers/userdata';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import {HomePage} from '../pages/home/home'
@Component({
  templateUrl: 'app.html',
  providers: [GoogleMaps, Connectivity,Locations]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen,
    public fcm: FCM, private push: Push, public alertCtrl: AlertController, public userdata: UserData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.initPushNotification();
      console.log("in file");
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initPushNotification() {
    console.log("in function");
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              console.log("working");
              // this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        // this.nav.push(DetailsPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
}

