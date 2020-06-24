import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesDetailPage } from './clientes-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesDetailPageRoutingModule {}
