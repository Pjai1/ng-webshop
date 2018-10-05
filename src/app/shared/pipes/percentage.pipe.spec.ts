import { PercentagePipe } from './percentage.pipe';

describe('Price Format Pipe', () => {
  let pipe: PercentagePipe;
  beforeEach(() => {
    pipe = new PercentagePipe('nl-BE');
  });

  it('should transform numbers between 0 and 1 to a percentage', () => {
    expect(pipe.transform(1)).toBe('100%');
    expect(pipe.transform(0.9)).toBe('90%');
    expect(pipe.transform(0)).toBe(0);
  });

  it('should sample numeric values above 1', () => {
    expect(pipe.transform(10)).toBe('1.000%');
    expect(pipe.transform(100)).toBe('10.000%');
  });

  it('should return null and undefined', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
    expect(pipe.transform(null)).toBe(null);
  });

  it('should return its primary value when it\'s not a number', () => {
    const date = new Date();
    expect(pipe.transform(date)).toBe(date);
    expect(pipe.transform('wow')).toBe('wow');
  });
});
