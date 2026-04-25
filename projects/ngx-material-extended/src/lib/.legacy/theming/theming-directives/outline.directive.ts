import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[elmOutline]',
    exportAs: 'elmOutline',
    host: {
        class: 'elm-border'
    },
    standalone: true
})
export class ElmOutlineDirective {
    @Input()
    set padding(padding: number | string | null) {
        this._renderer.setStyle(
            this._hostElement.nativeElement,
            'padding',
            typeof padding === 'number' ? padding + 'px' : padding
        );
    }

    constructor(
        private _hostElement: ElementRef<HTMLElement>,
        private _renderer: Renderer2
    ) {}
}
