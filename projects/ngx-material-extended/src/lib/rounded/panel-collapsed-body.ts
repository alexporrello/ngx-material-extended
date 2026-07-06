import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { MEX_PANEL } from './panel-token';

/**
 * Condensed content shown in place of `mex-panel-body` while the panel is
 * collapsed. Lives inside `mex-panel` alongside the regular body; the two are
 * mutually exclusive — the body shows while open, this shows while collapsed.
 *
 * Pair it with `collapsedSize` on the panel so the collapsed strip is wide (or
 * tall) enough to read this content instead of shrinking to the icon-only
 * header.
 */
@Component({
    selector: 'mex-panel-collapsed-body',
    templateUrl: './panel-collapsed-body.html',
    styleUrl: './panel-collapsed-body.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        // Drop out of the panel's flex column while open so it claims no space
        // next to the real body.
        '[style.display]': "visible() ? null : 'none'"
    }
})
export class MexPanelCollapsedBody {
    private readonly _panel = inject(MEX_PANEL, { optional: true });

    /** Visible only while the panel is collapsed. */
    public readonly visible = computed(
        () => !(this._panel?.showContent() ?? true)
    );
}
