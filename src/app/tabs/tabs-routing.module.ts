import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'user-detail',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../user-detail/user-detail.module').then(m => m.UserDetailPageModule)
          }
        ]
      },
      {
        path: 'clientes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../clientes/clientes.module').then(m => m.ClientesPageModule)
          }
        ]
      },
      {
        path: 'prestamos',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/prestamos/prestamos.module').then( m => m.PrestamosPageModule)
          }
        ]
      },
      {
        path: 'prestamo-detail',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/prestamo-detail/prestamo-detail.module').then( m => m.PrestamoDetailPageModule)
          }
        ]
      },
      {
        path: 'pagos',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/pagos/pagos.module').then( m => m.PagosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
