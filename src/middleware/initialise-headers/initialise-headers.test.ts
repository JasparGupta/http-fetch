/**
 * @jest-environment jsdom
 */
import { Request } from '../../types';
import initialiseHeaders from './index';

describe('initialiseHeaders', () => {
  test.each<[string, Record<string, string>, Partial<RequestInit>]>([
    ['sets default headers', { accept: 'application/json', 'content-type': 'application/json' }, {}],
    [
      'overrides default headers',
      {
        accept: 'text/html',
        'content-type': 'application/json'
      },
      { headers: { accept: 'text/html' } }
    ],
    [
      'appends given headers',
      {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-custom-header': 'foo'
      },
      { headers: { 'x-custom-header': 'foo' } }
    ],
  ])('%s', (_, expected, request) => {
    const next = (passable: Request) => passable.headers;

    const actual: Headers = initialiseHeaders(request as Request, next);
    const headers = Array.from(actual.entries());

    expect(actual).toBeInstanceOf(Headers);
    expect(headers).toEqual(Object.entries(expected));
  });
});
