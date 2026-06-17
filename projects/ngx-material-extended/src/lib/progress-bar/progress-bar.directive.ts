import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

type Falsy = null | undefined;

@Directive({
    selector: '[mexProgressBar]',
    exportAs: 'mexProgressBar',
    standalone: true
})
export class MexProgressBarDirective implements OnInit {
    @Input()
    set loading(loading: boolean | null | Falsy) {
        this._pendingLoading = loading ?? null;
        if (!this._spinnerWrapper) return;
        this._applyLoading(loading ?? null);
    }

    private _spinnerWrapper!: HTMLDivElement;
    private _spinner!: HTMLDivElement;
    private _pendingLoading: boolean | null = null;

    constructor(
        private _host: ElementRef<HTMLDivElement>,
        private _renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this._spinner = this._renderer.createElement('div');
        this._spinnerWrapper = this._renderer.createElement('div');
        this._spinner.classList.add('elm-form-spinner');
        this._spinnerWrapper.classList.add('elm-form-spinner__wrapper');
        this._spinnerWrapper.classList.add('elm-form-spinner__wrapper--hide');
        this._spinnerWrapper.appendChild(this._spinner);
        this._host.nativeElement.appendChild(this._spinnerWrapper);
        this._host.nativeElement.style.position = 'relative';
        this._applyLoading(this._pendingLoading);
    }

    private _applyLoading(loading: boolean | null): void {
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
}
