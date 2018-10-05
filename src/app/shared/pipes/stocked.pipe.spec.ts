import { StockedPipe } from './stocked.pipe';

describe('Stocked Pipe', () => {
  let stockedPipe: StockedPipe;
  beforeEach(() => {
    stockedPipe = new StockedPipe();
  });

  it('should change the boolean value', () => {
    expect(stockedPipe.transform(true)).toBe('In stock');
    expect(stockedPipe.transform(false)).toBe('Out of stock');
  });

  it('should return null and undefined', () => {
    expect(stockedPipe.transform(undefined)).toBe(undefined);
    expect(stockedPipe.transform(null)).toBe(null);
  });

  it('should return its primary value when it\'s not a number or a string', () => {
    const date = new Date();
    expect(stockedPipe.transform(date)).toBe(date);
    expect(stockedPipe.transform('wow')).toBe('wow');
  });
});
