import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthDataProvider } from "../../providers/auth-data/auth-data";

/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public authData: AuthDataProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  goToHome() {
    const loading = this.loadingCtrl.create();
    loading.present();

    this.authData.signInAnonymously().then((user) => {
      console.log("uid = " + user.uid);
      loading.dismiss().then(() => {
        this.navCtrl.setRoot('HomePage');
      });
    });

  }

  goToLogin() {
    this.navCtrl.push('LoginPage');
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

  loginFacebook() {
    this.authData.loginFacebook().then((res) => {
      this.navCtrl.setRoot('HomePage');
      loading.dismiss();
    }).catch(err => {
      console.log('Error: ', err);
      loading.dismiss();
    });

    const loading = this.loadingCtrl.create();
    loading.present();
  }
}
