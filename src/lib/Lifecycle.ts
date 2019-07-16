//tslint:disable:completed-docs

/** @internal */
export const enum Lifecycle {
  PRE_INIT,
  PRE_DESTROY,
  POST_INIT,
  POST_DESTROY
}

/** @internal */
export const enum LifecycleAbridged {
  INIT,
  DESTROY
}

/** @internal */
export function toAbridged(lifecycle: Lifecycle): LifecycleAbridged {
  if (lifecycle === Lifecycle.POST_INIT || lifecycle === Lifecycle.PRE_INIT) {
    return LifecycleAbridged.INIT;
  }

  return LifecycleAbridged.DESTROY;
}
