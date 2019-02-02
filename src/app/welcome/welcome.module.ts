
import { NgModule } from '@angular/core';
import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomeComponent } from './welcome.component';


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    WelcomeRoutingModule
  ],
  providers: []
})
export class WelcomeModule { }
