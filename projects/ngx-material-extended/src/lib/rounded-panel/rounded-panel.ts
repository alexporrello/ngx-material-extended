import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mex-rounded-panel',
    templateUrl: './rounded-panel.html',
    styleUrl: './rounded-panel.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexRoundedPanel {
    public contentClass = input<string>('');

    public fullContentClass = computed(() => {
        return (this.contentClass() + ' rounded-panel-content').trim();
    });
}
