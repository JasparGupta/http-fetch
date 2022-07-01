import { Cached, CacheDriver } from '@jaspargupta/cache-manager';
import { Cache, Driver } from '../../types';
import httpStore from './store.constant';

export default function driver(cache: Cache): CacheDriver<Record<string, Cached>> {
  if (typeof cache === 'boolean' || cache instanceof Date) {
    return httpStore;
  }

  return (cache as Driver).driver;
}
