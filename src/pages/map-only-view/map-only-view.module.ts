import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapOnlyViewPage } from './map-only-view';

@NgModule({
  declarations: [
    MapOnlyViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MapOnlyViewPage),
  ],
  exports: [
    MapOnlyViewPage
  ]
})
export class MapOnlyViewPageModule {}
