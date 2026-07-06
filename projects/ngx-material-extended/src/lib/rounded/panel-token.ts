import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface MexPanelContext {
    readonly showContent: WritableSignal<boolean>;
    readonly hasHeader: Signal<boolean>;
    /** Whether the panel projects a `mex-panel-collapsed-body`. */
    readonly hasCollapsedBody: Signal<boolean>;
    /**
     * Main-axis extent of the collapsed strip. A bare number is treated as
     * pixels; a string is used verbatim as a CSS length. `null` falls back to
     * the default icon-only extent.
     */
    readonly collapsedSize: Signal<number | string | null>;
}

export const MEX_PANEL = new InjectionToken<MexPanelContext>('MexPanel');
