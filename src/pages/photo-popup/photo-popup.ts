import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhotoPopupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-photo-popup',
  templateUrl: 'photo-popup.html',
})
export class PhotoPopupPage {
  public photoSrc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(!navParams.get('photoSrc')) {
      navCtrl.pop();
    }else{
      this.photoSrc = navParams.get('photoSrc');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPopupPage');
  }

  closePopup() {
    this.navCtrl.pop();
  }

}
