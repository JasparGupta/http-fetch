/**
 * @jest-environment jsdom
 */
import addAbortSignal from './add-abort-signal';
import { Request } from '../types';

describe('addAbortSignal', () => {
  test('adds abort signal to request if one does not already exist', () => {
    const request = {} as Request;
    const next = jest.fn(passable => passable);

    const actual: Request = addAbortSignal(request, next);

    expect(actual.abort).toBeInstanceOf(AbortController);
    expect(actual.signal).toBeInstanceOf(AbortSignal);
  });
});
