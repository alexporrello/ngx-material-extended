import { Component, ElementRef, input } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
    selector: 'mex-action-row-button',
    template: `<ng-content></ng-content>`,
    standalone: true,
    hostDirectives: [MatRipple],
    host: {
        tabIndex: '0'
    }
})
export class MexActionRowButton {
    public allowFocus = input<boolean>();

    constructor(private _host: ElementRef<HTMLElement>) {}
}
