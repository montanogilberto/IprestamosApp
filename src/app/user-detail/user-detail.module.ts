import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { UserDetailPage } from './user-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: UserDetailPage }])
  ],
  declarations: [UserDetailPage]
})
export class UserDetailPageModule {}
