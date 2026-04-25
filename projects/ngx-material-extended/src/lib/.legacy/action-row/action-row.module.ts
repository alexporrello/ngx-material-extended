import { NgModule } from '@angular/core';
import { ElmActionRow } from './action-row';
import { ElmActionRowItem } from './action-row-item';
import { ElmActionRowTextArea } from './action-row-text-area';
import { ElmActionRowButton } from './action-row-button';

@NgModule({
    declarations: [],
    imports: [
        ElmActionRow,
        ElmActionRowItem,
        ElmActionRowTextArea,
        ElmActionRowButton
    ],
    exports: [
        ElmActionRow,
        ElmActionRowItem,
        ElmActionRowTextArea,
        ElmActionRowButton
    ]
})
export class ElmActionRowModule {}
