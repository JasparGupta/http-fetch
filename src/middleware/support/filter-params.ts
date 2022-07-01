export default function filterParams<T extends Record<string, any>>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      return !([undefined, null, ''].includes(value) || (Array.isArray(value) && !value.length));
    })
  ) as Partial<T>;
}
