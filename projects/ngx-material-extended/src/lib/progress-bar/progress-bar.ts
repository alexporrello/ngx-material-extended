import {
    Component,
    Directive,
    ElementRef,
    input,
    NgModule,
    Renderer2
} from '@angular/core';

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
        @if (loading()) {
            <mex-progress-bar-thumb
                animate.enter="progress-bar-enter-animation"
                animate.leave="progress-bar-leave-animation"
            ></mex-progress-bar-thumb>
        }
    `,
    imports: [MexProgressBarThumb]
})
export class MexProgressBar {
    public readonly loading = input<boolean | null>(false);
}

@NgModule({
    imports: [MexProgressBarWrapper, MexProgressBarThumb],
    exports: [MexProgressBarWrapper, MexProgressBarThumb]
})
export class MexProgressBarModule {}
