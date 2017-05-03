import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthDataProvider } from "../providers/auth-data/auth-data";

import firebase from "firebase";

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LandingPage';
  zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authData: AuthDataProvider) {
    firebase.initializeApp({
      apiKey: "AIzaSyBJhHRIS38XKyLHDE71UH7CE_J0HP9QR64",
      authDomain: "ks-firebase-journey.firebaseapp.com",
      databaseURL: "https://ks-firebase-journey.firebaseio.com",
      projectId: "ks-firebase-journey",
      storageBucket: "ks-firebase-journey.appspot.com",
      messagingSenderId: "719757208855"
    });

    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged');
      this.zone.run(() => {
        if(!user) {
          this.rootPage = 'LandingPage';
          unsubscribe();
        }else{
          this.rootPage = 'HomePage';
          unsubscribe();
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

