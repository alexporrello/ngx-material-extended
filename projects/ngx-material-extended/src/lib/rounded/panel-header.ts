import { Component, input, ViewEncapsulation } from '@angular/core';
import { MexSpinner, spinnerAnimation } from '../spinner/spinner';

@Component({
    selector: 'mex-panel-header',
    templateUrl: './panel-header.html',
    styleUrl: './panel-header.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [MexSpinner],
    animations: [spinnerAnimation]
})
export class MexPanelHeader {
    public readonly loading = input(false);
}

@Component({
    selector: 'mex-panel-header-title',
    template: `<ng-content />`,
    host: { class: 'mex-panel-header__title' }
})
export class MexPanelHeaderTitle {}

@Component({
    selector: '[mex-panel-header-action-button]',
    template: `<ng-content />`,
    host: { class: 'mex-panel-header__action-button' }
})
export class MexPanelHeaderActionButton {}
