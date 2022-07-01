import { Request } from '../types';
import serialiseParams from './serialise-params';

describe('serialiseParams', () => {
  test.each<[string, string, Request]>([
    [
      'does nothing if no params are passed',
      'https://hirespace.com/test',
      { url: 'https://hirespace.com/test' },
    ],
    [
      'appends params object to url as query string',
      'https://hirespace.com/test?foo=bar',
      { url: 'https://hirespace.com/test', params: { foo: 'bar' } },
    ],
    [
      'replaces existing query string with params object',
      'https://hirespace.com/test?foo=bar',
      { url: 'https://hirespace.com/test?foo=baz', params: { foo: 'bar' } },
    ],
    [
      'sorts query params by key when appending to url',
      'https://hirespace.com/test?baz=foo&foo=bar',
      { url: 'https://hirespace.com/test', params: { foo: 'bar', baz: 'foo' } },
    ],
  ])('%s', (_, expected, request) => {
    const next = (passable: Request) => passable.url;

    expect(serialiseParams(request, next)).toEqual(expected);
  });
});
