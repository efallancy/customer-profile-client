import { constructUrlQuery } from '../api'

describe('URL query utils', () => {
  it('should construct query string from input object', () => {
    const queryObject = {
      name: 'customer',
      age: 42,
    };
    const result = '?name=customer&age=42';
    expect(constructUrlQuery(queryObject)).toBe(result);
  });

  it('should return empty query string when no input object is passed as argument', () => {
    expect(constructUrlQuery()).toBe('');
  });
});
