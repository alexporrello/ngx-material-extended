import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import {
    Component,
    Directive,
    ElementRef,
    Input,
    NgModule,
    Renderer2
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[mexProgressBarWrapper]',
    exportAs: 'mexProgressBarWrapper'
})
export class MexProgressBarWrapper {
    constructor(
        private _host: ElementRef<HTMLElement>,
        private _renderer: Renderer2
    ) {
        this._renderer.addClass(
            this._host.nativeElement,
            'progress-bar__wrapper'
        );
    }
}

export const mexProgressBarAnimation = trigger('mexProgressBar', [
    transition(':enter', [style({ height: '0' }), animate('150ms')]),
    transition(':leave', [animate('150ms', style({ height: '0' }))])
]);

@Component({
    selector: 'mex-progress-bar-thumb',
    template: ` <div></div> `,
    host: {
        class: 'progress-bar'
    }
})
export class MexProgressBarThumb {}

@Component({
    selector: 'mex-progress-bar',
    template: `
        @if (loading$ | async) {
            <mex-progress-bar-thumb @mexProgressBar></mex-progress-bar-thumb>
        }
    `,
    imports: [MexProgressBarThumb, AsyncPipe],
    animations: [mexProgressBarAnimation]
})
export class MexProgressBar {
    @Input()
    set loading(isLoading: boolean | null) {
        this.loading$.next(isLoading ?? false);
    }
    public loading$ = new BehaviorSubject(true);
}

@NgModule({
    imports: [MexProgressBarWrapper, MexProgressBarThumb],
    exports: [MexProgressBarWrapper, MexProgressBarThumb]
})
export class MexProgressBarModule {}
