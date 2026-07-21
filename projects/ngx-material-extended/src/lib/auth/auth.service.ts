import { Signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface MexAuthService {
    errorMessage$: Subject<string | null>;
    validateUsername(username: string): Observable<boolean>;
    logIn(username: string, password: string): Observable<any>;
    logOut(): Observable<any>;

    /**
     * Optional reactive login state. When provided, consumers such as
     * `MexApps` use it to gate auth-required entries; when absent they fall
     * back to showing everything (no auth wiring).
     */
    isAuthenticated?: Signal<boolean>;
}
