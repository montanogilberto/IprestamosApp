import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard} from './guards/nologin.guard'
//import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'portafolio',
    loadChildren: () => import('./portafolio/portafolio.module').then( m => m.PortafolioPageModule)
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'clientes-details/:id',
    loadChildren: () => import('./pages/clientes-details/clientes-details.module').then( m => m.ClientesDetailsPageModule)
  }
  ,
  {
    path: 'clientes-details',
    loadChildren: () => import('./pages/clientes-details/clientes-details.module').then( m => m.ClientesDetailsPageModule)
  },
  {
    path: 'login',
    canActivate: [NologinGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'prestamos',
    loadChildren: () => import('./pages/prestamos/prestamos.module').then( m => m.PrestamosPageModule)
  },
  {
    path: 'prestamo-detail/:id',
    loadChildren: () => import('./pages/prestamo-detail/prestamo-detail.module').then( m => m.PrestamoDetailPageModule)
  },
  {
    path: 'prestamo-detail',
    loadChildren: () => import('./pages/prestamo-detail/prestamo-detail.module').then( m => m.PrestamoDetailPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'domicilios',
    loadChildren: () => import('./pages/domicilios/domicilios.module').then( m => m.DomiciliosPageModule)
  },
  {
    path: 'domicilios-detail',
    loadChildren: () => import('./pages/domicilios-detail/domicilios-detail.module').then( m => m.DomiciliosDetailPageModule)
  },
  {
    path: 'domicilios-detail/:id',
    loadChildren: () => import('./pages/domicilios-detail/domicilios-detail.module').then( m => m.DomiciliosDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
