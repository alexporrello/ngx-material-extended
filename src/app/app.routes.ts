import { Routes } from '@angular/router';
import { EditableTable } from './editable-table/editable-table';
import { BasicTable } from './basic-table/basic-table';

export const routes: Routes = [
    { path: '', component: EditableTable },
    {
        path: 'editable',
        component: EditableTable
    },
    {
        path: 'basic-table',
        component: BasicTable
    }
];
