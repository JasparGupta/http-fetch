import { Pipe } from '../support/pipeline';
import { Request } from '../types';

const handleTimeout: Pipe<Request> = ({ abort: controller, timeout, ...request }, next) => {
  if (timeout && controller) setTimeout(() => controller.abort('Request timed out'), timeout);

  return next(request);
};

export default handleTimeout;
