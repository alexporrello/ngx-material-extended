import { Route } from '@angular/router';

export const MexAppsListToken = 'APPS_LIST';
export const MexAppNameToken = 'APP_NAME';
export const MexWelcomeTextToken = 'WELCOME_TEXT';
export const MexMaterialSymbolToken = 'MAT_SYMBOLS';

export declare type MexRoutes = MexRoute[];

export declare interface MexRoute extends Route {
    iconUrl?: string;
    matIcon?: string;
    elmSymbol?: string;
    appRoute?: boolean;
}

export declare interface MexAppsPageText {
    welcomeText?: string;
    callToActionText?: string;
}

export function provideMexConfig(options: {
    apps: MexRoute[];
    appName?: string;
    welcomeText?: string;
    callToActionText?: string;
}) {
    return [
        {
            provide: MexAppsListToken,
            useValue: options.apps
        },
        {
            provide: MexAppNameToken,
            useValue: options.appName
        },
        {
            provide: MexWelcomeTextToken,
            useValue: {
                welcomeText: options.welcomeText,
                callToActionText: options.callToActionText
            }
        }
    ];
}
