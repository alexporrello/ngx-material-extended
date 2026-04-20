import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ngx-thead',
    template: '<ng-content />',
    host: {
        class: 'ngx-table-section'
    },
    encapsulation: ViewEncapsulation.None
})
export class NgxThead {}
