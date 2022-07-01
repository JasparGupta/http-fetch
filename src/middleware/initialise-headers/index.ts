import { Pipe } from '../../support/pipeline';
import { Request } from '../../types';
import asHeaders from './as-headers';

const defaults: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const initialiseHeaders: Pipe<Request> = (request, next) => {
  const headers = asHeaders(request.headers);

  Object
    .entries(defaults)
    .forEach(([name, value]) => {
      if (!headers.has(name)) {
        headers.set(name, value);
      }
    });

  request.headers = headers;

  return next(request);
};

export default initialiseHeaders;
