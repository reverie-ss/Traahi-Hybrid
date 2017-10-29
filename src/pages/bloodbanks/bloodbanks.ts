import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/Rx';

 declare var google;
@Component({
  selector: 'page-bloodbanks',
  templateUrl: 'bloodbanks.html'
})
export class BloodbanksPage {

    options : GeolocationOptions;
    currentPos : Geoposition;
    places : Array<any> ; 
    map:any;
    service:any;
    name:any;


    @ViewChild('map') mapElement: ElementRef;
 
    constructor(public http:Http,public navCtrl: NavController, public platform: Platform) { }

    //Method is being called when the page is being loaded
    ionViewDidEnter()
    {
      this.getUserPosition();
    }

    //Method used to get the list of nearby hospitals
    getBloodBanks(latLng)
    {
    var service = new google.maps.places.PlacesService(this.map);
return this.http.get("https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15?format=json&api-key=579b464db66ec23bdd000001bed23e86ab344c315a56324342b00e58&limit=100&filters[_state]=Odisha").map(res=>res.json());
    }

    //Method to get user's current position
    getUserPosition()
    {
          this.options = {
            enableHighAccuracy : false
                         };

        Geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     
        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude)
       },(err : PositionError)=>{
        console.log("error : " + err.message);
    
          })
    }

    //Method to create a marker
    createMarker(place)
    {
    	var myLatlng = new google.maps.LatLng(place._latitude,place._longitude);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: myLatlng
      });   

      marker.addListener('click',function(){
        console.log(place._mobile);
        if(place._mobile=="")
        {
        	place._mobile="Not Available";
        }
        let content = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+place._blood_bank_name+'</h1>'+
            '<h2 id="secondHeading" class="secondHeading">BloodBank</h2>'+
            '<div id="bodyContent">'+
            '<h4>'+place._address+','+place._district+'</h4>'+
            '<h5> Mobile Number: '+place._mobile+'</h5>'+
            '</div>'+
            '</div>';          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });
      })

    }       
 
   
   //Method to Initialize or add the map
    addMap(lat,long)
    {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getBloodBanks(latLng).subscribe(response => {
    	console.log(response);
        this.places = response.records;
        this.addMarker(response.records);
        console.log(this.places[0]._blood_bank_name);

        for(let i = 0 ;i < response.records.length ; i++)
          {
            this.createMarker(response.records[i]);
          }
          },(status)=>console.log(status));

    
          

          

    }



    //Method to add a marker after getting the list of places
      addMarker(places){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<h3>This is your current position </h3>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });
      google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });


    
 


}
}
    