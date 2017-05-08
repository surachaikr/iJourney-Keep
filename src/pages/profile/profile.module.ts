import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { AppVersionComponentModule } from "../../components/app-version/app-version.module";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AppVersionComponentModule
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {}
