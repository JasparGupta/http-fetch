/**
 * @jest-environment jsdom
 */
import parseResponse from './parse-response';
import { Request, Response } from '../types';

describe('parseResponse', () => {
  test('does not parse response if content-length header is 0', async () => {
    const request = {} as Request;
    const response = {
      json: jest.fn().mockReturnValue(Promise.resolve({})),
      headers: new Headers({ 'content-length': '0' }),
      ok: true,
      text: jest.fn().mockReturnValue(Promise.resolve('')),
    } as unknown as Response;
    const next = async (_passable: Request): Promise<Response<any>> => response;

    const actual = await parseResponse(request, next);

    expect(actual.data).toBeNull();
    expect(response.json).not.toHaveBeenCalled();
    expect(response.text).not.toHaveBeenCalled();
  });

  test('does not parse response status is 204', async () => {
    const request = {} as Request;
    const response = {
      json: jest.fn().mockReturnValue(Promise.resolve({})),
      headers: new Headers(),
      ok: true,
      status: 204,
      text: jest.fn().mockReturnValue(Promise.resolve('')),
    } as unknown as Response;
    const next = async (_passable: Request): Promise<Response<any>> => response;

    const actual = await parseResponse(request, next);

    expect(actual.data).toBeNull();
    expect(response.json).not.toHaveBeenCalled();
    expect(response.text).not.toHaveBeenCalled();
  });

  test.each<[string, any]>([
    ['parses response as json if "accept" header contains "application/json"', 'application/json'],
    ['parses response as text if "accept" header does not contain "application/json"', 'text/html'],
  ])('%s', async (_, accept) => {
    const request = {
      headers: new Headers({ accept }),
    } as Request;
    const response = {
      json: jest.fn().mockReturnValue(Promise.resolve({})),
      headers: new Headers(),
      ok: true,
      text: jest.fn().mockReturnValue(Promise.resolve('')),
    } as unknown as Response<any>;
    const next = async (_passable: Request): Promise<Response<any>> => response;

    await parseResponse(request, next);

    expect(response[accept === 'application/json' ? 'json' : 'text']).toHaveBeenCalled();
  });
});
