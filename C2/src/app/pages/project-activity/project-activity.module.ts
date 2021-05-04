import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { PanelHeaderModule } from 'src/app/component/panel-header/panel-header.component.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ProjectActivityPage } from './project-activity.page';
import { CustomFieldsModule } from 'src/app/component/custom-fields/custom-fields-fields.component.module';
import { BreadcrumbModule } from 'src/app/component/breadcrumb/breadcrumb.component.module';
import { CreateEditProjectActivityModule } from 'src/app/component/create-edit-project-activity/create-edit-project-activity.component.module';
import { CreateEditProjectFilterModule } from 'src/app/component/create-edit-project-filter/create-edit-project-filter.component.module';
import { ProjectFilterModule } from 'src/app/component/project-filter/project-filter.component.module';
import { CreateEditProjectActivityCommentModule } from 'src/app/component/create-edit-project-activity-comment/create-edit-project-activity-comment.component.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectActivityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CreateEditProjectActivityModule,
    CreateEditProjectActivityCommentModule,
    CreateEditProjectFilterModule,
    ProjectFilterModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    BreadcrumbModule,
    CustomFieldsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectActivityPage]
})
export class ProjectActivityPageModule {}
