
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from './confirm-dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule, MatDialogModule } from '@angular/material';


@NgModule({
    entryComponents: [ConfirmDialog],
    declarations: [
        ConfirmDialog
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatDialogModule
    ],
    providers: []
})
export class ConfirmDialogModule { }
