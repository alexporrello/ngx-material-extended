import {
    computed,
    Directive,
    inject,
    input,
    numberAttribute
} from '@angular/core';
import {
    MEX_PANEL_COLLAPSE,
    MexPanelCollapseOrientation
} from '../rounded/panel-collapse';
import { MEX_PANEL } from '../rounded/panel-token';
import { MEX_BENTO } from './bento-token';

/**
 * Sizes and collapses a direct child of a `mex-bento`. Matches both `mex-panel`
 * and a nested `mex-bento` so either can be a sized flex item.
 *
 * The directive is inert outside a bento: with no parent bento the style host
 * bindings resolve to `null`, which removes the property and leaves the element
 * exactly as it would render on its own.
 */
@Directive({
    selector: 'mex-panel, mex-bento',
    providers: [{ provide: MEX_PANEL_COLLAPSE, useExisting: MexBentoItem }],
    host: {
        class: 'mex-bento-item',
        '[class.mex-bento-item--collapsed]': 'collapsed()',
        '[class.mex-bento-item--collapsed-x]': 'collapsedAlongRow()',
        '[style.flex-grow]': 'flexGrow()',
        '[style.flex-basis]': 'flexBasis()',
        '[style.flex-shrink]': 'flexShrink()'
    }
})
export class MexBentoItem {
    private readonly parent = inject(MEX_BENTO, {
        skipSelf: true,
        optional: true
    });
    private readonly panel = inject(MEX_PANEL, { optional: true });

    /**
     * Percentage of the parent bento's main axis this item should occupy.
     * Accepts the bare attribute form (`size="75"`) via `numberAttribute`.
     * Omit it to auto-size to an equal share of the leftover space.
     */
    public readonly size = input(undefined, { transform: numberAttribute });

    public readonly collapsed = computed(() =>
        this.panel ? !this.panel.showContent() : false
    );

    public readonly collapsedAlongRow = computed(
        () =>
            this.collapsed() &&
            this.parent?.direction() === 'row' &&
            // A collapsed body keeps the full header (title + button); only the
            // icon-only strip (no collapsed body) hides the title.
            !this.panel?.hasCollapsedBody()
    );

    /**
     * The edge this panel collapses toward, consumed by the panel's collapse
     * button to pick a directional icon. A column parent collapses upward
     * (`top`); a row parent collapses sideways — the last item reads as a
     * right-docked panel, everything else as left-docked. `null` outside a
     * bento or for a nested bento (which has no collapse button).
     */
    public readonly orientation = computed<MexPanelCollapseOrientation | null>(
        () => {
            if (!this.parent || !this.panel) return null;
            if (this.parent.direction() === 'column') return 'top';
            const items = this.parent.items();
            const isLast = items.length > 0 && items[items.length - 1] === this;
            return isLast ? 'right' : 'left';
        }
    );

    public readonly flexShrink = computed(() => (this.parent ? 1 : null));

    public readonly flexGrow = computed(() => {
        if (!this.parent) return null; // inert outside a bento
        if (this.collapsed()) return '0'; // collapsed: never reclaim space
        // Grow proportionally to `size` so that when a sibling collapses, the
        // freed space is reclaimed in the same ratio (auto items share equally).
        // With explicit sizes the bases already sum to ~100%, so grow stays
        // dormant in the normal state and the declared ratios hold.
        const s = this.size();
        return s == null ? '1' : `${s}`;
    });

    public readonly flexBasis = computed(() => {
        if (!this.parent) return null;
        if (this.collapsed()) {
            // A collapsed body needs room to read; honour the panel's
            // collapsedSize when set. Otherwise collapse along the main axis to
            // the icon-only extent so the animation lands exactly on the min
            // the corners need.
            const size = this.panel?.collapsedSize() ?? null;
            if (size != null && size !== '') {
                // A bare number — or a numeric string from the template
                // attribute (`collapsedSize="180"`) — is pixels. Anything else
                // (e.g. `"12rem"`, `"30%"`) is used verbatim as a CSS length.
                const n = typeof size === 'number' ? size : Number(size);
                return Number.isNaN(n) ? String(size) : `${n}px`;
            }
            return 'var(--mex-bento-collapsed-size)';
        }
        const s = this.size();
        return s == null ? '0%' : `${s}%`;
    });
}
