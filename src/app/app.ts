import {
    Component,
    DOCUMENT,
    inject,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterOutlet } from '@angular/router';

import { NgxTableModule } from 'ngx-table';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [
        NgxTableModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconButton,
        MatMenu,
        MatMenuTrigger,
        MatMenuItem,
        RouterOutlet
    ],
    encapsulation: ViewEncapsulation.None
})
export class App {
    public router = inject(Router);
    public document = inject(DOCUMENT);

    public lightMode = signal<boolean>(true);

    constructor(public service: AppService) {
        const body = this.document.getElementById('appBody');
        if (body?.classList.contains('ngx-light-mode')) {
            this.lightMode.set(true);
        } else {
            this.lightMode.set(false);
        }
    }

    public toggleLightDarkMode() {
        const body = this.document.getElementById('appBody');

        this.lightMode.update((val) => {
            console.log('light-mode', val);
            val = !val;
            if (val) {
                body?.classList.add('ngx-light-mode');
            } else {
                body?.classList.remove('ngx-light-mode');
            }
            return val;
        });
    }
}
