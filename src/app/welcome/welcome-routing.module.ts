import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';

const childRoutes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class WelcomeRoutingModule {}