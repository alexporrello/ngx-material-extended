import { Directive, ElementRef } from '@angular/core';
import { MexBoldColorDirective, MexColorDirective } from './color.directive';
import { MatRipple } from '@angular/material/core';

@Directive({
    selector: '[mexButton]',
    exportAs: 'mexButton',
    host: {
        class: 'elm-clickable elm-color__default'
    },
    standalone: true,
    hostDirectives: [MatRipple]
})
export class MexButton extends MexColorDirective {
    constructor(host: ElementRef<HTMLButtonElement>) {
        super(host);
    }
}

@Directive({
    selector: '[mexBoldButton]',
    exportAs: 'mexBoldButton',
    host: {
        class: 'elm-clickable elm-color__default--bold'
    },
    standalone: true,
    hostDirectives: [MatRipple]
})
export class MexBoldButton extends MexBoldColorDirective {
    constructor(public host: ElementRef<HTMLButtonElement>) {
        super(host);
    }
}
