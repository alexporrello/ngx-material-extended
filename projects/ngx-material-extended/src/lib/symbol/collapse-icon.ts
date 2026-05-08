import { Component, input } from '@angular/core';
import { MexSymbol } from './symbol';

@Component({
    selector: '[mex-collapse-icon]',
    template: `
        <mex-symbol
            class="expand-icon"
            [class.open]="!collapsed()">
            arrow_drop_up
        </mex-symbol>
    `,
    styles: `
        .open {
            transform: rotate(180deg);
        }
        .expand-icon {
            transition: transform 250ms ease;
        }
    `,
    imports: [MexSymbol]
})
export class MexCollapseIcon {
    public readonly collapsed = input(true);
}
