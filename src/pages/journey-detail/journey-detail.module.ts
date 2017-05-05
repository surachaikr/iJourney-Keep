import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyDetailPage } from './journey-detail';
import { DummyArrayPipeModule } from "../../pipes/dummy-array/dummy-array.module";
import { JourneyPhotosComponentModule } from "../../components/journey-photos/journey-photos.module";

@NgModule({
  declarations: [
    JourneyDetailPage
  ],
  imports: [
    IonicPageModule.forChild(JourneyDetailPage),
    DummyArrayPipeModule,
    JourneyPhotosComponentModule
  ],
  exports: [
    JourneyDetailPage
  ]
})
export class JourneyDetailPageModule {}
