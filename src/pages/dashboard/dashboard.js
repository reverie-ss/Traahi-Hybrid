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
import { FormBuilder } from '@angular/forms';
import { IonicPage, ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/userdata';
import { Toolbox } from '../../providers/toolbox';
import firebase from 'firebase';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, modalCtrl, userdata) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.userdata = userdata;
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage.prototype.hospitals = function () {
        console.log("Hospitals buton Clicked");
        this.navCtrl.push(TabsPage);
    };
    DashboardPage.prototype.sendreport = function () {
        this.openModal();
    };
    DashboardPage.prototype.openModal = function () {
        var modal = this.modalCtrl.create(ModalContentPage, { charNum: 0 });
        modal.present();
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController,
        UserData])
], DashboardPage);
export { DashboardPage };
//Modal For Forgot Password
var ModalContentPage = (function () {
    function ModalContentPage(platform, params, viewCtrl, formBuilder, userdata) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.userdata = userdata;
        this.database = firebase.database();
        this.opened = 0;
        this.reportForm = this.formBuilder.group({
            details: ['', Toolbox.isValidNumberFormat]
        });
    }
    ModalContentPage.prototype.dismiss = function () {
        clearInterval(this.countdownInterval);
        this.viewCtrl.dismiss();
    };
    ModalContentPage.prototype.submitReport = function () {
        var _this = this;
        //get number from textbox, call forgotpassword api, save new password
        Promise.resolve("proceed")
            .then(function (proceed) {
            _this.userdata.show_loading("Sending... Please wait.");
            // Validation. Ensure both passwords are identical
            console.log("pelawpelaw");
            console.log(_this.reportForm.controls["details"].value);
            if (_this.reportForm.controls["details"].value == '') {
                _this.userdata.pop_alert("Hang on...", "You have not entered any details", ["OK"]);
                return Promise.reject("details not entered");
            }
        }).then(function () {
            //value - data to be sent to register
            var values = {
                details: _this.reportForm.controls["details"].value
            };
            console.log(_this.reportForm.controls["details"].value);
            _this.sendToDatabase(_this.reportForm.controls["details"].value, "gandu", "huhu");
        }).then(function (proceed) {
            //TODO: this.navCtrl.setRoot(Activation);
            _this.userdata.dismiss_loading();
        }).catch(function (error) {
            console.log("Error registering user");
            _this.userdata.dismiss_loading();
        });
    };
    ModalContentPage.prototype.sendToDatabase = function (details, name, email) {
        console.log(details);
        firebase.database().ref('users').set({
            username: details,
            email: name
        });
    };
    ModalContentPage.prototype.getDeviceTokens = function () {
    };
    ModalContentPage.prototype.sendNotification = function (device_tokens) {
    };
    return ModalContentPage;
}());
ModalContentPage = __decorate([
    Component({
        template: "\n<ion-header style=\"background-color: #5e493a\">\n  <ion-toolbar>\n    <ion-title>\n      Report Details\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)=\"dismiss()\">\n        <span ion-text color=\"primary\" showWhen=\"ios\">Cancel</span>\n        <ion-icon name=\"md-close\"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content style=\"background-color: #5e493a;\">\n <ion-row class=\"top-section\">\n    <ion-col></ion-col>\n    <ion-col col-8>\n    \tcloud-computing\n\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <ion-row>\n      <form [formGroup]=\"reportForm\" style=\"margin: auto; width: 70%;\">\n        <ion-row>\n          <ion-col>\n            <ion-list>\n              <ion-row>\n                <ion-col>\n                    <ion-input class=\"white-line-text-input\" type=\"textbox\" placeholder=\"Enter Details of Incident\"\n                    formControlName=\"details\"></ion-input>\n                </ion-col>\n              </ion-row>\n            </ion-list>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n\n          </ion-col>\n        </ion-row>\n        <ion-row class=\"btn-row\">\n          <button class=\"white-long-btn\" type=\"button\" (tap)=\"submitReport()\">Send Report</button>\n        </ion-row>\n      </form>\n  </ion-row>\n</ion-content>\n",
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [Platform, NavParams, ViewController, FormBuilder,
        UserData])
], ModalContentPage);
export { ModalContentPage };
//# sourceMappingURL=dashboard.js.map