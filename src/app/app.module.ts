import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase';
import { HttpModule } from '@angular/http';
import { FCM } from '@ionic-native/fcm';
import { Push } from '@ionic-native/push';

import firebase from 'firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import{ AngularFireModule } from 'angularfire2';
import { Toolbox } from '../providers/toolbox';
import { SignupPage } from '../pages/signup/signup';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ModalContentPage } from '../pages/dashboard/dashboard';
import { BloodbanksPage } from '../pages/bloodbanks/bloodbanks';
import {AddcontactsPage} from '../pages/addcontacts/addcontacts';
import { AuthProvider } from '../providers/auth/auth';
import { Connectivity} from '../providers/connectivity/connectivity';
import { GoogleMaps } from '../providers/connectivity/google-maps';
import { Locations } from '../providers/connectivity/locations';
import { UserData } from '../providers/userdata';

export const firebaseConfig={

  apiKey: "AIzaSyAFnh6w0FMnGwcNW6G3cstWZvfg5UhOt44",
  authDomain: "traahi-invincians.firebaseapp.com",
  databaseURL: "https://traahi-invincians.firebaseio.com",
  projectId: "traahi-invincians",
  storageBucket: "traahi-invincians.appspot.com",
  messagingSenderId: "1008075057808"
}
firebase.initializeApp(firebaseConfig)


export function provideStorage() {
  return new Storage({ name: 'iddb' });
}

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  AddcontactsPage,
  MapPage,
  BloodbanksPage,
  SignupPage,
  DashboardPage,
  ModalContentPage
  ],
  imports: [
  BrowserModule,
  HttpModule,
  IonicModule.forRoot(MyApp),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
   AddcontactsPage,
  MapPage,
  BloodbanksPage,
  SignupPage,
  DashboardPage,
  ModalContentPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  { provide: Storage, useFactory: provideStorage },
  Connectivity,
  GoogleMaps,
  Locations,
  UserData,
  AuthProvider,
  Connectivity,
  Firebase,
  ModalContentPage,
  FCM,
  Push,
  Toolbox
  ]
})
export class AppModule {}
