import { NgTemplateOutlet } from '@angular/common';
import {
    Component,
    Inject,
    input,
    OnDestroy,
    Optional,
    output,
    signal
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
    MatError,
    MatFormField,
    MatInput,
    MatLabel
} from '@angular/material/input';
import { MexAppNameToken } from '../config/config';
import { MexAuthService } from '../auth/auth.service';
import { MexAuthServiceToken } from '../auth/provide-auth-service';
import {
    MexProgressBarThumb,
    MexProgressBarWrapper
} from '../progress-bar/progress-bar';
import { MexSymbol } from '../symbol/symbol';
import { Subscription } from 'rxjs';

@Component({
    selector: 'mex-login-e2',
    templateUrl: 'login-e2.html',
    styleUrl: 'login-e2.scss',
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        ReactiveFormsModule,
        MatLabel,
        MatCheckbox,
        NgTemplateOutlet,
        MatButton,
        MexSymbol,
        MatError,
        MexProgressBarThumb,
        MexProgressBarWrapper
    ]
})
export class MexLoginE2 implements OnDestroy {
    private _subscription = new Subscription();

    public readonly fillView = input(true);

    /** Labels for the credential fields. Defaults preserve prior behavior;
     *  override to match the auth provider (e.g. "Email / Username"). */
    public readonly usernameLabel = input('Username');
    public readonly passwordLabel = input('Password');

    public readonly onValidateUsername = output<string>();
    public readonly onLogIn = output<{ username: string; password: string }>();
    public readonly onAuthComplete = output<void>();

    public readonly usernameValid = signal(false);
    public readonly hidePassword = signal(true);
    public readonly loading = signal(false);

    public readonly form = new FormGroup({
        username: new FormControl<string | null>(null, {
            validators: [Validators.required]
        }),
        password: new FormControl<string | null>(null, {
            validators: [Validators.required]
        })
    });

    constructor(
        @Inject(MexAuthServiceToken)
        public authService: MexAuthService,
        @Optional()
        @Inject(MexAppNameToken)
        public appName?: string
    ) {}

    public requestValidateUsername(username: string | null) {
        if (username === null) return;
        this.loading.set(true);
        this._subscription.add(
            this.authService.validateUsername(username).subscribe({
                next: () => {
                    this.usernameValid.set(true);
                    this.loading.set(false);
                },
                error: () => {
                    this.loading.set(false);
                }
            })
        );
    }

    public requestLogIn(username: string | null, password: string | null) {
        if (username === null || password === null) return;
        this.loading.set(true);
        this._subscription.add(
            this.authService.logIn(username, password).subscribe({
                next: () => {
                    this.loading.set(false);
                    this.onAuthComplete.emit();
                },
                error: () => {
                    this.loading.set(false);
                }
            })
        );
    }

    public returnToUsername() {
        this.usernameValid.set(false);
        this.loading.set(false);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
