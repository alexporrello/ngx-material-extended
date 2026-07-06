import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { MEX_PANEL } from './panel-token';

@Component({
    selector: 'mex-panel-body',
    templateUrl: './panel-body.html',
    styleUrl: './panel-body.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        // Yield the flex column to the collapsed body while collapsed; without a
        // collapsed body the empty host stays and renders the icon-strip surface.
        '[style.display]': "hidden() ? 'none' : null"
    }
})
export class MexPanelBody {
    private readonly _panel = inject(MEX_PANEL, { optional: true });

    public readonly showContent = computed(() => this._panel?.showContent() ?? true);
    public readonly panelHasHeader = computed(() => this._panel?.hasHeader() ?? true);
    public readonly panelHasFooter = signal(false);

    public readonly hidden = computed(
        () => !this.showContent() && (this._panel?.hasCollapsedBody() ?? false)
    );
}
