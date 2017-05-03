import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyCreatePage } from './journey-create';

@NgModule({
  declarations: [
    JourneyCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyCreatePage),
  ],
  exports: [
    JourneyCreatePage
  ]
})
export class JourneyCreatePageModule {}
