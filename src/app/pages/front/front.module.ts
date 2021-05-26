import { IntroModule } from './../../component/intro/intro.component.module';
import { IntroComponent } from './../../component/intro/intro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrontPage } from './front.page';

const routes: Routes = [
  {
    path: '',
    component: FrontPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrontPage]
})
export class FrontPageModule {}
