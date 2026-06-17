import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-symbol',
    template: '<ng-content />',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'material-symbols-outlined material-symbols-sharp material-symbols-rounded'
    }
})
export class MexSymbol {}
