import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from "firebase";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

/*
  Generated class for the AuthDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthDataProvider {

  constructor(public platform: Platform, public fb: Facebook) {
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
          firebase.database().ref('/userProfile').child(currentUser.uid).update({ email: email });
          resolve(user);
        }, (error) => {
          console.log("Link account error.", error);
          resolve(null);
        });
      });
    } else {
      //create new account
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        firebase.database().ref('/userProfile').child(user.uid).update({ email: email });
      });
    }
  }

  sendResetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  loginFacebook(): any {
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios') || this.platform.is('android')) {
        this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => {
          let credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(credential).then(user => {
            this.checkProfile(user);
            resolve(user);
          }).catch(err => {
            reject(err);
          });
        }).catch(err => {
          reject(err);
        });
      } else {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        provider.addScope('email');
        provider.setCustomParameters({
          'display': 'popup'
        });
        firebase.auth().signInWithPopup(provider).then((result) => {
          console.log('accessToken = ', result.credential.accessToken);
          console.log('User = ', JSON.stringify(result.user));
          this.checkProfile(result.user);
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }

  private checkProfile(user: any): void {
    console.log("Check profile user id: ", user.uid);
    firebase.database().ref('/userProfile').child(user.uid).update({
      email: user.email
    });
  }
}
