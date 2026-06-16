import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-toolbar',
    template: `<ng-content></ng-content>`,
    styleUrl: 'toolbar.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexToolbar {}

@Component({
    selector: 'mex-toolbar-nav',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class MexToolbarNav {}

@Component({
    selector: 'mex-toolbar-actions',
    template: `<ng-content></ng-content>`,
    standalone: true
})
export class MexToolbarActions {}
