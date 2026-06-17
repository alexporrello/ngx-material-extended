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
        public appName?: MexAppsPageText
    ) {}
}
