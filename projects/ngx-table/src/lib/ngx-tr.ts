import {
    Component,
    computed,
    contentChildren,
    input,
    signal
} from '@angular/core';
import { NgxCell } from './ngx-cell';

@Component({
    selector: 'ngx-tr',
    template: '<ng-content />',
    host: {
        '[class.primary]': `color() === 'primary'`,
        '[class.secondary]': `color() === 'secondary'`,
        '[class.tertiary]': `color() === 'tertiary'`,
    }
})
export class NgxTr {
    public readonly color = input<'primary' | 'secondary' | 'tertiary' | null>(
        null
    );

    /** All direct cell children (NgxTd or NgxTh). */
    readonly cells = contentChildren(NgxCell);

    /** Sum of colspan values across all cells in this row. */
    readonly columnCount = computed(() =>
        this.cells().reduce((sum, cell) => sum + cell.colspan(), 0)
    );
}
