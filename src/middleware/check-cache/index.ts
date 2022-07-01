import { Pipe } from '../../support/pipeline';
import Request from '../../types/request';
import driver from './driver';
import expires from './expires';
import { Driver } from '../../types';

const checkCache: Pipe<Request> = ({ cache, ...request }, next) => {
  if ((typeof cache === 'boolean' && cache) || cache instanceof Date || (cache as Driver)?.driver) {
    return driver(cache).remember(request.url, () => next(request), expires(cache));
  }

  return next({ ...request, cache });
};

export default checkCache;
