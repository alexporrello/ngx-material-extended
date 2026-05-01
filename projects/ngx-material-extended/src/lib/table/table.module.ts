import { NgModule } from '@angular/core';
import { MexTable } from './table';
import { MexTableSection } from './table-section';
import { MexTableCell } from './table-cell';
import { MexTableRow } from './table-row';
import { MexTableSectionDivider } from './table-section-divider';
import { MexEditableTableCell } from './editable-table-cell';
import { MexSortableTableCell } from './sortable-table-cell';
import { MexSortableTableRow } from './sortable-table-row';

const components = [
    MexTable,
    MexTableSection,
    MexTableCell,
    MexTableRow,
    MexTableSectionDivider,
    MexEditableTableCell,
    MexSortableTableCell,
    MexSortableTableRow
];

@NgModule({
    imports: components,
    exports: components
})
export class MexTableModule {}
