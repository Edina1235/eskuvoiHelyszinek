import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'locations',
    loadChildren: () => import('./pages/locations/locations.module').then(m => m.LocationsModule),
    canActivate : [AuthGuard] },
  { path: 'datas',
    loadChildren: () => import('./pages/datas/datas.module').then(m => m.DatasModule),
    canActivate : [AuthGuard] },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
