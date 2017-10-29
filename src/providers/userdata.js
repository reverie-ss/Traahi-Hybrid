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
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
var UserData = (function () {
    function UserData(localdb, alertCtrl, loadingCtrl, platform, firebase, toastCtrl) {
        this.localdb = localdb;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.firebase = firebase;
        this.toastCtrl = toastCtrl;
        // For network monitoring
        // networkStatus true means internet connection available, vice versa.
        this.networkStatus = false;
        this.waitingForInternet = false;
        this.admobIsTesting = false;
        this.appInitialised = false;
        this.exitDialog = false;
        this.loadingShown = false;
        this.db = "dev";
    }
    UserData.prototype.getValue = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.localdb.get(key).then(function (value) {
                resolve(value);
            }, function (error) {
                reject(error);
            });
        });
    };
    UserData.prototype.pop_alert = function (title, subtitle, buttons, enableBackdropDismiss) {
        if (enableBackdropDismiss == undefined) {
            enableBackdropDismiss = true;
        }
        var alertOptions = {
            title: title,
            subTitle: subtitle,
            buttons: buttons,
            enableBackdropDismiss: enableBackdropDismiss
        };
        var alertBox = this.alertCtrl.create(alertOptions);
        alertBox.present();
        return alertBox;
    };
    UserData.prototype.show_loading = function (content) {
        if (!content) {
            content = "Loading. Please wait...";
        }
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: content,
            duration: 20000,
            dismissOnPageChange: true
        });
        this.loading.present();
        this.loadingShown = true;
    };
    UserData.prototype.dismiss_loading = function () {
        console.log("not reading");
        this.loading.dismiss();
        this.loadingShown = false;
    };
    UserData.prototype.reset_all_properties = function () {
        this.name = "";
        this.email = "";
        this.number = "";
        this.password = "";
        this.avatar_image = undefined;
        this.localdb.clear();
    };
    UserData.prototype.unregister_firebase_token = function (xml_rpc, uid, token, firebase) {
        return new Promise(function (resolve, reject) {
            xml_rpc.call_api("res.users", "unregister_firebase_token", [uid, token], {}, function (error, proceed) {
                if (error) {
                    console.log("Error at userdata unregister_firebase_token()");
                    console.log(error);
                    var error_msg = "Error at userdata unregister_firebase_token()\n";
                    error_msg = error_msg + error;
                    firebase.logError(error_msg);
                    reject(error);
                }
                else {
                    resolve("proceed");
                }
            });
        });
    };
    UserData.prototype.presentToast = function (message, time, place) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: time,
            position: place
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    return UserData;
}());
UserData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage, AlertController, LoadingController,
        Platform, Firebase, ToastController])
], UserData);
export { UserData };
//# sourceMappingURL=userdata.js.map