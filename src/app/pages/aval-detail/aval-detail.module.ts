import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvalDetailPageRoutingModule } from './aval-detail-routing.module';

import { AvalDetailPage } from './aval-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvalDetailPageRoutingModule
  ],
  declarations: [AvalDetailPage]
})
export class AvalDetailPageModule {}
