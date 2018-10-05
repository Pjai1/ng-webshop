import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  transform(value: any) {
    if (!value) {
      return value;
    }

    if (typeof value !== 'number' && typeof value !== 'string') {
      return value;
    }

    const rawValue = parseFloat(<any>value);
    return new Intl.NumberFormat(this.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(
      rawValue,
    );
  }
}
