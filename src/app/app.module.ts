import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';

import { ListPage } from '../pages/list/list';
import { Connectivity} from '../providers/connectivity/connectivity';
import { GoogleMaps } from '../providers/connectivity/google-maps';
import { Locations } from '../providers/connectivity/locations';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Connectivity,
    GoogleMaps,
    Locations
  ]
})
export class AppModule {}
