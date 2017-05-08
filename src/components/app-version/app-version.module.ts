import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppVersionComponent } from './app-version';

@NgModule({
  declarations: [
    AppVersionComponent,
  ],
  imports: [
    IonicPageModule.forChild(AppVersionComponent),
  ],
  exports: [
    AppVersionComponent
  ]
})
export class AppVersionComponentModule {}
