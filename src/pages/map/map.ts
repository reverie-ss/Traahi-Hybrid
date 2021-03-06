import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from 'ionic-native';

 declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {


    options : GeolocationOptions;
    currentPos : Geoposition;
    places : Array<any> ; 
    map:any;
    service:any;
    name:any;

 
  

    @ViewChild('map') mapElement: ElementRef;
 
    constructor(public navCtrl: NavController, public platform: Platform) { }

    //Method is being called when the page is being loaded
    ionViewDidEnter()
    {
      this.getUserPosition();
    }

    //Method used to get the list of nearby hospitals
    getHospitals(latLng)
    {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
        location : latLng,
        radius : 8047 ,
        types: ["police"]
                  };
    return new Promise((resolve,reject)=>
          {
              service.nearbySearch(request,function(results,status)
                {
                  if(status === google.maps.places.PlacesServiceStatus.OK)
                      {
                        resolve(results);    
                      }
                  else
                      {    
                      reject(status);
                      }

                }); 
          });

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
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
      });   
      marker.addListener('click',function(){
        console.log(place.geometry.location);
        let content = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+place.name+'</h1>'+
            '<h2 id="secondHeading" class="secondHeading">Security</h2>'+
            '<div id="bodyContent">'+
            '<h4>'+place.vicinity+'</h4>'+
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

    this.getHospitals(latLng).then((results : Array<any>)=>{
        this.places = results;
        this.addMarker(results);
        console.log(this.places[0].name);

        for(let i = 0 ;i < results.length ; i++)
          {
            this.createMarker(results[i]);
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
    