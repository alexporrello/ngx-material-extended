import { Component, input, ViewEncapsulation } from '@angular/core';
import { NgxCell } from './ngx-cell';

@Component({
    selector: 'ngx-td',
    template: `
        <span class="ngx-table-cell-content">
            <ng-content />
        </span>
    `,
    providers: [{ provide: NgxCell, useExisting: NgxTd }],
    host: {
        class: 'ngx-table-cell',
        '[style.grid-column]': '"span " + colspan()',
        '[style.grid-row]': '"span " + rowspan()'
    },
    encapsulation: ViewEncapsulation.None
})
export class NgxTd extends NgxCell {
    public readonly colspan = input<number>(1);
    public readonly rowspan = input<number>(1);
}
