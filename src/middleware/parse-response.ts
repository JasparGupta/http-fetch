/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe } from '../support/pipeline';
import { Request, Response } from '../types';

const parseResponse: Pipe<Request, Promise<Response<any>>> = async (request, next) => {
  const response = await next(request);

  if (!response.ok) {
    throw response;
  }

  response.data = await ((request.headers as Headers).get('accept')?.includes('application/json')
    ? response.json()
    : response.text());

  return response;
};

export default parseResponse;
