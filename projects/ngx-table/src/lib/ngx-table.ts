import {
    Component,
    computed,
    contentChildren,
    input,
    ViewEncapsulation
} from '@angular/core';
import { NgxTr } from './ngx-tr';

@Component({
    selector: 'ngx-table',
    template: '<ng-content />',
    host: {
        '[style.grid-template-columns]': 'gridTemplateColumns()',
        '[class.rounded]': 'rounded()',
        '[class.outline]': 'outline()',
        '[class.border]': 'border()'
    },
    styleUrl: './ngx-table.scss',
    encapsulation: ViewEncapsulation.None
})
export class NgxTable {
    public readonly rounded = input(true);
    public readonly outline = input(true);
    public readonly border = input(true);

    /** All NgxTr descendants, including those inside thead/tbody/tfoot. */
    readonly rows = contentChildren(NgxTr, { descendants: true });

    /**
     * Max column count across all rows. Each NgxTr sums its own cells' colspans,
     * so this naturally accounts for rows that use colspan to span multiple columns.
     * Falls back to 1 to ensure the grid is always valid.
     */
    readonly columnCount = computed(() =>
        Math.max(1, ...this.rows().map((r) => r.columnCount()))
    );

    readonly gridTemplateColumns = computed(
        () => `repeat(${this.columnCount()}, 1fr)`
    );
}
