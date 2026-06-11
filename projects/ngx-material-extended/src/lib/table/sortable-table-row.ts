import { Component, input } from '@angular/core';
import {
    MexSortableTableCell,
    MexTableDataSource,
    MexTableRow
} from 'ngx-material-extended';
import { MexTableColumn } from './types';

@Component({
    selector: '[mex-sortable-table-row]',
    templateUrl: 'sortable-table-row.html',
    styleUrl: 'sortable-table-row.scss',
    imports: [MexSortableTableCell],
    host: {
        '[class]': 'rowClass()'
    }
})
export class MexSortableTableRow<T extends object> extends MexTableRow {
    public readonly columnDef = input.required<MexTableColumn<T>[]>();
    public readonly _data = input.required<MexTableDataSource<T>>({
        alias: 'data'
    });
}
