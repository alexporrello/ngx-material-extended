import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const DARK_MODE = 'DARK_MODE';

@Injectable({
    providedIn: 'root'
})
export class ElmThemeService {
    public preferDarkTheme = false;

    private _bodyElement?: HTMLBodyElement;

    constructor(@Inject(DOCUMENT) private _document: Document) {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (ev) => {
                this.applyTheme(ev.matches);
            });

        this.applyTheme(this._prefersDarkTheme);
    }

    private get _prefersDarkTheme() {
        const preference = sessionStorage.getItem(DARK_MODE);
        if (preference) return preference === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    public applyTheme(darkTheme: boolean) {
        this.preferDarkTheme = darkTheme;

        if (darkTheme) {
            sessionStorage.setItem(DARK_MODE, 'true');
            this.body?.classList.add('darkMode');
            return;
        }

        this.body?.classList.remove('darkMode');
        sessionStorage.setItem(DARK_MODE, 'false');
    }

    public get body() {
        if (!this._bodyElement) {
            this._bodyElement = this._document.getElementsByTagName('body')[0];
        }

        return this._bodyElement;
    }

    public toggleTheme(darkTheme = !this.preferDarkTheme) {
        this.applyTheme(darkTheme);
    }
}
