import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'mex-action-row-text-area',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class MexActionRowTextArea {
    constructor(private _host: ElementRef<HTMLElement>) {}
}
