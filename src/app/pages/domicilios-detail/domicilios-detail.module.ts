import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomiciliosDetailPageRoutingModule } from './domicilios-detail-routing.module';

import { DomiciliosDetailPage } from './domicilios-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomiciliosDetailPageRoutingModule
  ],
  declarations: [DomiciliosDetailPage]
})
export class DomiciliosDetailPageModule {}
