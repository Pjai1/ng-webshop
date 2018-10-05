import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';

@Pipe({ name: 'percentage' })
export class PercentagePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  transform(value: any) {
    if (!value) {
      return value;
    }

    if (typeof value !== 'number') {
      return value;
    }
    return new Intl.NumberFormat(this.locale, {
      style: 'percent',
      // minimumIntegerDigits: 2,
      // maximumFractionDigits: 1,
    }).format(value);
  }
}
