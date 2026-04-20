import { Component, input, ViewEncapsulation } from '@angular/core';
import { NgxCell } from './ngx-cell';

@Component({
    selector: 'ngx-th',
    template: `
        <span class="ngx-table-cell-content">
            <ng-content />
        </span>
    `,
    providers: [{ provide: NgxCell, useExisting: NgxTh }],
    host: {
        class: 'ngx-table-cell',
        '[style.grid-column]': '"span " + colspan()',
        '[style.grid-row]': '"span " + rowspan()'
    },
    encapsulation: ViewEncapsulation.None
})
export class NgxTh extends NgxCell {
    readonly colspan = input<number>(1);
    readonly rowspan = input<number>(1);
}
