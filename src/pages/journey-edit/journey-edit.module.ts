import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyEditPage } from './journey-edit';

@NgModule({
  declarations: [
    JourneyEditPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyEditPage),
  ],
  exports: [
    JourneyEditPage
  ]
})
export class JourneyEditPageModule {}
