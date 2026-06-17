import { Component, signal } from '@angular/core';
import { DataService } from '../data.service';
import { AppService } from '../app.service';
import { MexTableModule } from 'ngx-material-extended';

@Component({
    selector: 'app-basic-table',
    imports: [MexTableModule],
    templateUrl: './basic-table.html',
    styleUrl: './basic-table.scss'
})
export class BasicTable {
    public showTopBody = signal(true);
    public showBody = signal(true);

    constructor(
        public data: DataService,
        public appService: AppService
    ) {
        this.appService.pageTitle.set('Table Demo');
    }

    public toggleShowTopBody() {
        this.showTopBody.update((val) => !val);
    }

    public toggleShowBody() {
        this.showBody.update((val) => !val);
    }
}
