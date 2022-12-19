/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request as BaseRequest, Response } from './types';
import pipeline, { Pipe } from './support/pipeline';
import initialiseHeaders from './middleware/initialise-headers';
import serialiseParams from './middleware/serialise-params';
import parseResponse from './middleware/parse-response';
import checkCache from './middleware/check-cache';
import addAbortSignal from './middleware/add-abort-signal';
import handleTimeout from './middleware/handle-timeout';
import serialiseBody from './middleware/serialise-body';

export type Request = Omit<BaseRequest, 'signal'>;
export type { Response };
export type Middleware = Pipe<BaseRequest>;

export default function http<R = any>({ middleware: additional = [], ...request }: Request): Promise<Response<R>> {
  const middleware: Pipe<Request>[] = [
    addAbortSignal,
    initialiseHeaders,
    serialiseBody,
    serialiseParams,
    ...additional,
    checkCache,
    parseResponse,
    handleTimeout,
  ];

  return pipeline<Request>(middleware, ({ url, params, ...requestInit }) => {
    return fetch(url, { ...requestInit, method: requestInit.method?.toUpperCase() } as RequestInit);
  })(request);
}
