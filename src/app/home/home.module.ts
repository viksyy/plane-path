
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FlightListModule } from '../flight-list';
import { MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import { ConfirmDialogModule } from './dialog/confirm-dialog.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlightListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ConfirmDialogModule
    
  ],
  providers: []
})
export class HomeModule { }
