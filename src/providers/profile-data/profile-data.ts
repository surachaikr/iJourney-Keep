import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the ProfileDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileDataProvider {

  constructor() {
    console.log('Hello ProfileDataProvider Provider');
  }

  getUserProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(firebase.auth().currentUser.uid)
        .on('value', data => {
          resolve(data.val());
        });
    });
  }

  updateName(firstName: string, lastName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
      .child(firebase.auth().currentUser.uid).update({
        firstName: firstName,
        lastName: lastName
      });
  }

  updateDateOfBirth(birthDate: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
      .child(firebase.auth().currentUser.uid).update({
        birthDate: birthDate
      });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
    return firebase.auth().currentUser.reauthenticate(credential).then(user => {
      firebase.auth().currentUser.updateEmail(newEmail).then(user => {
        firebase.database().ref('/userProfile')
          .child(firebase.auth().currentUser.uid).update({
            email: newEmail
        });
      });
    });
  }

  updatePassword(newPass: string, oldPass: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, oldPass);
    return firebase.auth().currentUser.reauthenticate(credential).then(user => {
      firebase.auth().currentUser.updatePassword(newPass).then(user => {
        console.log("Password changed.");
      }, error => {
        console.log(error);
      });
    });
  }


}
