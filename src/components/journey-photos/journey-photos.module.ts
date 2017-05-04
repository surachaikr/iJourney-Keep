import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyPhotosComponent } from './journey-photos';
import { DummyArrayPipeModule } from "../../pipes/dummy-array/dummy-array.module";

@NgModule({
  declarations: [
    JourneyPhotosComponent,
  ],
  imports: [
    IonicPageModule.forChild(JourneyPhotosComponent),
    DummyArrayPipeModule.forRoot()
  ],
  exports: [
    JourneyPhotosComponent
  ]
})
export class JourneyPhotosComponentModule {}
