import {
    Component,
    computed,
    contentChild,
    effect,
    input,
    ViewEncapsulation
} from '@angular/core';
import { MexPanelBody, MexPanelHeader } from 'ngx-material-extended';

@Component({
    selector: 'mex-panel',
    templateUrl: './panel.html',
    styleUrl: './panel.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexPanel {
    public readonly showTopCap = input(true);
    public readonly showEndCap = input(true);

    public readonly header = contentChild(MexPanelHeader);
    public readonly body = contentChild(MexPanelBody);

    public hasHeader = computed(() => {
        const header = this.header();
        return header !== undefined;
    });

    constructor() {
        effect(() => {
            const body = this.body();
            if (!body) return;
            body.panelHasHeader.set(this.header() !== undefined);
        });
    }
}
