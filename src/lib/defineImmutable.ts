/** @internal */
export function defineImmutable(target: any, prop: any, value: any) {
  Object.defineProperty(target, prop, {
    configurable: false,
    enumerable: false,
    value,
    writable: false
  });
}
