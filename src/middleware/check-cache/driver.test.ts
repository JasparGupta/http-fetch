/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheDriver } from '@jaspargupta/cache-manager';
import PlainObjectDriver from '@jaspargupta/cache-manager/dist/drivers/plain-object';
import { Cache } from '../../types';
import driver from './driver';
import httpStore from './store.constant';

describe('driver', () => {
  test.each<[Cache, CacheDriver]>([
    [true, httpStore],
    [new Date(), httpStore],
    (() => {
      const store = new PlainObjectDriver();

      return [{ driver: store }, store];
    })(),
  ])('returns the http cache driver', (cache, expected) => {
    expect(driver(cache)).toBe(expected);
  });
});
