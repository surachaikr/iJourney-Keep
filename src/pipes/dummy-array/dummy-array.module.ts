import { NgModule } from '@angular/core';
import { DummyArrayPipe, StarColorPipe } from "../dummy-array/dummy-array";

@NgModule({
  imports: [],
  declarations: [DummyArrayPipe, StarColorPipe],
  exports: [DummyArrayPipe, StarColorPipe],
})

export class DummyArrayPipeModule {

  static forRoot() {
    return {
      ngModule: DummyArrayPipeModule,
      providers: [],
    };
  }
}
