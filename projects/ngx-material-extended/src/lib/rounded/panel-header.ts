import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-panel-header',
    templateUrl: './panel-header.html',
    styleUrl: './panel-header.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexPanelHeader {}

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
