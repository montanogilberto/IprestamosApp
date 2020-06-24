import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormaPagosPage } from './forma-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: FormaPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormaPagosPageRoutingModule {}
