import { Component } from '@angular/core';
import { MexEditableTableCellEvent, MexTableModule } from 'ngx-material-extended';
import { DataService } from '../data.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-editable-table',
    imports: [MexTableModule],
    templateUrl: './editable-table.html',
    styleUrl: './editable-table.scss'
})
export class EditableTable {
    constructor(
        public data: DataService,
        public appService: AppService
    ) {
        this.appService.pageTitle.set('Editable Table Demo');
    }

    public onCellEdit(event: MexEditableTableCellEvent) {
        event.submit();

        setTimeout(() => {
            event.success();
            event.accept();
        }, 1000);
    }
}
