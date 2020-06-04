import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomiciliosDetailPage } from './domicilios-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DomiciliosDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomiciliosDetailPageRoutingModule {}
