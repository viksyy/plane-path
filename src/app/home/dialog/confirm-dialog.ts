import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface FlightData {
    flightName: string;
}

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: FlightData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}