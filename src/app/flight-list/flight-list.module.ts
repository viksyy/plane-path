import { NgModule } from '@angular/core';

import { FlightListComponent } from './flight-list.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatCardModule],
    exports: [FlightListComponent],
    declarations: [FlightListComponent],
    providers: [],
})
export class FlightListModule { }
