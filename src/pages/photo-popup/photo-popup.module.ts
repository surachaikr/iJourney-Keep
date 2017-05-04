import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoPopupPage } from './photo-popup';

@NgModule({
  declarations: [
    PhotoPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoPopupPage),
  ],
  exports: [
    PhotoPopupPage
  ]
})
export class PhotoPopupPageModule {}
