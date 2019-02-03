import { NgModule } from '@angular/core';

import { FlightListComponent } from './flight-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [FlightListComponent],
    declarations: [FlightListComponent],
    providers: [],
})
export class FlightListModule { }
