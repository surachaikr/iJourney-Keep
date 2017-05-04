import { Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the DummyArrayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dummyArray',
  pure: false
})
export class DummyArrayPipe implements PipeTransform {
  transform(value: number, ...args) {
    let res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }
}

@Pipe({
  name: 'starColor',
  pure: false
})
export class StarColorPipe implements PipeTransform {
  transform(value: number, ...args) {
    if(value >= 5) {
      return 'danger';
    }else if(value >= 3) {
      return 'primary';
    }else{
      return null;
    }
  }
}
