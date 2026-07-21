import {
    Component,
    Inject,
    Input,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import {
    MexAppsListToken,
    MexAppsPageText,
    MexRoute,
    MexRoutes,
    MexWelcomeTextToken
} from '../config/config';
import { NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MexSymbol } from '../symbol/symbol';
import { MexAuthService } from '../auth/auth.service';
import { MexAuthServiceToken } from '../auth/provide-auth-service';

@Component({
    selector: 'mex-apps',
    imports: [
        NgTemplateOutlet,
        MatButtonModule,
        MatIcon,
        RouterLink,
        MatMenuModule,
        MatRippleModule,
        MexSymbol
    ],
    templateUrl: './apps.html',
    styleUrl: './apps.scss',
    encapsulation: ViewEncapsulation.None
})
export class MexApps {
    @Input()
    asDropdown = false;

    constructor(
        @Optional() @Inject(MexAppsListToken) public appsList: MexRoutes,
        @Optional()
        @Inject(MexWelcomeTextToken)
        public appName?: MexAppsPageText,
        @Optional()
        @Inject(MexAuthServiceToken)
        private _auth?: MexAuthService
    ) {}

    /**
     * Live login state. Defaults to `true` when no auth service (or no
     * `isAuthenticated` signal) is wired up, so apps without auth keep seeing
     * every entry.
     */
    isAuthenticated = () => this._auth?.isAuthenticated?.() ?? true;

    /**
     * An app is shown when it isn't excluded from the switcher (`appRoute`) and
     * either needs no auth (no `canActivate` guard) or the user is logged in.
     */
    showApp = (app: MexRoute): boolean =>
        app.appRoute !== false &&
        (!app.canActivate?.length || this.isAuthenticated());
}
