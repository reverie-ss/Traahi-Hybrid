var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/connectivity/locations';
import { GoogleMaps } from '../../providers/connectivity/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
var MapPage = (function () {
    function MapPage(navCtrl, maps, platform, locations) {
        this.navCtrl = navCtrl;
        this.maps = maps;
        this.platform = platform;
        this.locations = locations;
        this.mapInitialised = false;
        console.log("Inside Maps Page");
    }
    MapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.locations.load();
        this.platform.ready().then(function () {
            var mapLoaded = _this.initMap();
            var locationsLoaded = _this.locations.load();
            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then(function (result) {
                var locations = result[1];
                for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
                    var location_1 = locations_1[_i];
                    _this.maps.addMarker(location_1.latitude, location_1.longitude);
                }
            });
        });
    };
    MapPage.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            Geolocation.getCurrentPosition().then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                console.log("Latitude: " + position.coords.latitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                resolve(true);
            });
        });
    };
    return MapPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], MapPage.prototype, "mapElement", void 0);
__decorate([
    ViewChild('pleaseConnect'),
    __metadata("design:type", ElementRef)
], MapPage.prototype, "pleaseConnect", void 0);
MapPage = __decorate([
    Component({
        selector: 'page-map',
        templateUrl: 'map.html'
    }),
    __metadata("design:paramtypes", [NavController, GoogleMaps, Platform, Locations])
], MapPage);
export { MapPage };
//# sourceMappingURL=map.js.map