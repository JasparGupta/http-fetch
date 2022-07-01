import { Pipe } from '../support/pipeline';
import { Request } from '../types';

const addAbortSignal: Pipe<Request> = (request, next) => {
  if (!request.abort && typeof AbortController !== 'undefined') {
    request.abort = new AbortController();
  }

  if (request.abort) {
    request.signal = request.abort.signal;
  }

  return next(request);
};

export default addAbortSignal;
