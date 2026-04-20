import { NgModule } from '@angular/core';
import { MexTable } from './table';
import { MexTableSection } from './table-section';
import { MexTableCell } from './table-cell';

const components = [MexTable, MexTableSection, MexTableCell];

@NgModule({
    imports: components,
    exports: components
})
export class MexTableModule {}
