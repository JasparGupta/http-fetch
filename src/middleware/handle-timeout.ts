import { Pipe } from '../support/pipeline';
import { Request } from '../types';

const handleTimeout: Pipe<Request> = ({ abort, timeout, ...request }, next) => {
  if (timeout && abort) setTimeout(abort, timeout);

  return next(request);
};

export default handleTimeout;
