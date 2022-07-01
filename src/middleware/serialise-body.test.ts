/**
 * @jest-environment jsdom
 */
import { Request } from '../types';
import serialiseBody from './serialise-body';

describe('serialiseBody', () => {
  test('serialises the request body', () => {
    const request = {
      body: {
        foo: 'bar',
      },
      headers: new Headers({
        'content-type': 'multipart/form-data',
      }),
    } as unknown as Request;
    const next = (passable: Request) => passable;

    const actual = serialiseBody(request, next);

    expect(actual.body).toBeInstanceOf(URLSearchParams);
    expect(actual.body.get('foo')).toBe('bar');
  });

  test.each<[RequestInit['body']]>([
    ['string value'],
    [new URLSearchParams()],
    [new FormData()],
    [null],
  ])('does nothing if request body is not a plain object', (value) => {
    const request = { body: value } as unknown as Request;
    const next = (passable: Request) => passable;

    const actual = serialiseBody(request, next);

    expect(actual.body).toBe(value);
  });
});
