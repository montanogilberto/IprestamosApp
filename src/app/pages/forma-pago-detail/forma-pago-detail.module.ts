import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormaPagoDetailPageRoutingModule } from './forma-pago-detail-routing.module';

import { FormaPagoDetailPage } from './forma-pago-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormaPagoDetailPageRoutingModule
  ],
  declarations: [FormaPagoDetailPage]
})
export class FormaPagoDetailPageModule {}
