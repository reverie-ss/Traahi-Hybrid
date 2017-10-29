import {Injectable} from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthProvider {
  constructor() {}
  loginUser(email: string, password: string): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
signupUser(email: string, password: string, volunteer:boolean): Promise<any> {
  return firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then( newUser => {
    firebase
    .database()
    .ref('/userProfile')
    .child(newUser.uid)
    .set({ email: email, volunteer:volunteer,uID:newUser.uid })
    ;
  });
}
}