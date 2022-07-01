import { Pipe } from '../support/pipeline';
import tap from '../support/tap';
import { Request } from '../types';
import { filterParams } from './support';

const serialiseParams: Pipe<Request> = (request, next) => {
  if (request.params) {
    const url = new URL('', request.url);
    const params = tap(new URLSearchParams(filterParams(request.params)), value => value.sort());

    request.url = `${url.origin}${url.pathname}?${params.toString()}`;
  }

  return next(request);
};

export default serialiseParams;
