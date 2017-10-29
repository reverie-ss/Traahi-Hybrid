var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ModalContentPage } from '../pages/dashboard/dashboard';
import { ListPage } from '../pages/list/list';
import { Connectivity } from '../providers/connectivity/connectivity';
import { GoogleMaps } from '../providers/connectivity/google-maps';
import { Locations } from '../providers/connectivity/locations';
import { UserData } from '../providers/userdata';
export var firebaseConfig = {
    apiKey: "AIzaSyAFnh6w0FMnGwcNW6G3cstWZvfg5UhOt44",
    authDomain: "traahi-invincians.firebaseapp.com",
    databaseURL: "https://traahi-invincians.firebaseio.com",
    projectId: "traahi-invincians",
    storageBucket: "traahi-invincians.appspot.com",
    messagingSenderId: "1008075057808"
};
firebase.initializeApp(firebaseConfig);
export function provideStorage() {
    return new Storage({ name: 'iddb' });
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            TabsPage,
            MapPage,
            ListPage,
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
            TabsPage,
            MapPage,
            ListPage,
            DashboardPage,
            ModalContentPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            { provide: Storage, useFactory: provideStorage },
            Connectivity,
            GoogleMaps,
            Locations,
            UserData,
            Connectivity,
            Firebase,
            ModalContentPage,
            FCM,
            Push
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map