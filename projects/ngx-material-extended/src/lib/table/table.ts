import {
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: '[mex-table]',
    templateUrl: './table.html',
    styleUrl: './table.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'hostClass()'
    }
})
export class MexTable {
    public readonly host: ElementRef<HTMLTableElement> = inject(ElementRef);

    public readonly border = input(false);

    public readonly hostClass = computed(() => {
        return 'mex-table ' + (this.border() ? ' bordered' : '');
    });
}
