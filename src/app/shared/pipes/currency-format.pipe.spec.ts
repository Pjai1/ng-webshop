import { CurrencyFormatPipe } from './currency-format.pipe';

describe('Price Format Pipe', () => {
  let currencyFormatPipe: CurrencyFormatPipe;
  beforeEach(() => {
    currencyFormatPipe = new CurrencyFormatPipe('nl-BE');
  });

  it('should format the price and add a euro sign when it\'s a number', () => {
    const formattedNumber = currencyFormatPipe.transform(16.67889999);
    expect(formattedNumber).toContain('€');
    expect(formattedNumber.length).toBe(7);
  });

  it('should format the price and add a euro sign when it\'s a string', () => {
    const formattedNumber = currencyFormatPipe.transform('16.67889999');
    expect(formattedNumber).toContain('€');
    expect(formattedNumber.length).toBe(7);
  });

  it('should return null and undefined', () => {
    expect(currencyFormatPipe.transform(undefined)).toBe(undefined);
    expect(currencyFormatPipe.transform(null)).toBe(null);
  });

  it('should return its primary value when it\'s not a number or a string', () => {
    const date = new Date();
    expect(currencyFormatPipe.transform(date)).toBe(date);
  });
});
