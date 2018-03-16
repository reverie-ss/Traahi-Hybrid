import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, Loading, Platform, ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';

@Injectable()
export class UserData {

  public db: string;
  public uid: number;
  public name: string;
  public email: string;
  public number: string;
  public password: string;
  public avatar_image: string;
  public loading: Loading;
  // For network monitoring
  // networkStatus true means internet connection available, vice versa.
  public networkStatus: boolean = false;
  public waitingForInternet: boolean = false;
  public waitingForInternetPopup: any;
  public admobIsTesting: boolean = false;
  public appInitialised: boolean = false;
  public exitDialog: boolean = false;
  public loadingShown: boolean = false;
  public departure: string = "Departue";
  public arrival: string = "Arrival";
  public flights: any;
  public bookflights: any;




  constructor(public localdb: Storage, public alertCtrl: AlertController, private loadingCtrl: LoadingController,
  private platform: Platform, private firebase: Firebase, private toastCtrl: ToastController) {
    this.db = "dev";
    this.bookflights = [];
  }

  getValue(key): Promise<any> {
    return new Promise((resolve, reject) => {
      this.localdb.get(key).then((value) => {
        resolve(value);
      }, (error) => {
        reject(error);
      });
    });
  }

  pop_alert(title: string, subtitle: string, buttons: Array<any>, enableBackdropDismiss?: boolean): any {
    if (enableBackdropDismiss == undefined) {
      enableBackdropDismiss = true;
    }
    let alertOptions = {
      title: title,
      subTitle: subtitle,
      buttons: buttons,
      enableBackdropDismiss: enableBackdropDismiss
    };
    let alertBox = this.alertCtrl.create(alertOptions);
    alertBox.present();
    return alertBox;
  }

  show_loading(content?: string) {
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
  }

  dismiss_loading() {
    console.log("not reading");
      this.loading.dismiss();
      this.loadingShown = false;
  }

  reset_all_properties() {
    this.name = "";
    this.email = "";
    this.number = "";
    this.password = "";
	  this.avatar_image = undefined;
    this.localdb.clear();
  }


  unregister_firebase_token(xml_rpc: any, uid: number, token: string, firebase: any): Promise<any> {
    return new Promise((resolve, reject) => {
      xml_rpc.call_api("res.users", "unregister_firebase_token", [uid, token], {},
      (error, proceed) => {
        if (error) {
          console.log("Error at userdata unregister_firebase_token()");
          console.log(error);
          let error_msg = "Error at userdata unregister_firebase_token()\n";
          error_msg = error_msg + error;
          firebase.logError(error_msg);
          reject(error);
        }
        else {
          resolve("proceed");
        }
      });
    });
  }

  presentToast(message: string, time: number, place: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: place
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
