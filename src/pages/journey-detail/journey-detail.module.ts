import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyDetailPage } from './journey-detail';
import { DummyArrayPipeModule } from "../../pipes/dummy-array/dummy-array.module";

@NgModule({
  declarations: [
    JourneyDetailPage
  ],
  imports: [
    IonicPageModule.forChild(JourneyDetailPage),
    DummyArrayPipeModule.forRoot()
  ],
  exports: [
    JourneyDetailPage
  ]
})
export class JourneyDetailPageModule {}
