import { InjectionToken, Signal } from '@angular/core';

export type MexPanelCollapseOrientation = 'left' | 'right' | 'top' | 'bottom';

export interface MexPanelCollapseContext {
    /**
     * The edge the panel collapses toward, used to pick a directional icon.
     * `null` falls back to the default (non-directional) collapse icon.
     */
    readonly orientation: Signal<MexPanelCollapseOrientation | null>;
}

/**
 * Lets a layout container (e.g. `mex-bento`) tell a `mex-panel-collapse-button`
 * which way the panel collapses, so it can render a directional icon. Defined
 * here in the panel feature so the button can depend on it without depending on
 * any particular layout container.
 */
export const MEX_PANEL_COLLAPSE = new InjectionToken<MexPanelCollapseContext>(
    'MexPanelCollapse'
);
