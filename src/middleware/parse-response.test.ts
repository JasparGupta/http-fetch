/**
 * @jest-environment jsdom
 */
import parseResponse from './parse-response';
import { Request, Response } from '../types';

describe('parseResponse', () => {
  test.each<[string, any]>([
    ['parses response as json if "accept" header contains "application/json"', 'application/json'],
    ['parses response as text if "accept" header does not contain "application/json"', 'text/html'],
  ])('%s', async (_, accept) => {
    const request = {
      headers: new Headers({ accept }),
    } as Request;
    const response = {
      json: jest.fn().mockReturnValue(Promise.resolve({})),
      ok: true,
      text: jest.fn().mockReturnValue(Promise.resolve('')),
    } as unknown as Response<any>;
    const next = async (_passable: Request): Promise<Response<any>> => response;

    await parseResponse(request, next);

    expect(response[accept === 'application/json' ? 'json' : 'text']).toHaveBeenCalled();
  });
});
