import firebase from 'firebase';
import { Platform, LoadingController, ModalController } from 'ionic-angular';
import { JourneyDataProvider } from '../../providers/journey-data/journey-data';
import { Camera } from '@ionic-native/camera';
import { Component, Input } from '@angular/core';


/**
 * Generated class for the JourneyPhotosComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'journey-photos',
  templateUrl: 'journey-photos.html'
})
export class JourneyPhotosComponent {
  @Input() journeyKey: any;
  public photos: any;
  public isCordova: boolean = false;
  private photoAddHandler: any;

  constructor(public cameraPlugin: Camera, public jnProvider: JourneyDataProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public platform: Platform) {
    console.log('Hello JourneyPhotosComponent Component');
    platform.ready().then(() => {
      this.isCordova = platform.is('cordova');
    });
    this.photos = [];
  }

  ngOnInit() {
    // this.jnProvider.getAllPhotos(this.journeyKey).then(res => {
    //   this.photos = res;
    // });

    var me = this;
    this.photoAddHandler = firebase.database().ref(`/journeyPhoto/${firebase.auth().currentUser.uid}/${this.journeyKey}`)
      .on('child_added', snapShot => {
        console.log('child add: ', JSON.stringify(snapShot));
        me.photos.push(snapShot.val());
      });
  }

  ngOnDestroy() {
    this.photoAddHandler = firebase.database().ref(`/journeyPhoto/${firebase.auth().currentUser.uid}/${this.journeyKey}`).off('child_added', this.photoAddHandler);
  }

  addImage() {
    const loading = this.loadingCtrl.create();
    this.cameraPlugin.getPicture({
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      //Save picture to database
      this.jnProvider.addPhoto(this.journeyKey, imageData).then(newPhoto => {
        loading.dismiss();
      });
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
    loading.present();
  }

  openPopPhoto(photo) {
    const modal = this.modalCtrl.create('PhotoPopupPage', { photoSrc: photo });
    modal.present();
  }
}
