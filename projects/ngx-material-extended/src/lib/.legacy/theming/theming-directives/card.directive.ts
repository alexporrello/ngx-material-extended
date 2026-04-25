import { Directive, Input } from '@angular/core';

@Directive({
    selector: `[elmCard]`,
    exportAs: 'elmCard',
    host: {
        class: 'elm-card'
    },
    standalone: true
})
export class ElmCard {
    @Input() pad = true;
    constructor() {}
}
