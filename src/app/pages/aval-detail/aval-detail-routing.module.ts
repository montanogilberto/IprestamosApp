import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvalDetailPage } from './aval-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AvalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvalDetailPageRoutingModule {}
