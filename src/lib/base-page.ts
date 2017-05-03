import { NavController } from 'ionic-angular';
import firebase from "firebase";


export class BasePage {
  constructor(public navCtrl: NavController) {
    if(!firebase.auth().currentUser) {
      console.log("Try to access secure page without authen.");
      this.navCtrl.setRoot('LandingPage');
    }
  }
}
