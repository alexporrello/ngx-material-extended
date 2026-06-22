import { Component, computed, inject, signal } from '@angular/core';
import { MexSymbol } from '../symbol/symbol';
import { MexPanelHeaderActionButton } from './panel-header';
import { MEX_PANEL } from './panel-token';
import { MEX_PANEL_COLLAPSE } from './panel-collapse';

@Component({
    selector: 'mex-panel-collapse-button',
    templateUrl: 'panel-collapse-button.html',
    styleUrl: 'panel-collapse-button.scss',
    imports: [MexSymbol, MexPanelHeaderActionButton]
})
export class MexPanelCollapseButton {
    private readonly _panel = inject(MEX_PANEL, { optional: true });
    private readonly _collapse = inject(MEX_PANEL_COLLAPSE, { optional: true });
    private readonly _open = signal(true);

    public readonly open = computed(() => this._panel?.showContent() ?? this._open());

    /** Collapse edge supplied by a layout container, or null when standalone. */
    public readonly orientation = computed(
        () => this._collapse?.orientation() ?? null
    );

    /**
     * Directional Material Symbol when an orientation is known
     * (e.g. `left_panel_close`), otherwise the default rotating arrow.
     */
    public readonly icon = computed(() => {
        const o = this.orientation();
        if (!o) return 'arrow_drop_up';
        return `${o}_panel_${this.open() ? 'close' : 'open'}`;
    });

    /** The default arrow rotates to show state; directional icons do not. */
    public readonly rotate = computed(() => !this.orientation() && this.open());

    public toggleOpen(open = !this.open()) {
        if (this._panel) {
            this._panel.showContent.set(open);
        } else {
            this._open.set(open);
        }
    }
}
