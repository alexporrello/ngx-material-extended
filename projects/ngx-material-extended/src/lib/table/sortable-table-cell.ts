import {
    Component,
    computed,
    effect,
    input,
    output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { MexSymbol } from '../symbol/symbol';
import { animate, style, transition, trigger } from '@angular/animations';

export declare interface MexTableHeader<T> {
    key: keyof T;
    title: string;
}

export declare type MexSortableTableCellIcon =
    | 'arrow_downward'
    | 'arrow_upward';

@Component({
    selector: '[mex-sortable-table-cell]',
    templateUrl: './sortable-table-cell.html',
    styleUrl: './sortable-table-cell.scss',
    host: {
        class: 'mex-table-cell mex-table-cell-base mex-sortable-table-cell',
        '(mouseenter)': 'hovered.set(true)',
        '(mouseleave)': 'hovered.set(false)'
    },
    imports: [
        MatSelect,
        MatOption,
        FormsModule,
        ReactiveFormsModule,
        MexSymbol
    ],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('minimize-icons', [
            transition(':enter', [
                style({ width: '0' }),
                animate(`250ms cubic-bezier(0.8,0.3,0,1)`)
            ]),
            transition(':leave', [
                animate(
                    `250ms cubic-bezier(0.8,0.3,0,1)`,
                    style({ width: '0' })
                )
            ])
        ])
    ]
})
export class MexSortableTableCell {
    public readonly _contentClass = input<string>('', {
        alias: 'contentClass'
    });
    public readonly sorting = input(false);
    public readonly sortIcon = input<MexSortableTableCellIcon | null>(null);
    public readonly filterOpts = input<string[] | null | undefined>();
    public readonly disableFilter = input<boolean | undefined>(false);

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

        effect(() => {
            this.filterOpts();
            this.filterVals.set([]);
        });
    }

    public readonly contentClass = computed(() => {
        return 'mex-table-cell-content ' + this._contentClass();
    });

    public readonly isFiltered = computed(() => {
        return (this.filterVals() ?? []).length > 0;
    });

    public readonly showFilterIcon = computed(() => {
        if (!this.filterOpts()) return false;
        return this.hovered() || this.isFiltered() || this.filtering();
    });
}
