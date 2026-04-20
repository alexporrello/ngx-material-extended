import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ngx-tbody',
    template: '<ng-content />',
    host: {
        class: 'ngx-table-section'
    },
    encapsulation: ViewEncapsulation.None
})
export class NgxTbody {}
