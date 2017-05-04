import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public jnProvider: JourneyDataProvider) {
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

}
