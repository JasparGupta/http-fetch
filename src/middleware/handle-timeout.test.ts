import { Request } from '../types';
import handleTimeout from './handle-timeout';

describe('handleTimeout', () => {
  test('handles request timeout', () => {
    jest.useFakeTimers();

    const request = {
      abort: { abort: jest.fn() },
      timeout: 5e3,
    } as unknown as Request;
    const next = jest.fn();

    handleTimeout(request, next);

    expect(request.abort?.abort).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith({}); // abort and timeout are removed from the request.

    jest.runOnlyPendingTimers();

    expect(request.abort?.abort).toHaveBeenCalled();
  });
});
