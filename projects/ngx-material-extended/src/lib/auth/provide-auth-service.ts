import { Provider, Type } from '@angular/core';
import { MexAuthService } from './auth.service';

export const MexAuthServiceToken = 'AUTH_SERVICE';

export function provideMexAuthService(
    authServiceType: Type<MexAuthService>
): Provider[] {
    return [
        {
            provide: authServiceType,
            useClass: authServiceType
        },
        {
            provide: MexAuthServiceToken,
            useFactory: (instance: MexAuthService) => instance,
            deps: [authServiceType]
        }
    ];
}
