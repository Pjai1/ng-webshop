import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priceFormat' })
export class PriceFormatPipe implements PipeTransform {
  transform(value: number) {
    if (value === undefined) {
      return;
    } else {
      return '\u20AC ' + Math.round(value * 100) / 100;
    }
  }
}
