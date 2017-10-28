import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';
 
declare var google;
 
@Injectable()
export class GoogleMaps {

 
  pleaseConnect: any;
  map: any;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
 
  constructor(public connectivityService: Connectivity) {
 
  }
 
 
 
  
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
        }
        else {
          
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
 
  addMarker(lat: number, lng: number): void {
 
    let latLng = new google.maps.LatLng(lat, lng);
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
 
    this.markers.push(marker); 
 
  }
 
}