import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormaPagosPageRoutingModule } from './forma-pagos-routing.module';

import { FormaPagosPage } from './forma-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormaPagosPageRoutingModule
  ],
  declarations: [FormaPagosPage]
})
export class FormaPagosPageModule {}
