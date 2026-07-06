import {
    Component,
    computed,
    contentChild,
    input,
    model,
    ViewEncapsulation
} from '@angular/core';
import { MexPanelCollapsedBody } from './panel-collapsed-body';
import { MexPanelHeader } from './panel-header';
import { MEX_PANEL } from './panel-token';

@Component({
    selector: 'mex-panel',
    templateUrl: './panel.html',
    styleUrl: './panel.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MEX_PANEL, useExisting: MexPanel }]
})
export class MexPanel {
    /** @deprecated No replacement — rounded caps are now always shown. Remove this binding. */
    public readonly showTopCap = input(true);
    /** @deprecated No replacement — rounded caps are now always shown. Remove this binding. */
    public readonly showEndCap = input(true);

    public readonly showContent = model(true);

    /**
     * Main-axis extent of the collapsed strip, so a `mex-panel-collapsed-body`
     * has room to read. A bare number is pixels (`collapsedSize="180"`); a
     * string is a verbatim CSS length. Omit it to collapse to the icon-only
     * header.
     */
    public readonly collapsedSize = input<number | string | null>(null);

    public readonly header = contentChild(MexPanelHeader);

    public readonly hasHeader = computed(() => this.header() !== undefined);

    public readonly collapsedBody = contentChild(MexPanelCollapsedBody);

    public readonly hasCollapsedBody = computed(
        () => this.collapsedBody() !== undefined
    );
}
