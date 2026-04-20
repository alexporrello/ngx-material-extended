import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[mex-table]',
    templateUrl: './table.html',
    styleUrl: './table.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'mex-table'
    }
})
export class MexTable {}
