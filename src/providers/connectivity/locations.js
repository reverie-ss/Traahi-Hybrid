var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
var Locations = (function () {
    function Locations(http) {
        var _this = this;
        this.http = http;
        Geolocation.getCurrentPosition().then(function (position) {
            _this.latitude = position.coords.latitude;
            _this.longitude = position.coords.longitude;
        });
    }
    Locations.prototype.load = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + _this.latitude + ',' + _this.longitude + '&radius=10000&type=hospital&key=AIzaSyDGZAOUfDB8867dAbiKWc2GVj-oIXDNCH4').map(function (res) { return res.json(); }).subscribe(function (data) {
                console.log(data);
                _this.data = data.locations;
                resolve(_this.data);
            });
        });
    };
    Locations.prototype.applyHaversine = function (locations) {
        var _this = this;
        var usersLocation = {
            lat: this.latitude,
            lng: this.longitude
        };
        locations.map(function (location) {
            var placeLocation = {
                lat: location.lat,
                lng: location.lng
            };
            location.distance = _this.getDistanceBetweenPoints(usersLocation, placeLocation, 'miles').toFixed(2);
        });
        return locations;
    };
    Locations.prototype.getDistanceBetweenPoints = function (start, end, units) {
        var earthRadius = {
            miles: 3958.8,
            km: 6371
        };
        var R = earthRadius[units || 'miles'];
        var lat1 = start.lat;
        var lon1 = start.lng;
        var lat2 = end.lat;
        var lon2 = end.lng;
        var dLat = this.toRad((lat2 - lat1));
        var dLon = this.toRad((lon2 - lon1));
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    Locations.prototype.toRad = function (x) {
        return x * Math.PI / 180;
    };
    return Locations;
}());
Locations = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Locations);
export { Locations };
//# sourceMappingURL=locations.js.map