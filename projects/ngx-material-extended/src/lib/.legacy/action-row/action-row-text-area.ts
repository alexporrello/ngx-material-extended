import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'elm-action-row-text-area',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class ElmActionRowTextArea {
    constructor(private _host: ElementRef<HTMLElement>) {
        // this._host.nativeElement.tabIndex = 0;
        // this._host.nativeElement.onkeyup = (event) => {
        //     if (event.key === 'Enter') {
        //         this._host.nativeElement.click();
        //     }
        // };
    }
}
