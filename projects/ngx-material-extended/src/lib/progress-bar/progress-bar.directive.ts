import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

type Falsy = null | undefined;

@Directive({
    selector: '[mexProgressBar]',
    exportAs: 'mexProgressBar',
    standalone: true
})
export class MexProgressBarDirective {
    @Input()
    set loading(loading: boolean | null | Falsy) {
        if (loading) {
            this._spinner.classList.add('elm-form-spinner__animate');
            this._spinnerWrapper.classList.remove(
                'elm-form-spinner__wrapper--hide'
            );
        } else {
            this._spinnerWrapper.classList.add(
                'elm-form-spinner__wrapper--hide'
            );
            this._spinner.classList.remove('elm-form-spinner__animate');
        }
    }

    private _spinnerWrapper: HTMLDivElement =
        this._renderer.createElement('div');
    private _spinner: HTMLDivElement = this._renderer.createElement('div');

    constructor(
        private _host: ElementRef<HTMLDivElement>,
        private _renderer: Renderer2
    ) {
        this._spinner.classList.add('elm-form-spinner');
        this._spinnerWrapper.classList.add('elm-form-spinner__wrapper');
        this._spinnerWrapper.classList.add('elm-form-spinner__wrapper--hide');
        this._spinnerWrapper.appendChild(this._spinner);
        this._host.nativeElement.appendChild(this._spinnerWrapper);
        this._host.nativeElement.style.position = 'relative';
    }
}
