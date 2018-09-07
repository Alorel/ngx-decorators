import {Lifecycle} from './lib/Lifecycle';
import {mkPropertyKeyDecorator} from './lib/mkPropertyKeyDecorator';
import {_complete} from './lib/symbols';
import {complete} from './processors/complete';

/**
 * Automatically completes the subjects and event emitters at this property.
 * The property can be either a single object or an array of objects.
 */
export function Complete(): PropertyDecorator {
  return mkPropertyKeyDecorator(_complete, complete, Lifecycle.POST_DESTROY);
}
