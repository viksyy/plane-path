
import { NgModule } from '@angular/core';
import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomeComponent } from './welcome.component';
import { MatCardModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    WelcomeRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: []
})
export class WelcomeModule { }
