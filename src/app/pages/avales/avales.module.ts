import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvalesPageRoutingModule } from './avales-routing.module';

import { AvalesPage } from './avales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvalesPageRoutingModule
  ],
  declarations: [AvalesPage]
})
export class AvalesPageModule {}
