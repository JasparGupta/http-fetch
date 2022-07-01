/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheDriver } from '@jaspargupta/cache-manager';

type Driver = { driver: CacheDriver, expires?: Date };

export default Driver;
