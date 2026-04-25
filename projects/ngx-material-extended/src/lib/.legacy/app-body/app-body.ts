import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'elm-app-body',
    template: `<ng-content></ng-content>`,
    styleUrl: './app-body.scss',
    encapsulation: ViewEncapsulation.None
})
export class ElmAppBody {}
