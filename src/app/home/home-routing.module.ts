import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

const childRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}