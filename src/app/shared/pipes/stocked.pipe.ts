import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stocked' })
export class StockedPipe implements PipeTransform {
  transform(value: boolean) {
    return value === true ? 'In stock' : 'Out of stock';
  }
}
