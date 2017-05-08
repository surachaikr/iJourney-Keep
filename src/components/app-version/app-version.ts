import { ModalController } from 'ionic-angular';
import { Component } from '@angular/core';


/**
 * Generated class for the AppVersionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-version',
  templateUrl: 'app-version.html'
})
export class AppVersionComponent {

  constructor(public modalCtrl: ModalController) {
    console.log('Hello AppVersionComponent Component');
  }

  openAbout() {
    const aboutModal = this.modalCtrl.create('AboutPage');
    aboutModal.present();
  }
}
