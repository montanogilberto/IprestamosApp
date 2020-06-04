import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestamoDetailPage } from './prestamo-detail.page';
import { PipesModule } from "../../pipes/pipes.module";


const routes: Routes = [
  {
    path: '',
    component: PrestamoDetailPage
  }
];

@NgModule({
  imports: [
        RouterModule.forChild(routes),
        PipesModule
      ],
  exports: [RouterModule],
})
export class PrestamoDetailPageRoutingModule {}
