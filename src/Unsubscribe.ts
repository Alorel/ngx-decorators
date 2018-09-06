import {Lifecycle} from './lib/Lifecycle';
import {mkPropertyKeyDecorator} from './lib/mkPropertyKeyDecorator';
import {_unsubscribe} from './lib/symbols';
import {unsubscribe} from './processors/unsubscribe';

/**
 * Automatically unsubscribe from the subscription(s) present at this property.
 * The property can be either a single subscription or an array of subscriptions.
 */
export function Unsubscribe(): PropertyDecorator {
  return mkPropertyKeyDecorator(_unsubscribe, unsubscribe, Lifecycle.POST_DESTROY);
}
