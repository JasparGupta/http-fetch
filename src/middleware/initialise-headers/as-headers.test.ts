/**
 * @jest-environment jsdom
 */
import asHeaders from './as-headers';

describe('asHeaders', () => {
  test.each<[HeadersInit | undefined]>([
    [undefined],
    [{ accept: '*/*' }],
    [[['accept', '*/*']]],
    [new Headers({ accept: '*/*' })]
  ])('%# coerces request headers as Headers instance', (headers) => {
    const actual = asHeaders(headers);

    expect(actual).toBeInstanceOf(Headers);
    if (headers) expect(actual.get('accept')).toBe('*/*');
  });
});
