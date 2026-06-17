import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { MEX_PANEL } from './panel-token';

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
    private readonly _panel = inject(MEX_PANEL, { optional: true });

    public readonly showContent = computed(() => this._panel?.showContent() ?? true);
    public readonly panelHasHeader = computed(() => this._panel?.hasHeader() ?? true);
    public readonly panelHasFooter = signal(false);
}
