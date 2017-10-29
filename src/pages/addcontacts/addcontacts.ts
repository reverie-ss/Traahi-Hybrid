import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


/**
 * Generated class for the AddcontactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcontacts',
  templateUrl: 'addcontacts.html',
})
export class AddcontactsPage {

	counter:any;
	i:any;
	contactnumbers:any;
	contactnames:any;
  key:any;

  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  	}

  ionViewDidLoad() {


  }
 
 
  presentPrompt() {
    console.log(this.key);
  const alert = this.alertCtrl.create({
    title: 'Contact Details',
    inputs: [
      {
        name: 'contactname',
        placeholder: 'Contact Name'
      },
      {
        name: 'contactnumber',
        placeholder: 'Contact Number',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Save Contact',
        handler: data => {
          if (data.contactnumber.length!=10) {
            window.alert("Invalid Number");
          } 
          else if(data.contactname.length<=1) {

            window.alert("Name cant be blank");
          }
          else{
          		this.saveData(data.conatactnumber,data.contactname);

          }
        }
      }
    ]
  });
  alert.present();
}

  saveData(contactname:string,contactnumber:number): Promise<any> {
    
  return firebase.database().ref(`/userProfile/`).set({
    ContactName: contactname,
    ContactNumber: contactnumber
  });
  
}

}
