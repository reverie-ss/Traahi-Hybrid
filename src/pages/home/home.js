var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserData } from '../../providers/userdata';
import { Connectivity } from '../../providers/connectivity/connectivity';
import { Firebase } from '@ionic-native/firebase';
import { Validators, FormBuilder } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { NavController, LoadingController } from 'ionic-angular';
var HomePage = (function () {
    function HomePage(navCtrl, connectivity, loadingController, formBuilder, firebase, userdata) {
        this.navCtrl = navCtrl;
        this.connectivity = connectivity;
        this.loadingController = loadingController;
        this.formBuilder = formBuilder;
        this.firebase = firebase;
        this.userdata = userdata;
        this.loginForm = this.formBuilder.group({
            phonenumber: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    HomePage.prototype.login = function () {
        this.navCtrl.push(DashboardPage);
        //call generate token api
        // this.userdata.number = this.loginForm.controls["phonenumber"].value;
        // this.userdata.password = this.loginForm.controls["password"].value;
        // Promise.resolve("proceed")
        // .then((proceed) => {
        //   this.userdata.show_loading("Authenticating");
        // }).then((proceed) => {
        //   //value - data to be sent to register
        //   let auth = {
        //     mobile_number: this.userdata.number,
        //     password: this.userdata.password,
        //   };
        //   let values = {
        //     auth
        //   }
        // }).then((auth_details: any) => {
        //   console.log("Storing data in local");
        //   //store details in local db
        //   this.userdata.localdb.set("number", this.userdata.number);
        //   this.userdata.localdb.set("password", this.userdata.password);
        //   this.userdata.dismiss_loading();
        //   return "proceed";
        // }).then((proceed) => {
        //     //go to dashboard page
        //   console.log("Navigating to dashboard page");
        //   this.navCtrl.push(DashboardPage);
        // }).catch((error) => {
        //   console.log("Error registering user");
        //   this.userdata.dismiss_loading();
        // });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [NavController, Connectivity,
        LoadingController, FormBuilder, Firebase, UserData])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map