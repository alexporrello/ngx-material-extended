import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import type { ElmConfirmationOptions } from './confirmation-options';

// to-do Fix styling on this element

@Component({
    selector: 'elm-confirmation',
    templateUrl: './confirmation.html',
    styleUrl: 'confirmation.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ElmConfirmation {
    @Input() inTemplate = false;

    public confirmButtonColor: 'primary' | 'accent' | 'warn' = 'accent';
    public confirmButtonText = 'Confirm';

    public cancelButtonColor: 'primary' | 'accent' | 'warn' = 'warn';
    public cancelButtonText = 'Cancel';
    public cancelButtonShow = true;

    public icon: 'announcement' | 'contact_support' | 'where_to_vote' | string =
        'contact_support';
    public iconColor: 'primary' | 'accent' | 'warn' = 'primary';

    constructor(
        @Inject(MAT_DIALOG_DATA) public opts: ElmConfirmationOptions,
        private _dialogRef: MatDialogRef<ElmConfirmation>
    ) {
        this.confirmButtonText = opts.confirmText ?? this.confirmButtonText;

        switch (opts.dialogType) {
            case 'error':
                this.confirmButtonColor = 'primary';
                this.confirmButtonText = 'Retry';
                this.cancelButtonColor = 'warn';
                this.cancelButtonText = 'Cancel';
                this.iconColor = 'warn';
                this.icon = 'announcement';
                break;
            case 'success':
                this.confirmButtonColor = 'accent';
                this.confirmButtonText = 'Close';
                this.cancelButtonShow = false;
                this.iconColor = 'accent';
                this.icon = 'where_to_vote';
                break;
        }

        if (opts.icon) {
            this.icon = opts.icon;
        }

        if (opts.iconColor) {
            this.iconColor = opts.iconColor;
        }

        if (opts.cancelButtonColor) {
            this.cancelButtonColor = opts.cancelButtonColor;
        }

        if (opts.confirmButtonColor) {
            this.confirmButtonColor = opts.confirmButtonColor;
        }
    }

    public cancel(): void {
        this._dialogRef.close(false);
    }

    public confirm(): void {
        this._dialogRef.close(true);
    }
}
