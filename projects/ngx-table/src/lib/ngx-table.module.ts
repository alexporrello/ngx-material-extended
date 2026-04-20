import { NgModule } from '@angular/core';
import { NgxTable } from './ngx-table';
import { NgxTbody } from './ngx-tbody';
import { NgxTd } from './ngx-td';
import { NgxTfoot } from './ngx-tfoot';
import { NgxTh } from './ngx-th';
import { NgxThead } from './ngx-thead';
import { NgxTr } from './ngx-tr';
import { NgxEditableTd } from './ngx-editable-td';

const components = [
    NgxTable,
    NgxThead,
    NgxTbody,
    NgxTfoot,
    NgxTr,
    NgxTh,
    NgxTd,
    NgxEditableTd
];

@NgModule({
    imports: components,
    exports: components
})
export class NgxTableModule {}
