import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface MexPanelContext {
    readonly showContent: WritableSignal<boolean>;
    readonly hasHeader: Signal<boolean>;
}

export const MEX_PANEL = new InjectionToken<MexPanelContext>('MexPanel');
