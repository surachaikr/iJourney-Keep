import { LoadingController, ModalController } from 'ionic-angular';
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

  constructor(public cameraPlugin: Camera, public jnProvider: JourneyDataProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    console.log('Hello JourneyPhotosComponent Component');
  }

  ngOnInit() {
    this.jnProvider.getAllPhotos(this.journeyKey).then(res => {
      this.photos = res;
    });
  }

  addImage() {
    this.cameraPlugin.getPicture({
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      // targetWidth: 500,
      // targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      //Save picture to database
      const loading = this.loadingCtrl.create();
      this.jnProvider.addPhoto(this.journeyKey, imageData).then(newPhoto => {
        if (newPhoto && newPhoto != "") {
          this.photos.push(newPhoto);
          loading.dismiss();
        }
      });
      loading.present();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  openPopPhoto(photo) {
    const modal = this.modalCtrl.create('PhotoPopupPage', {photoSrc: photo});
    modal.present();
  }
}
