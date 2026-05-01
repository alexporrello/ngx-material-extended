import { animate, style, transition, trigger } from '@angular/animations';
import { Component, input, ViewEncapsulation } from '@angular/core';

export const spinnerAnimation = trigger('mex-spinner-animation', [
    transition(':enter', [
        style({ height: '0' }),
        animate(`500ms cubic-bezier(0.8,0.3,0,1)`)
    ]),
    transition(':leave', [
        animate(`500ms cubic-bezier(0.8,0.3,0,1)`, style({ height: '0' }))
    ])
]);

@Component({
    selector: 'mex-spinner',
    templateUrl: './spinner.html',
    styleUrl: './spinner.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexSpinner {}
