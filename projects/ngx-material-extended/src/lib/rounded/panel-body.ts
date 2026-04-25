import { animate, style, transition, trigger } from '@angular/animations';
import { Component, signal, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-panel-body',
    templateUrl: './panel-body.html',
    styleUrl: './panel-body.scss',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('minimize-user-summary', [
            transition(':enter', [
                style({ height: '0' }),
                animate(`500ms cubic-bezier(0.8,0.3,0,1)`)
            ]),
            transition(':leave', [
                animate(
                    `500ms cubic-bezier(0.8,0.3,0,1)`,
                    style({ height: '0' })
                )
            ])
        ])
    ]
})
export class MexPanelBody {
    public readonly showContent = signal(true);
    public readonly panelHasHeader = signal(true);
    public readonly panelHasFooter = signal(false);
}
