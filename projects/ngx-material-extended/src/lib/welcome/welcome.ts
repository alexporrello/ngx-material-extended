import {
    Component,
    effect,
    input,
    OnDestroy,
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
export class MexWelcome implements OnDestroy {
    public readonly loading = input<boolean>(false);
    public readonly showBody = input<boolean | null>(false);

    public readonly hide = signal(false);
    public readonly showOverlay = signal(true);

    private _hideTimer: ReturnType<typeof setTimeout> | undefined;

    constructor() {
        effect(() => {
            clearTimeout(this._hideTimer);
            const hide = this.showBody();
            if (hide) {
                this.hide.set(true);
                this._hideTimer = setTimeout(() => {
                    this.showOverlay.set(false);
                }, 500);
            } else {
                this.showOverlay.set(true);
                this._hideTimer = setTimeout(() => {
                    this.hide.set(false);
                }, 5);
            }
        });
    }

    ngOnDestroy(): void {
        clearTimeout(this._hideTimer);
    }

    public toggle(hide?: boolean): void {
        this.hide.update((v) => {
            if (hide !== undefined) return hide;
            return !v;
        });
    }
}
