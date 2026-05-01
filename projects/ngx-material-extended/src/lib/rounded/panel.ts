import {
    Component,
    computed,
    contentChild,
    effect,
    input,
    model,
    ViewEncapsulation
} from '@angular/core';
import {
    MexPanelBody,
    MexPanelCollapseButton,
    MexPanelHeader
} from 'ngx-material-extended';

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

    public readonly showContent = model(true);

    public readonly header = contentChild(MexPanelHeader);
    public readonly body = contentChild(MexPanelBody);
    public readonly button = contentChild(MexPanelCollapseButton);

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

        // effect(() => {
        //     const button = this.button();
        //     if (!button) return;
        //     button.open.set(this.showContent());
        // });

        effect(() => {
            const button = this.button();
            if (!button) return;

            const body = this.body();
            if (!body) return;

            this.showContent.set(button.open());
        });
    }
}
