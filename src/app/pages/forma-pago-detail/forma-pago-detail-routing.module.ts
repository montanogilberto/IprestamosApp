import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormaPagoDetailPage } from './forma-pago-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FormaPagoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormaPagoDetailPageRoutingModule {}
