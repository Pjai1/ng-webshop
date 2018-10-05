import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stocked' })
export class StockedPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === undefined || value === null) {
      return value;
    }
    if (typeof value !== 'boolean') {
      return value;
    }
    return value === true ? 'In stock' : 'Out of stock';
  }
}
