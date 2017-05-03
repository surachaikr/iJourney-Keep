import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from "firebase";

/*
  Generated class for the AuthDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthDataProvider {

  constructor() {
    console.log('Hello AuthDataProvider Provider');
  }

  signInAnonymously(): any {
    return firebase.auth().signInAnonymously();
  }

  login(email: string, password: string): any {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(): firebase.Promise<void> {
    firebase.database().ref('/userProfile')
      .child(firebase.auth().currentUser.uid).off();
    return firebase.auth().signOut();
  }

  createAccount(email: string, password: string): any {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      //link to current user.
      return new Promise<any>(resolve => {
        let credential = firebase.auth.EmailAuthProvider.credential(email, password);
        currentUser.link(credential).then((user) => {
          console.log("Link account success.");
          firebase.database().ref('/userProfile').child(currentUser.uid).update({email: email});
          resolve(user);
        }, (error) => {
          console.log("Link account error.", error);
          resolve(null);
        });
      });
    } else {
      //create new account
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        firebase.database().ref('/userProfile').child(user.uid).update({email: email});
      });
    }
  }

  sendResetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
