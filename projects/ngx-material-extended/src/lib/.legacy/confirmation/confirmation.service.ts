import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import type { ElmConfirmationOptions } from './confirmation-options';
import { isElmConfirmationOpts } from './confirmation-options';
import { ElmConfirmation } from './confirmation';

@Injectable({
    providedIn: 'root'
})
export class ElmConfirmationService {
    constructor(private _dialog: MatDialog) {}

    public openConfirmationDialog(
        config: MatDialogConfig<ElmConfirmationOptions> | ElmConfirmationOptions
    ) {
        return this._dialog.open(
            ElmConfirmation,
            isElmConfirmationOpts(config)
                ? {
                      data: config
                  }
                : config
        );
    }
}
