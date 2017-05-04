import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public authData: AuthDataProvider, public jnProvider: JourneyDataProvider, public alertCtrl: AlertController) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    this.jnProvider.getJourneyList().then(listSnap => {
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
    let currentUser = firebase.auth().currentUser;
    if(currentUser && currentUser.isAnonymous && this.journeyList && this.journeyList.length > 3) {
      const alert = this.alertCtrl.create({
        title: 'Require signup.',
        message: 'Please signup new account before add more journey.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.push('SignupPage');
            }
          },
        ]
      });
      alert.present();
    }else{
      this.navCtrl.push('JourneyCreatePage');
    }
  }

  goToDetail(key) {
    this.navCtrl.push('JourneyDetailPage', {journeyKey: key});
  }

}
