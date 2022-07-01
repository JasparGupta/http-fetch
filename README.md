# http-fetch

This is a light wrapper around the native Fetch API that augments it with some useful features such as request
cancellation, request timeouts and request caching.

## Installation

Add the following line to your `.npmrc` file.

```
@jaspargupta:registry=https://npm.pkg.github.com/
```

Then install the package.

```
npm i @jaspargupta/http-fetch
```

## Usage

```typescript
import PlainObjectDriver from '@jaspargupta/cache-manager/dist/drivers/plain-object';
import http, { Middleware } from '@jaspargupta/http-fetch';
import { Pipe } from './pipeline';

const basic = await http({ url: '/some-awesome-api' });

const basicCache = await http({ url: '/some-awesome-api', cache: true });
const cacheForFiveMinutes = await http({ url: '/some-awesome-api', cache: addMinutes(Date.now(), 5) });

const customDriver = new PlainObjectDriver();

const cacheInDriver = await http({
  url: '/some-awesome-api',
  cache: { driver: customDriver, expires: addMinutes(Date.now(), 5) }
});

const timeoutAfterFiveSeconds = await http({ url: '/some-awesome-api', timeout: 5 });

const debug: Middleware = (request, next) => {
  console.log(request);

  return next(request);
};

const withMiddleware = await http({ url: '/some-awesome-api', middleware: [debug] });

const abort = new AbortController().abort;

const withAbort = await http({ url: '/some-awesome-api', abort });
```

### Request options

The request options extends the native `RequestInit` options that the Fetch API accepts.

| Config       | Description                                                                                                                                                                                                                                                                                                                                                             |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`        | The request url.                                                                                                                                                                                                                                                                                                                                                        |
| `abort`      | (Optional) Accepts an `AbortController.abort` function.                                                                                                                                                                                                                                                                                                                 |
| `body`       | (Optional) Extends `RequestInit.body` by accepting a plain object.                                                                                                                                                                                                                                                                                                      |
| `cache`      | (Optional) Extends `RequestInit.cache` by accepting either a `boolean`, `Date` or `Driver`. If value is `true`, the response is cached indefinitely. If value is a `Date`, the response is cached until the current date is greater than the provided date. If value is a `Driver`, the response is cached in the provided driver for the the optionally provided date. |
| `middleware` | (Optional) An array of middleware functions that intercept the request/response.                                                                                                                                                                                                                                                                                        |
| `params`     | (Optional) A plain object that is serialised as url query parameters.                                                                                                                                                                                                                                                                                                   |
| `timeout`    | (Optional) A number determining the seconds before the request should cancel.                                                                                                                                                                                                                                                                                           |
