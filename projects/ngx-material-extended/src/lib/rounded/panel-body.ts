import { Component, signal, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-panel-body',
    templateUrl: './panel-body.html',
    styleUrl: './panel-body.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexPanelBody {
    public readonly panelHasHeader = signal(true);
    public readonly panelHasFooter = signal(false);
}
