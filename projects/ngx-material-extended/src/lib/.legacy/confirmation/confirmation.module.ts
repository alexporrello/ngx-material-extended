import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ElmConfirmation } from './confirmation';
import { ElmConfirmationService } from './confirmation.service';
import { ElmButton } from '../theming/public-api';

@NgModule({
    declarations: [ElmConfirmation],
    exports: [ElmConfirmation, MatDialogModule],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        ElmButton
    ],
    providers: [ElmConfirmationService]
})
export class ElmConfirmationModule {}
