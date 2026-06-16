import { Directive, ElementRef, Inject, Input, Optional } from '@angular/core';
import { MexColor, MexColorClass, mexColorClasses } from './types';

@Directive({
    selector: '[_mexColor]',
    standalone: true
})
export class MexColorBaseDirective {
    @Input()
    set color(color: MexColor | null) {
        this.setButtonClass(color ?? 'default');
    }

    constructor(
        protected _host: ElementRef<HTMLButtonElement>,
        @Optional()
        @Inject('BUTTON_CLASSES_MAP')
        private _buttonClassesMap: Partial<Record<MexColor, MexColorClass>> = {}
    ) {
        this.setButtonClass('default');
    }

    public setButtonClass(buttonClass: MexColor) {
        this.removeButtonClass();
        this._host.nativeElement.classList.add(
            this._buttonClassesMap[buttonClass] ?? 'elm-color__default'
        );
    }

    public removeButtonClass() {
        mexColorClasses.forEach((buttonClass) =>
            this._host.nativeElement.classList.remove(buttonClass)
        );
    }
}

@Directive({
    selector: '[mexColor]',
    exportAs: 'mexColor',
    standalone: true,
    host: {
        class: 'elm-color__default'
    }
})
export class MexColorDirective extends MexColorBaseDirective {
    constructor(host: ElementRef<HTMLButtonElement>) {
        super(host, {
            default: 'elm-color__default',
            primary: 'elm-color__primary',
            accent: 'elm-color__accent',
            warn: 'elm-color__warn',
            alert: 'elm-color__alert'
        });
    }
}

@Directive({
    selector: '[mexBoldColor]',
    exportAs: 'mexBoldColor',
    standalone: true,
    host: {
        class: 'elm-color__default--bold'
    }
})
export class MexBoldColorDirective extends MexColorBaseDirective {
    constructor(host: ElementRef<HTMLButtonElement>) {
        super(host, {
            default: 'elm-color__default--bold',
            primary: 'elm-color__primary--bold',
            accent: 'elm-color__accent--bold',
            warn: 'elm-color__warn--bold',
            alert: 'elm-color__warn--alert'
        });
    }
}
