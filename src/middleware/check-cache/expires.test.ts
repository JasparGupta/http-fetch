import PlainObjectDriver from '@jaspargupta/cache-manager/dist/drivers/plain-object';
import expires from './expires';
import { Cache } from '../../types';

describe('expires', () => {
  test.each<[Cache, Date | null]>([
    [true, null],
    (() => {
      const date = new Date();

      return [date, date];
    })(),
    [{ driver: new PlainObjectDriver() }, null],
    (() => {
      const date = new Date();

      return [{ driver: new PlainObjectDriver(), expires: date }, date];
    })(),
  ])('returns the cache expires value', (cache, expected) => {
    expect(expires(cache)).toEqual(expected);
  });
});
