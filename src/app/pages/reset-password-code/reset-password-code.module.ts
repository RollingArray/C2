import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordCodePage } from './reset-password-code.page';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordCodePage
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
  declarations: [ResetPasswordCodePage]
})
export class ResetPasswordCodePageModule {}
