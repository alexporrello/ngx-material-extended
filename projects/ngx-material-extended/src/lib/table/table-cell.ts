import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[mex-table-cell]',
    templateUrl: './table-cell.html',
    host: {
        class: 'mex-table-cell mex-table-cell-base'
    }
})
export class MexTableCell {
    public readonly _contentClass = input<string>('', {
        alias: 'contentClass'
    });

    public contentClass = computed(() => {
        return 'mex-table-cell-content ' + this._contentClass();
    });
}
