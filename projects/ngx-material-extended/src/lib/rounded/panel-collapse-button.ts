import { Component, computed, inject, signal } from '@angular/core';
import { MexSymbol } from '../symbol/symbol';
import { MexPanelHeaderActionButton } from './panel-header';
import { MEX_PANEL } from './panel-token';

@Component({
    selector: 'mex-panel-collapse-button',
    templateUrl: 'panel-collapse-button.html',
    styleUrl: 'panel-collapse-button.scss',
    imports: [MexSymbol, MexPanelHeaderActionButton]
})
export class MexPanelCollapseButton {
    private readonly _panel = inject(MEX_PANEL, { optional: true });
    private readonly _open = signal(true);

    public readonly open = computed(() => this._panel?.showContent() ?? this._open());

    public toggleOpen(open = !this.open()) {
        if (this._panel) {
            this._panel.showContent.set(open);
        } else {
            this._open.set(open);
        }
    }
}
