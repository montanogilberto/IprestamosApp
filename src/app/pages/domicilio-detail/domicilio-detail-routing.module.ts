import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicilioDetailPage } from './domicilio-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DomicilioDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicilioDetailPageRoutingModule {}
