import { Directive, ElementRef } from '@angular/core';
import { ElmBoldColorDirective, ElmColorDirective } from './color.directive';
import { MatRipple } from '@angular/material/core';

@Directive({
    selector: '[elmButton]',
    exportAs: 'elmButton',
    host: {
        class: 'elm-clickable elm-color__default'
    },
    standalone: true,
    hostDirectives: [MatRipple]
})
export class ElmButton extends ElmColorDirective {
    constructor(host: ElementRef<HTMLButtonElement>) {
        super(host);
    }
}

@Directive({
    selector: '[elmBoldButton]',
    exportAs: 'elmBoldButton',
    host: {
        class: 'elm-clickable elm-color__default--bold'
    },
    standalone: true,
    hostDirectives: [MatRipple]
})
export class ElmBoldButton extends ElmBoldColorDirective {
    constructor(public host: ElementRef<HTMLButtonElement>) {
        super(host);
    }
}
