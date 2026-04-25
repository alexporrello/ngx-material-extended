import { Component, ElementRef, input, Input } from '@angular/core';
import { ElmButton } from '../theming/theming-directives/button.directive';
import { MatRipple } from '@angular/material/core';

@Component({
    selector: 'elm-action-row-item',
    template: `<ng-content></ng-content>`,
    standalone: true,
    hostDirectives: [MatRipple],
    host: {
        '[tabIndex]': 'allowFocus() ? 0 : -1'
    }
})
export class ElmActionRowItem {
    public allowFocus = input<boolean>();

    constructor(private _host: ElementRef<HTMLElement>) {
        // this._host.nativeElement.tabIndex = 0;
        // this._host.nativeElement.onkeyup = (event) => {
        //     if (event.key === 'Enter') {
        //         this._host.nativeElement.click();
        //     }
        // };
    }
}
