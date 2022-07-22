export default function filterParams<T extends Record<string, any>>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => ![undefined, null, ''].includes(value))
  ) as Partial<T>;
}
