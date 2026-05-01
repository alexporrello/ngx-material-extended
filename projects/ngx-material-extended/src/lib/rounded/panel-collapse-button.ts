import { Component, input, model } from '@angular/core';
import { MexSymbol } from '../symbol/symbol';
import { MexPanelHeaderActionButton } from './panel-header';

@Component({
    selector: 'mex-panel-collapse-button',
    templateUrl: 'panel-collapse-button.html',
    styleUrl: 'panel-collapse-button.scss',
    imports: [MexSymbol, MexPanelHeaderActionButton]
})
export class MexPanelCollapseButton {
    public readonly open = model(true);

    public toggleOpen(open = !this.open()) {
        this.open.set(open);
    }
}
