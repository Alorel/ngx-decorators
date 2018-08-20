import {ensureSymbol} from './lib/ensureSymbol';
import {_subscrTo} from './lib/symbols';

export interface SubscribeToConfig {
  /** Property at which the change detector resides */
  cdrProp?: PropertyKey;
}

/** @internal */
export interface SubscribeToDef {
  readonly cfg: SubscribeToConfig;
  readonly source: PropertyKey;
  readonly target: PropertyKey;
}

/**
 * Subscribe to an observable and set its last emitted value to this property
 *
 * This decorator requires the ngOnInit hook and therefore will only work with directives and components.
 *
 * @param prop Property at which the observable resides
 * @param cfg Optional configuration
 */
export function SubscribeTo(prop: PropertyKey, cfg: SubscribeToConfig = {}): PropertyDecorator {
  return (target: any, key: PropertyKey): void => {
    ensureSymbol<SubscribeToDef[]>(target, _subscrTo, [])
      .push({
        cfg,
        source: prop,
        target: key
      });
  };
}
