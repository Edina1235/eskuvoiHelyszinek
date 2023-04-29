import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocatesComponent } from './allocates.component';

const routes: Routes = [{ path: ':ez', component: AllocatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllocatesRoutingModule { }
