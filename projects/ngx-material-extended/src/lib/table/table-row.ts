import { Component, computed, input } from '@angular/core';

@Component({
    selector: '[mex-table-row]',
    template: '<ng-content />',
    host: {
        '[class]': 'rowClass()'
    }
})
export class MexTableRow {
    public readonly roundedTop = input(false);
    public readonly roundedBottom = input(false);

    public rowClass = computed(() => {
        let sectionClass = 'mex-table-row ';

        if (this.roundedTop()) sectionClass += ' mex-rounded-top-row';
        if (this.roundedBottom()) sectionClass += ' mex-rounded-bottom-row';

        return sectionClass;
    });
}
