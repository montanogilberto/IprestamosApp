import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesDetailPageRoutingModule } from './clientes-detail-routing.module';

import { ClientesDetailPage } from './clientes-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesDetailPageRoutingModule
  ],
  declarations: [ClientesDetailPage]
})
export class ClientesDetailPageModule {}
