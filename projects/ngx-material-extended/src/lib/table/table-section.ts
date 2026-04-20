import { Component, computed, ElementRef, inject, input } from '@angular/core';
import { resizeSignal } from '../signal/resize-signal';

@Component({
    selector: '[mex-table-section]',
    template: '<ng-content />',
    host: {
        '[class]': 'sectionClass()'
    }
})
export class MexTableSection {
    public readonly host =
        inject<ElementRef<HTMLTableSectionElement>>(ElementRef);

    public readonly roundedTop = input(false);
    public readonly roundedBottom = input(false);
    public readonly subSection = input(false);

    private readonly _mutationObserver = resizeSignal(this.host.nativeElement);

    constructor() {}

    public sectionClass = computed(() => {
        let sectionClass = 'mex-table-section ';

        if (this.roundedTop()) sectionClass += ' mex-rounded-top-table-section';
        if (this.roundedBottom())
            sectionClass += ' mex-rounded-bottom-table-section';
        if (this.subSection()) sectionClass += ' subsection';

        return sectionClass;
    });

    public readonly height = computed(() => {
        this._mutationObserver.value();
        return this.host.nativeElement.offsetHeight;
    });
}
