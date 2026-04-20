import { NgModule } from '@angular/core';
import { MexTable } from './table';
import { MexTableSection } from './table-section';
import { MexTableCell } from './table-cell';
import { MexTableRow } from './table-row';
import { MexTableSectionDivider } from './table-section-divider';
import { MexEditableTableCell } from './editable-table-cell';

const components = [
    MexTable,
    MexTableSection,
    MexTableCell,
    MexTableRow,
    MexTableSectionDivider,
    MexEditableTableCell
];

@NgModule({
    imports: components,
    exports: components
})
export class MexTableModule {}
