/* eslint-disable @typescript-eslint/no-explicit-any */
import isPlainObject from 'lodash.isplainobject';
import { Pipe } from '../support/pipeline';
import tap from '../support/tap';
import { Request } from '../types';
import { filterParams } from './support';

const serialiseBody: Pipe<Request> = (request, next) => {
  if (request.body && isPlainObject(request.body)) {
    request.body = filterParams(request.body as Record<string, any>);

    const headers = request.headers as Headers;

    if (!headers.has('content-type')) headers.set('content-type', 'application/json');

    if (headers.get('content-type') === 'application/json') {
      request.body = JSON.stringify(request.body);

      return next(request);
    }

    request.body = tap(new URLSearchParams(request.body), body => body.sort());
  }

  return next(request);
};

export default serialiseBody;
