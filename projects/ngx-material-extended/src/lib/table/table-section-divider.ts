import { Component, computed, input } from '@angular/core';

@Component({
    selector: '[mex-table-section-divider]',
    template: '<td [colSpan]="colSpan()"></td>',
    host: {
        '[class]': `'mex-table-section-divider ' + height()`
    }
})
export class MexTableSectionDivider {
    public readonly colSpan = input(1);

    public readonly height = input<'large' | 'medium' | 'small'>('medium');

    constructor() {}
}
