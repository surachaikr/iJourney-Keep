import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthDataProvider } from "../../providers/auth-data/auth-data";
import { BasePage } from "../../lib/base-page";
import firebase from "firebase";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BasePage {

  constructor(public navCtrl: NavController, public authData: AuthDataProvider) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openProfile() {
    let currentUser = firebase.auth().currentUser;
    if(currentUser && !currentUser.isAnonymous) {
      this.navCtrl.push('ProfilePage');
    }else{
      this.navCtrl.push('SignupPage');
    }
  }
}
