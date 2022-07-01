import { Pipe } from '../support/pipeline';
import { Request } from '../types';

const addAbortSignal: Pipe<Request> = (request, next) => {
  if (!request.signal && typeof AbortController !== 'undefined') {
    const controller = new AbortController();

    request.abort = controller.abort.bind(controller);
    request.signal = controller.signal;
  }

  return next(request);
};

export default addAbortSignal;
