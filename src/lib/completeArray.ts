import {MockCompletable} from './Mocks';

/** @internal */
export function completeArray(inp: MockCompletable[]): void {
  for (const c of inp) {
    c.complete();
  }
}
