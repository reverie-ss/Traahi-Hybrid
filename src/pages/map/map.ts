import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/connectivity/locations';
import { GoogleMaps } from '../../providers/connectivity/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

 declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
   mapInitialised: boolean = false;
   map:any;

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public locations: Locations) {
 console.log("Inside Maps Page");
    }
 
    ionViewDidLoad(){
      this.locations.load();
 
        this.platform.ready().then(() => {
 let mapLoaded=this.initMap();
            let locationsLoaded = this.locations.load();
 
            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
 
                let locations = result[1];
 
                for(let location of locations){
                    this.maps.addMarker(location.latitude, location.longitude);
                }
 
            });
 
        });
 
    }
    initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      Geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         console.log("Latitude: "+position.coords.latitude);
        
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        resolve(true);
 
      });
 
    });
 
  }
 
}