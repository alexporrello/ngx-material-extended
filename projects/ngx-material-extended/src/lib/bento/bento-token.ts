import { InjectionToken, Signal } from '@angular/core';
import type { MexBentoItem } from './bento-item';

export interface MexBentoContext {
    readonly direction: Signal<'row' | 'column'>;
    /** Direct child items in DOM order — used to derive each item's edge. */
    readonly items: Signal<readonly MexBentoItem[]>;
}

export const MEX_BENTO = new InjectionToken<MexBentoContext>('MexBento');
