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
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
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
  },
  {
    path: 'second/:price',
    loadChildren: () => import('./pages/second/second.module').then( m => m.SecondPageModule)
  },
  {
    path: 'clientes-detail/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./clientes-detail/clientes-detail.module').then( m => m.ClientesDetailPageModule)
  },
  {
    path: 'clientes-detail',
    canActivate: [AuthGuard],
    loadChildren: () => import('./clientes-detail/clientes-detail.module').then( m => m.ClientesDetailPageModule)
  },
  {
    path: 'domicilios/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/domicilios/domicilios.module').then( m => m.DomiciliosPageModule)
  },
  {
    path: 'forma-pagos/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/forma-pagos/forma-pagos.module').then( m => m.FormaPagosPageModule)
  },
  {
    path: 'avales/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/avales/avales.module').then( m => m.AvalesPageModule)
  },
  {
    path: 'adjuntos/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/adjuntos/adjuntos.module').then( m => m.AdjuntosPageModule)
  },
  {
    path: 'informacion-personal/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/informacion-personal/informacion-personal.module').then( m => m.InformacionPersonalPageModule)
  },
  {
    path: 'login',
    canActivate: [NologinGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'domicilio-detail/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/domicilio-detail/domicilio-detail.module').then( m => m.DomicilioDetailPageModule)
  },
  {
    path: 'aval-detail',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/aval-detail/aval-detail.module').then( m => m.AvalDetailPageModule)
  },
  {
    path: 'forma-pago-detail',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/forma-pago-detail/forma-pago-detail.module').then( m => m.FormaPagoDetailPageModule)
  },
  {
    path: 'registro',
    canActivate: [NologinGuard],
    loadChildren: () => import('./components/registro/registro.module').then( m => m.RegistroPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
