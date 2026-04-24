import {
    Component,
    computed,
    effect,
    input,
    model,
    output,
    signal
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { MexSymbol } from '../symbol/symbol';

export declare type MexSortableTableCellIcon =
    | 'arrow_downward'
    | 'arrow_upward';

@Component({
    selector: '[mex-sortable-table-cell]',
    templateUrl: './sortable-table-cell.html',
    styleUrl: './sortable-table-cell.scss',
    host: {
        class: 'mex-table-cell mex-table-cell-base',
        '(mouseenter)': 'hovered.set(true)',
        '(mouseleave)': 'hovered.set(false)'
    },
    imports: [MatSelect, MatOption, FormsModule, ReactiveFormsModule, MexSymbol]
})
export class MexSortableTableCell {
    public readonly _contentClass = input<string>('', {
        alias: 'contentClass'
    });
    public readonly sorting = input(false);
    public readonly sortIcon = input<MexSortableTableCellIcon | null>(null);
    public readonly filterOpts = input<string[] | null | undefined>();

    public readonly sort = output<void>();
    public readonly _filterVals = output<string[]>({ alias: 'filterVals' });

    public readonly hovered = signal(false);
    public readonly filterVals = signal<string[]>([]);
    public readonly filtering = signal(false);

    constructor() {
        effect(() => {
            const filterVals = this.filterVals();
            this._filterVals.emit(filterVals);
        });
    }

    public readonly contentClass = computed(() => {
        return 'mex-table-cell-content ' + this._contentClass();
    });

    public readonly showFilterIcon = computed(() => {
        if ((this.filterOpts()?.length ?? 0) === 0) return false;
        if (this.filtering()) return true;

        return this.hovered() || this.filterVals().length > 0;
    });
}
