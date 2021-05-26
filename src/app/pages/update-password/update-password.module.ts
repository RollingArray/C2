import { PageInfoTitleModule } from './../../component/page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePasswordPage } from './update-password.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PageInfoTitleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatePasswordPage]
})
export class UpdatePasswordPageModule {}
