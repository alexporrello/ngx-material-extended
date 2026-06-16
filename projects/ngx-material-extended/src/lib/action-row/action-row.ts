import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-action-row',
    template: `<ng-content></ng-content>`,
    styleUrl: 'action-row.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class MexActionRow {}
