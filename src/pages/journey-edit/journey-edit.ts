import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JourneyDataProvider, JourneyData } from "../../providers/journey-data/journey-data";

/**
 * Generated class for the JourneyEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-journey-edit',
  templateUrl: 'journey-edit.html',
})
export class JourneyEditPage {
  public journey: JourneyData = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public jnProvider: JourneyDataProvider, public modalCtrl: ModalController) {
    this.journey = this.navParams.get('journey');
    if(!this.journey) {
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyEditPage');
  }

  cancelEdit() {
    this.navCtrl.pop();
  }

  updateJourney() {
    this.jnProvider.updateJourney(this.journey).then(() => {
      this.navCtrl.pop();
    });
  }

  openMap() {
    const modalLocation = this.modalCtrl.create('MapViewPage', {locationPos: this.journey.locationGPS});
    modalLocation.onDidDismiss((pos) => {
      if(pos && pos.locationPos) {
        console.log(JSON.stringify(pos));
        this.journey.locationGPS = pos.locationPos;
      }
    });
    modalLocation.present();
  }
}
