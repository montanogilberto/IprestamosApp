import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilioDetailPageRoutingModule } from './domicilio-detail-routing.module';

import { DomicilioDetailPage } from './domicilio-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioDetailPageRoutingModule
  ],
  declarations: [DomicilioDetailPage]
})
export class DomicilioDetailPageModule {}
