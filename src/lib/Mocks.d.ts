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

/** @internal */
export interface MockInitable {
  ngOnInit(): void;
}

/** @internal */
export interface MockSubject<T = any> extends MockUnsubscribable {
  next(v: T): void;
}
