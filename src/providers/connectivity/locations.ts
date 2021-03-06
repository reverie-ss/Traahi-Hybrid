import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';

 
@Injectable()
export class Locations {
 
    data: any;
    latitude:any;
    longitude:any;
 
    constructor(public http: Http) {
    	Geolocation.getCurrentPosition().then((position) => {
    		this.latitude=position.coords.latitude;
    		this.longitude=position.coords.longitude;

    		})
 
    }
 
    load(){
 
        if(this.data){
            return Promise.resolve(this.data);
        }
 
        return new Promise(resolve => {
 
            this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.latitude+','+this.longitude+'&radius=10000&type=hospital&key=AIzaSyDGZAOUfDB8867dAbiKWc2GVj-oIXDNCH4').map(res => res.json()).subscribe(data => {
                 console.log(data);
                this.data = data.locations;
                resolve(this.data);
 
            });
 
        });
 
    }
     applyHaversine(locations){
 
        let usersLocation = {
        	lat: this.latitude,
        	lng: this.longitude
        	
        };
 
        locations.map((location) => {
 
            let placeLocation = {
                lat: location.lat,
                lng: location.lng
            };
 
            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        });
 
        return locations;
    }
 
    getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }
 
}
 
