import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public journey:JourneyData

  constructor(public navCtrl: NavController, public navParams: NavParams, public jnProvider: JourneyDataProvider) {
    this.journey = new JourneyData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyCreatePage');
  }

  createJourney() {
    this.jnProvider.createJourney(this.journey).then(newJourney => {
      this.navCtrl.pop();
    });
  }
}
