import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthDataProvider } from "../../providers/auth-data/auth-data";
import { BasePage } from "../../lib/base-page";
import firebase from "firebase";
import { JourneyDataProvider } from "../../providers/journey-data/journey-data";

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
  public journeyList: Array<any>;

  constructor(public navCtrl: NavController, public authData: AuthDataProvider, public jnProvider: JourneyDataProvider) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    this.jnProvider.getJourneyList().then(listSnap => {
      console.log(JSON.stringify(listSnap));
      this.journeyList = listSnap;
    });
  }

  openProfile() {
    let currentUser = firebase.auth().currentUser;
    if(currentUser && !currentUser.isAnonymous) {
      this.navCtrl.push('ProfilePage');
    }else{
      this.navCtrl.push('SignupPage');
    }
  }

  addNewJourney() {
    this.navCtrl.push('JourneyCreatePage');
  }
}
