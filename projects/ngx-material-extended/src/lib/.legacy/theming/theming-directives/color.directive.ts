import { Directive, ElementRef, Inject, Input, Optional } from '@angular/core';
import { ElmColor, ElmColorClass, elmColorClasses } from './types';

@Directive({
    selector: '[_elmColor]',
    standalone: true
})
export class ElmColorBaseDirective {
    @Input()
    set color(color: ElmColor | null) {
        this.setButtonClass(color ?? 'default');
    }

    constructor(
        protected _host: ElementRef<HTMLButtonElement>,
        @Optional()
        @Inject('BUTTON_CLASSES_MAP')
        private _buttonClassesMap: Partial<Record<ElmColor, ElmColorClass>> = {}
    ) {
        this.setButtonClass('default');
    }

    public setButtonClass(buttonClass: ElmColor) {
        this.removeButtonClass();
        this._host.nativeElement.classList.add(
            this._buttonClassesMap[buttonClass] ?? 'elm-color__default'
        );
    }

    public removeButtonClass() {
        elmColorClasses.forEach((buttonClass) =>
            this._host.nativeElement.classList.remove(buttonClass)
        );
    }
}

@Directive({
    selector: '[elmColor]',
    exportAs: 'elmColor',
    standalone: true,
    host: {
        class: 'elm-color__default'
    }
})
export class ElmColorDirective extends ElmColorBaseDirective {
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
    selector: '[elmBoldColor]',
    exportAs: 'elmBoldColor',
    standalone: true,
    host: {
        class: 'elm-color__default--bold'
    }
})
export class ElmBoldColorDirective extends ElmColorBaseDirective {
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
