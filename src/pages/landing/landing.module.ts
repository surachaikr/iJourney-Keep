import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingPage } from './landing';
import { AppVersionComponentModule } from "../../components/app-version/app-version.module";

@NgModule({
  declarations: [
    LandingPage,
  ],
  imports: [
    IonicPageModule.forChild(LandingPage),
    AppVersionComponentModule
  ],
  exports: [
    LandingPage
  ]
})
export class LandingPageModule {}
