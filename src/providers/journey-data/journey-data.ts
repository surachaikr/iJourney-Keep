import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the JourneyDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class JourneyData {
  key: string;
  title: string;
  note: string;
  dateTime: string;
  location: string;
  locationGPS: google.maps.LatLng;
  stars: number;
}

@Injectable()
export class JourneyDataProvider {

  constructor() {
    console.log('Hello JourneyDataProvider Provider');
  }


  createJourney(journey: JourneyData): firebase.Promise<any> {
    let lat: number = null;
    let lng: number = null;
    if (journey.locationGPS) {
      lat = journey.locationGPS.lat();
      lng = journey.locationGPS.lng();
    }
    return firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
      .push({
        title: journey.title,
        note: journey.note,
        dateTime: journey.dateTime,
        location: journey.location,
        latitude: lat,
        longitude: lng,
        stars: journey.stars,
      });
  }

  updateJourney(journey: JourneyData): firebase.Promise<any> {
    let lat: number = null;
    let lng: number = null;
    if (journey.locationGPS) {
      lat = journey.locationGPS.lat();
      lng = journey.locationGPS.lng();
    }
    return firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
      .child(journey.key).update({
        title: journey.title,
        note: journey.note,
        dateTime: journey.dateTime,
        location: journey.location,
        latitude: lat,
        longitude: lng,
        stars: journey.stars,
      });
  }

  getJourneyList(): Promise<JourneyData[]> {
    return new Promise((resolve, reject) => {
      let count: number = 0;
      let intervalId = setInterval(() => {
        count++;
        if (firebase.auth().currentUser || count > 10) {
          clearInterval(intervalId);

          if (firebase.auth().currentUser) {
            firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
              .orderByChild('dateTime')
              .on('value', snapshot => {
                let rawList = [];
                snapshot.forEach(snap => {
                  let itm: JourneyData = new JourneyData();
                  itm.key = snap.key;
                  itm.title = snap.val().title;
                  itm.note = snap.val().note;
                  itm.dateTime = snap.val().dateTime;
                  itm.location = snap.val().location;
                  if (snap.val().latitude && snap.val().longitude) {
                    itm.locationGPS = new google.maps.LatLng(snap.val().latitude, snap.val().longitude);
                  }
                  itm.stars = snap.val().stars;
                  rawList.push(itm);
                  return false;
                });
                resolve(rawList.reverse());
              });
          } else {
            console.log('Time out');
            reject(null);
          }
        }
      }, 100);
    });
  }

  getJourneyDetail(journeyKey: string): Promise<JourneyData> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/journeyList`)
        .child(journeyKey).on('value', snap => {
          let itm: JourneyData = new JourneyData();
          itm.key = snap.key;
          itm.title = snap.val().title;
          itm.note = snap.val().note;
          itm.dateTime = snap.val().dateTime;
          itm.location = snap.val().location;
          if (snap.val().latitude && snap.val().longitude) {
            itm.locationGPS = new google.maps.LatLng(snap.val().latitude, snap.val().longitude);
          }
          itm.stars = snap.val().stars;
          resolve(itm);
        });
    });
  }

  addPhoto(journeyKey, photo) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/journeyPhoto/${firebase.auth().currentUser.uid}/${journeyKey}`)
        .push().then(newDbPhoto => {
          firebase.storage().ref('/journeyPhoto/').child(firebase.auth().currentUser.uid)
            .child(journeyKey).child(newDbPhoto.key)
            .putString(photo, 'base64', { contentType: 'image/png' })
            .then((savePhoto) => {
              firebase.database().ref(`/journeyPhoto/${firebase.auth().currentUser.uid}/${journeyKey}`)
                .child(newDbPhoto.key).set(savePhoto.downloadURL).then(snap => {
                  resolve(savePhoto.downloadURL);
                });
            });
        });
    });
  }

  getAllPhotos(journeyKey) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/journeyPhoto/${firebase.auth().currentUser.uid}/${journeyKey}`)
        .on('value', snapShot => {
          let res = [];
          snapShot.forEach((snap) => {
            res.push(snap.val());
            return false;
          });

          resolve(res);
        });
    });
  }
}
