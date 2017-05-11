import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JourneyData, JourneyDataProvider } from "../../providers/journey-data/journey-data";

/**
 * Generated class for the JourneyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-journey-detail',
  templateUrl: 'journey-detail.html',
})
export class JourneyDetailPage {
  public journey: JourneyData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public jnProvider: JourneyDataProvider, public modalCtrl: ModalController) {
    if(!this.navParams.get('journeyKey')) {
      this.navCtrl.setRoot('HomePage');
    }else{
      this.jnProvider.getJourneyDetail(this.navParams.get('journeyKey')).then( snap => {
        this.journey = snap;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyDetailPage');
  }

  goToEdit() {
    const updateModal = this.modalCtrl.create('JourneyEditPage', {journey: this.journey});
    updateModal.present();
  }

  openMap() {
    this.navCtrl.push('MapOnlyViewPage', {locationPos: this.journey.locationGPS});
  }
}
