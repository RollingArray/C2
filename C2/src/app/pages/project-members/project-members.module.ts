import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProjectMembersPage } from './project-members.page';
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { PanelHeaderModule } from 'src/app/component/panel-header/panel-header.component.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CreateEditProjectUserModule } from 'src/app/component/create-edit-project-user/create-edit-project-user.component.module';
import { BreadcrumbModule } from 'src/app/component/breadcrumb/breadcrumb.component.module';



const routes: Routes = [
  {
    path: '',
    component: ProjectMembersPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CreateEditProjectUserModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    BreadcrumbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectMembersPage]
})
export class ProjectMembersPageModule {}
