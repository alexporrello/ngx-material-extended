import { Component, ElementRef, input } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
    selector: 'mex-action-row-item',
    template: `<ng-content></ng-content>`,
    standalone: true,
    hostDirectives: [MatRipple],
    host: {
        '[tabIndex]': 'allowFocus() ? 0 : -1'
    }
})
export class MexActionRowItem {
    public allowFocus = input<boolean>();

    constructor(private _host: ElementRef<HTMLElement>) {}
}
