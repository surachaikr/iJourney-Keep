import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { DummyArrayPipeModule } from "../../pipes/dummy-array/dummy-array.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    DummyArrayPipeModule
  ],
  exports: [
    HomePage,
  ]
})
export class HomePageModule {}
