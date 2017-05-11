import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JourneyDataProvider, JourneyData } from "../../providers/journey-data/journey-data";

/**
 * Generated class for the JourneyCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-journey-create',
  templateUrl: 'journey-create.html',
})
export class JourneyCreatePage {
  public journey: JourneyData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public jnProvider: JourneyDataProvider, public modalCtrl: ModalController) {
    this.journey = new JourneyData();
    var date = new Date();
    var tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    // => '2015-01-26T06:40:36.181'
    this.journey.dateTime = localISOTime;
    this.journey.stars = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyCreatePage');
  }

  createJourney() {
    this.jnProvider.createJourney(this.journey).then(newJourney => {
      this.navCtrl.pop();
    }).catch(error => {
      console.log(error.message);
    });
  }

  openMap() {
    const modalLocation = this.modalCtrl.create('MapViewPage');
    modalLocation.onDidDismiss((pos) => {
      if(pos && pos.locationPos) {
        console.log(JSON.stringify(pos));
        this.journey.locationGPS = pos.locationPos;
      }
    });
    modalLocation.present();
  }

}
