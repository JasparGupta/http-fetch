export default function asHeaders(headers: HeadersInit | undefined): Headers {
  if (!(headers instanceof Headers)) {
    // eslint-disable-next-line no-param-reassign
    headers = new Headers(headers ?? {});
  }

  return headers;
};
