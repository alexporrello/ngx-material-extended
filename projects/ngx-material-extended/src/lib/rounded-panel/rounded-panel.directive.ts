import { Directive } from '@angular/core';

@Directive({
    selector: 'mex-rounded-panel-wrapper',
    host: {
        class: 'rounded-panel-wrapper'
    }
})
export class MexRoundedPanelWrapper {}
