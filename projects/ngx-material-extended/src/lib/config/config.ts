import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

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

export const MexAppsListToken = new InjectionToken<MexRoutes>('MexAppsList');
export const MexAppNameToken = new InjectionToken<string>('MexAppName');
export const MexWelcomeTextToken = new InjectionToken<MexAppsPageText>('MexWelcomeText');
export const MexMaterialSymbolToken = new InjectionToken<boolean>('MexMaterialSymbol');

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
