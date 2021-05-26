import { SharedModule } from 'src/app/shared/module/shared.module';
import { ScrollTrackerDirective } from 'src/app/shared/directive/parallax/scroll-tracker.directive';
import { PageInfoTitleModule } from './../../component/page-info-title/page-info-title.component.module';
import { PpModule } from './../../component/pp/pp.component.module';
import { TncModule } from './../../component/tnc/tnc.component.module';
import { FaqModule } from './../../component/faq/faq.component.module';
import { FaqModel } from './../../shared/model/faq.model';
import { FaqComponent } from './../../component/faq/faq.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LearnMorePage } from './learn-more.page';

const routes: Routes = [
  {
    path: '',
    component: LearnMorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FaqModule,
    TncModule,
    PpModule,
    PageInfoTitleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LearnMorePage]
})
export class LearnMorePageModule {}
