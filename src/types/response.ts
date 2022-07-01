/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface HttpResponse<T = any> extends Response {
  data: T;
}
