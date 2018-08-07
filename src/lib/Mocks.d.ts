/** @internal */
export interface MockCdr {
  detectChanges(): void;
}

/** @internal */
export interface MockUnsubscribable {
  unsubscribe(): void;
}

/** @internal */
export interface MockCompletable {
  complete(): void;
}

/** @internal */
export interface MockDestroyable {
  ngOnDestroy(): void;
}