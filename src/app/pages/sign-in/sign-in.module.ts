import { PageInfoTitleModule } from './../../component/page-info-title/page-info-title.component.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignInPage } from './sign-in.page';
import { SharedModule } from 'src/app/shared/module/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SignInPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    PageInfoTitleModule,
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
