import {
    Component,
    contentChildren,
    input,
    ViewEncapsulation
} from '@angular/core';
import { MexBentoItem } from './bento-item';
import { MEX_BENTO } from './bento-token';

@Component({
    selector: 'mex-bento',
    template: '<ng-content />',
    styleUrl: './bento.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MEX_BENTO, useExisting: MexBento }],
    host: {
        '[attr.data-direction]': 'direction()'
    }
})
export class MexBento {
    public readonly direction = input<'row' | 'column'>('row');

    /** Direct child items (panels and nested bentos), in DOM order. */
    public readonly items = contentChildren(MexBentoItem);
}
