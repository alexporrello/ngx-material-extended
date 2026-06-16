import { Observable, Subject } from 'rxjs';

export interface MexAuthService {
    errorMessage$: Subject<string | null>;
    validateUsername(username: string): Observable<boolean>;
    logIn(username: string, password: string): Observable<any>;
    logOut(): Observable<any>;
}
