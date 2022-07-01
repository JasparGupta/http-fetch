import addMinutes from 'date-fns/addMinutes';
import PlainObjectDriver from '@jaspargupta/cache-manager/dist/drivers/plain-object';
import { Cache, Request } from '../../types';
import httpStore from './store.constant';

describe('checkCache', () => {
  beforeEach(() => httpStore.flush());

  test.each<[Cache, number]>([
    [undefined, 2],
    ['default', 2],
    [true, 1],
    [addMinutes(Date.now(), 5), 1],
    [{ driver: new PlainObjectDriver() }, 1],
    [{ driver: new PlainObjectDriver(), expires: addMinutes(Date.now(), 5) }, 1],
  ])('%# checks and returns cached response', async (cache, expected) => {
    const request = { cache, url: 'http://localhost:3000/foo' } as Request;
    const next = jest.fn(() => 'foo');

    const { default: checkCache } = await import('./index');

    checkCache(request, next);

    expect(next).toHaveBeenCalledWith(
      expected === 1
        ? { url: request.url } // If executing cache "cache" is removed.
        : { cache, url: request.url }
    );

    checkCache(request, next);

    expect(next.mock.calls.length).toBe(expected);
  });
});
