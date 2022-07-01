/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe } from '../support/pipeline';
import Cache from './cache';

export default interface Request<P extends Record<string, any> = Record<string, any>> extends Omit<RequestInit, 'body' | 'cache'> {
  abort?: AbortController,
  body?: RequestInit['body'] | Record<string, any>,
  cache?: Cache,
  middleware?: Pipe[],
  params?: P,
  timeout?: number,
  url: string,
}
