import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { Transfer } from 'ionic-native';
import { Http, Headers } from '@angular/http';
import {FormControl} from '@angular/forms';

export class Toolbox {




	constructor() {

	}


    static haveInternet(): boolean {
    	let network = new Network();
    	console.log("printing network type");
    	console.log(network.type);
    	if (network.type == "ethernet" || network.type == "wifi" || network.type == "2g" || network.type == "3g"
    		|| network.type == "4g" || network.type == "cellular") {
    		console.log("Have Internet");
    	return true;
    }
    else {
    	console.log("No Internet");
    	return false;
    }
}

static listenNetwork(userdata: any, app_component: any) {
	let network = new Network();
	network.onDisconnect().subscribe(() => {
		console.log('network was disconnected');
		userdata.networkStatus = false;
		if (userdata.appInitialised && userdata.waitingForInternetPopup == undefined) {
			// Only show the "No internet" popup once if internet loss has already been detected.
			userdata.waitingForInternetPopup = userdata.pop_alert("Sorry", "An internet connection is required to use this app. " +
				"Once internet is available, this app will resume automatically.",
				[], false);
		}
		console.log("printing no internet popup");
		console.log(userdata.waitingForInternetPopup);
	});

	network.onConnect().subscribe(() => {
		console.log('network connected');
		userdata.networkStatus = true;
		if (userdata.waitingForInternet) {
			userdata.waitingForInternet = false;
			app_component.initializeApp();
		}
		else if (userdata.waitingForInternetPopup) {
			userdata.waitingForInternetPopup.dismiss();
			userdata.waitingForInternetPopup = undefined;
		}
	});
}

static listenFirebaseNotification(platform: any, firebase: any, userdata: any, xml_rpc: any, navCtrl: any,
	message_page: any, topnavheader: any) {
	if (platform.is("ios")) {
		console.log("detected this phone is ios");
		firebase.grantPermission();
	}
	firebase.onTokenRefresh().subscribe((token) => {
		console.log("token refreshed");
		console.log(token);
		this.checkFirebaseToken(token, userdata, xml_rpc);
	},
	(error) => {
		console.log("error refreshing token");
		console.log(error);
	});

	firebase.onNotificationOpen().subscribe((notification) => {
		console.log("notification received");
		console.log(notification);
		topnavheader.RIGHTHANDBUTTONS.NOTIFICATION.unread_msg_number = topnavheader.RIGHTHANDBUTTONS.NOTIFICATION.unread_msg_number + 1;
		let alert = userdata.pop_alert("New message received", notification.title,
			[
			{
				text: 'See message',
				handler: () => {
					alert.dismiss().then(() => {
						navCtrl.push(message_page, {message_id: notification.message_id});
					});
					return false;
				}
			},
			{
				text: 'Dismiss',
				role: 'cancel'
			}
			])
		// acknowledge message at backend
		Promise.resolve("proceed")
		.then((proceed) => {
			console.log("acknowledging message");
			return this.acknowledge_message_sent(notification.message_id, userdata, xml_rpc);
		}).catch((error) => {
			console.log("Error acknowledging message");
		});
	},
	(error) => {
		console.log("error receiving notification");
		console.log(error);
	});
}

static checkFirebaseToken(actualFirebaseToken: string, userdata: any, xml_rpc: any) {
		/* Get firebase token then check if its different from the one stored in localdb
		If localdb firebase token is empty string, xmlrpc to backend to register new firebase token
		If localdb firebase token is not empty string and same as token, no action to be taken.
		If localdb firebase token is not empty string and different from token, xmlrpc to backend to update new token
		*/
		Promise.resolve("proceed")
		.then((res) => {
			return userdata.getValue("firebaseToken");
		}).then((localFirebaseToken: string) => {
			console.log("Local firebase token is: " + localFirebaseToken);
			console.log("Actual firebase token is: " + actualFirebaseToken);
			if (!localFirebaseToken) {
				// register new token to backend``
				console.log("registering new token");
				// save firebase token to localdb
				userdata.localdb.set("firebaseToken", actualFirebaseToken);
				return this.register_new_firebase_token(actualFirebaseToken, userdata, xml_rpc);
			}
			else if (localFirebaseToken && localFirebaseToken != actualFirebaseToken) {
				// update new token to backend
				console.log("updating new token");
				userdata.localdb.set("firebaseToken", actualFirebaseToken);
				return this.update_new_firebase_token(localFirebaseToken, actualFirebaseToken, userdata, xml_rpc);
			}
		}).catch((error) => {
			console.log("Error at checkFirebaseToken during app init");
			// don't crash app. Just proceed.
		});
	}

