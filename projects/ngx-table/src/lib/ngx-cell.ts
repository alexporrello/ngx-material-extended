import { Directive, InputSignal } from '@angular/core';

/**
 * Abstract base for NgxTd and NgxTh.
 * Shared so NgxTr can query both cell types through a single token.
 */
@Directive()
export abstract class NgxCell {
  abstract readonly colspan: InputSignal<number>;
  abstract readonly rowspan: InputSignal<number>;
}
