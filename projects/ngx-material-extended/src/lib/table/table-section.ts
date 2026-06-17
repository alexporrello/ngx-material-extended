import { Component, computed, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { resizeSignal } from '../signal/resize-signal';

@Component({
    selector: '[mex-table-section]',
    template: '<ng-content />',
    host: {
        '[class]': 'sectionClass()'
    }
})
export class MexTableSection implements OnDestroy {
    public readonly host =
        inject<ElementRef<HTMLTableSectionElement>>(ElementRef);

    public readonly roundedTop = input(false);
    public readonly roundedBottom = input(false);
    public readonly subSection = input(false);

    private readonly _resizeSignal = resizeSignal(this.host.nativeElement);

    public sectionClass = computed(() => {
        let sectionClass = 'mex-table-section ';

        if (this.roundedTop()) sectionClass += ' mex-rounded-top-table-section';
        if (this.roundedBottom())
            sectionClass += ' mex-rounded-bottom-table-section';
        if (this.subSection()) sectionClass += ' subsection';

        return sectionClass;
    });

    public readonly height = computed(() => {
        this._resizeSignal.value();
        return this.host.nativeElement.offsetHeight;
    });

    ngOnDestroy(): void {
        this._resizeSignal.disconnect();
    }
}
