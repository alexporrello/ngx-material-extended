import { Component } from '@angular/core';

@Component({
    selector: '[mex-table-section]',
    template: '<ng-content />',
    host: {
        class: 'mex-table-section'
    }
})
export class MexTableSection {}
