import {
    Component,
    effect,
    input,
    Input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { MexProgressBarDirective } from '../progress-bar/progress-bar.directive';

@Component({
    selector: 'mex-welcome-title',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'mat-display-1'
    }
})
export class MexWelcomeTitle {}

@Component({
    selector: 'mex-welcome-subtitle',
    template: `<span class="mat-subheading-2 mat-subheading-2__flex">
        <ng-content></ng-content>
    </span>`
})
export class MexWelcomeSubtitle {}

@Component({
    selector: 'mex-welcome-actions',
    template: `<ng-content></ng-content>`
})
export class MexWelcomeActions {}

@Component({
    selector: 'mex-welcome',
    templateUrl: './welcome.html',
    styleUrl: './welcome.scss',
    imports: [MexProgressBarDirective],
    encapsulation: ViewEncapsulation.None
})
export class MexWelcome {
    public _loading = input<boolean>(false, { alias: 'loading' });

    @Input()
    public set showBody(hide: boolean | null) {
        if (hide) {
            this.hide.set(hide);
            setTimeout(() => {
                this.showOverlay.set(!hide);
            }, 500);
        } else {
            this.showOverlay.set(true);
            setTimeout(() => {
                this.hide.set(false);
            }, 5);
        }
    }

    public loading = signal<boolean>(false);
    public hide = signal(false);
    public showOverlay = signal(true);

    constructor() {
        effect(() => {
            const loading = this._loading();
            this.loading.set(loading);
        });
    }

    public toggle(hide?: boolean): void {
        this.hide.update((v) => {
            if (hide !== undefined) return hide;
            return !v;
        });
    }
}
