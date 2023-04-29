import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import {AuthGuard} from "../../shared/guard/auth.guard";

const routes: Routes = [
  { path: '',
    component: LocationsComponent },
  { path: 'allocates',
    loadChildren: () => import('./allocates/allocates.module').then(m => m.AllocatesModule),
    canActivate : [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
