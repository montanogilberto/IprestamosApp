import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvalesPage } from './avales.page';

const routes: Routes = [
  {
    path: '',
    component: AvalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvalesPageRoutingModule {}
