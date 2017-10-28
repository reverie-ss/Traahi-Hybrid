import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ModalContentPage } from '../pages/dashboard/dashboard';

import { ListPage } from '../pages/list/list';
import { Connectivity} from '../providers/connectivity/connectivity';
import { GoogleMaps } from '../providers/connectivity/google-maps';
import { Locations } from '../providers/connectivity/locations';
import { UserData } from '../providers/userdata';



export function provideStorage() {
 return new Storage({ name: 'iddb' });
}

@NgModule({
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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: Storage, useFactory: provideStorage },
    Connectivity,
    GoogleMaps,
    Locations,
    UserData,
    Connectivity,
    Firebase,
    ModalContentPage
  ]
})
export class AppModule {}
