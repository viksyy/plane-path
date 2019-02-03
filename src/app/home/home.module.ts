
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FlightListModule } from '../flight-list';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlightListModule
  ],
  providers: []
})
export class HomeModule { }
