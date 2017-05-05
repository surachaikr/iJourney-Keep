import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyPhotosComponent } from './journey-photos';

@NgModule({
  declarations: [
    JourneyPhotosComponent,
  ],
  imports: [
    IonicPageModule.forChild(JourneyPhotosComponent),
  ],
  exports: [
    JourneyPhotosComponent
  ]
})
export class JourneyPhotosComponentModule {}
