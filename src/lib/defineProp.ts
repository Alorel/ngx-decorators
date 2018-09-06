/** @internal */
export function defineImmutable(target: any, prop: PropertyKey, value: any): void {
  Object.defineProperty(target, prop, {
    configurable: false,
    enumerable: false,
    value,
    writable: false
  });
}
