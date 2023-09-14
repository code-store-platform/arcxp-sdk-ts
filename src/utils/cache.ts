import { Duration } from './duration';

export type CacheItem<Data> = { data: Data; ttl: number; timer?: NodeJS.Timer };

export default class Cache<Data = any> {
  public constructor(private ttl = Duration.minutes(1), private maxSize = 1000) {}

  private cache: Record<string, CacheItem<Data>> = {};

  public get size() {
    return this.keys.length;
  }

  public get keys() {
    return Object.keys(this.cache);
  }

  public get values() {
    return Object.values(this.cache).map(({ data }) => data);
  }

  public get(key: string): Data | void {
    this.resetTimeout(key);
    return this.cache[key]?.data;
  }

  public set(key: string, data: Data, ttl = this.ttl) {
    this.pop();
    this.del(key);

    const item: CacheItem<Data> = { data, ttl };
    this.cache[key] = item as Required<typeof item>;
    this.toPop.push(key);
    this.resetTimeout(key, ttl);
  }

  public del(key: string) {
    if (!this.cache[key]) return;
    const { timer } = this.cache[key];
    if (timer) clearTimeout(timer);
    delete this.cache[key];
    return true;
  }

  private resetTimeout(key: string, ttl?: number) {
    const item = this.cache[key];
    if (!item) return;
    if (item.timer) clearTimeout(item.timer);
    ttl = ttl ?? item.ttl;
    if (Number.isFinite(ttl)) {
      item.timer = setTimeout(() => {
        this.del(key);
      }, ttl);
    }
  }

  private toPop: string[] = [];
  private pop() {
    if (this.toPop.length < this.maxSize) return;
    const key = this.toPop.shift()!;
    if (!this.del(key)) this.pop();
  }
}
