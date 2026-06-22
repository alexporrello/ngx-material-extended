import { Component } from '@angular/core';
import { MexBentoModule, MexPanelModule } from 'ngx-material-extended';
import { AppService } from '../app.service';

@Component({
    selector: 'app-bento',
    imports: [MexBentoModule, MexPanelModule],
    templateUrl: './bento.html',
    styleUrl: './bento.scss'
})
export class Bento {
    constructor(public appService: AppService) {
        this.appService.pageTitle.set('Bento Demo');
    }
}
