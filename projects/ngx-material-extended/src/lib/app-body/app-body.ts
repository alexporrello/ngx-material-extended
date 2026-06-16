import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-app-body',
    template: `<ng-content></ng-content>`,
    styleUrl: './app-body.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexAppBody {}