	static register_new_firebase_token(new_token:string, userdata: any, xml_rpc: any): Promise<any> {
		return new Promise((resolve, reject) => {
			let new_token_values = {
				user_id: userdata.uid,
				token: new_token
			}
			console.log("printing user credentials");
			console.log(userdata);
			xml_rpc.call_api("xt.firebase.token", "create_token", [new_token_values],{},
				(error, new_token_id) => {
					if (error) {
						console.log("Error at toolbox register_new_firebase_token()");
						console.log(error);
						reject(error);
					}
					else {
						resolve(new_token_id);
					}
				});
		});
	}

	static update_new_firebase_token(old_token:string, new_token:string, userdata: any, xml_rpc: any): Promise<any> {
		return new Promise((resolve, reject) => {
			let new_token_values = {
				user_id: userdata.uid,
				token: new_token
			}
			console.log("printing user credentials");
			console.log(userdata);
			xml_rpc.call_api("xt.firebase.token", "update_token", [old_token, new_token, userdata.uid],{},
				(error, result) => {
					if (error) {
						console.log("Error at toolbox update_new_firebase_token()");
						console.log(error);
						reject(error);
					}
					else {
						resolve("proceed");
					}
				});
		});
	}

	static checkFileExist(dirPath: string, filename: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let file = new File();
			console.log("trying to find this file: " + dirPath + filename);
			file.checkFile(dirPath, filename)
			.then((exist) => {
				resolve(exist);
			}).catch((error) => {
				console.log("Error at Toolbox checkFileExist");
				console.log(error);
				reject(error);
			});
		});
	}

	// static download_resource(resource_url, targetPath, filename): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		let fileTransfer = new Transfer();
	// 		console.log("filename:" + filename);
	// 		console.log("targetPath:" + targetPath);
	// 		resource_url = Toolbox.fully_qualify_path(resource_url);
	// 		fileTransfer.download(resource_url, targetPath + filename)
	// 		.then((fileEntry: any) => {
	// 			console.log('download complete, opening resource');
	// 			console.log(fileEntry);
	// 			resolve(fileEntry.nativeURL);
	// 		}).catch((error) => {
	// 			console.log("Error at toolbox download_resource()");
	// 			console.log(error);
	// 			reject(error);
	// 		});
	// 	});
	// }

	// static open_resource(resource_native_url): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		let resource_native_url_arr = resource_native_url.split(".");
	// 		let resource_file_type = resource_native_url_arr[resource_native_url_arr.length - 1];
	// 		let file_mime_type:string = "";
	// 		if (resource_file_type == "jpg" || resource_file_type == "jpeg") {
	// 			file_mime_type = "image/jpeg";
	// 		}
	// 		else if (resource_file_type == "png") {
	// 			file_mime_type = "image/png";
	// 		}
	// 		else if (resource_file_type == "pdf") {
	// 			file_mime_type = "application/pdf";
	// 		}
	// 		let fileopener = new FileOpener();
	// 		fileopener.open(resource_native_url, file_mime_type)
	// 		.then(() => {
	// 			console.log("resource opened");
	// 			resolve("proceed");
	// 		}).catch((error) => {
	// 			console.log("error opening resource");
	// 			console.log(error);
	// 			reject(error);
	// 		});
	// 	});
	// }

	static upload_photo_to_google_vision(photo: string, http: Http): Promise<any> {
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			headers.append("Content-Type","application/json");
			let body = {
				"requests":[
				{
					"image":{
						"content":photo
					},
					"features":[
					{
						"type":"TEXT_DETECTION"
					},
					{
						"type":"LOGO_DETECTION"
                    }/*,
					{
                      "type":"LABEL_DETECTION"
                  }*/
                  ]
              }
              ]
          }

          http.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAte0aN6JdRCHpehzpwmebaKeqolfgnk5o", JSON.stringify(body),
          	{headers: headers})
          .map(response => response.json())
          .subscribe(data => {
          	console.log("response from google vision");
          	console.log(data);
          	resolve(data);
          })
      });
	}

	static isValidMailFormat(control: FormControl){

		let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (control.value == "" || (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {

			return { "Please provide a valid email": true };
		}

		return null;
	}

	static isValidNumberFormat(control: FormControl){
		let NUMBER_REGEXP =  /^((\+91\s{0,1}\-\s{0,1})|(\+91{\s{0,1}})|(\+91\s{0,1})|(91\s{0,1})|(0))?(\d{10})$/;

		if (control.value == "" || (control.value.length < 10 || !NUMBER_REGEXP.test(control.value))) {

			return { "Please provide a valid number": true };
		}
		return null;
	}

	static isValidPasswordFormat(control: FormControl){
		let PASSWORD_REGEX = /(?=^.{6,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

		if (control.value == "" || !PASSWORD_REGEX.test(control.value)) {

			return { "Please provide a valid number": true };
		}
		return null;

	}

}
