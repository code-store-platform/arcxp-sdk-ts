import Cache from './cache';

export function Cached(cache: Cache) {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    const original = descriptor.value;

    descriptor.value = async function value(...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      if (cached) {
        return cached;
      }
      const data = await original.apply(this, args);
      cache.set(key, data);
      return data;
    };

    Object.defineProperty(descriptor.value, 'name', { get: () => propertyKey });
  };
}
