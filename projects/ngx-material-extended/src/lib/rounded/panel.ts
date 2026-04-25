import {
    Component,
    computed,
    contentChild,
    effect,
    input,
    ViewEncapsulation
} from '@angular/core';
import { MexPanelBody, MexPanelHeader } from 'ngx-material-extended';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'mex-panel',
    templateUrl: './panel.html',
    styleUrl: './panel.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexPanel {
    /** @deprecated */
    public readonly showTopCap = input(true);
    /** @deprecated */
    public readonly showEndCap = input(true);

    public readonly showContent = input(true);

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

        effect(() => {
            const body = this.body();
            if (!body) return;
            body.showContent.set(this.showContent());
        });
    }
}
