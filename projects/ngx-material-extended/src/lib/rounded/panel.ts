import {
    Component,
    computed,
    contentChild,
    input,
    model,
    ViewEncapsulation
} from '@angular/core';
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

    public readonly header = contentChild(MexPanelHeader);

    public readonly hasHeader = computed(() => this.header() !== undefined);
}
