import { PriceFormatPipe } from './price-format.pipe';

describe('Price Format Pipe', () => {
  let priceFormatPipe: PriceFormatPipe;
  beforeEach(() => {
    priceFormatPipe = new PriceFormatPipe();
  });

  it('should format the price and add a euro sign', () => {
    const formattedNumber = priceFormatPipe.transform(16.67889999);

    expect(formattedNumber).toContain('€');
    expect((formattedNumber + '').split('.')[1].length).toEqual(2);
  });
});
