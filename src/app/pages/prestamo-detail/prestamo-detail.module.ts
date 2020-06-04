import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrestamoDetailPageRoutingModule } from './prestamo-detail-routing.module';
import { PrestamoDetailPage } from './prestamo-detail.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestamoDetailPageRoutingModule
  ],
  declarations: [PrestamoDetailPage]
})
export class PrestamoDetailPageModule {}
