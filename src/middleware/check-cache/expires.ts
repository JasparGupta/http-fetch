import { Cache, Driver } from '../../types';

export default function expires(cache: Cache): Date | null {
  if (typeof cache === 'boolean' || cache instanceof Date) {
    return cache instanceof Date ? cache : null;
  }

  return (cache as Driver)?.expires instanceof Date ? (cache as Driver).expires! : null;
}
