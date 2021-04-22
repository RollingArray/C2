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
import { ProjectSprintPage } from './project-sprint.page';
import { CreateEditProjectSprintModule } from 'src/app/component/create-edit-project-sprint/create-edit-project-sprint.component.module';
import { CustomFieldsModule } from 'src/app/component/custom-fields/custom-fields-fields.component.module';
import { BreadcrumbModule } from 'src/app/component/breadcrumb/breadcrumb.component.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectSprintPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CreateEditProjectSprintModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    BreadcrumbModule,
    CustomFieldsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectSprintPage]
})
export class ProjectSprintPageModule {}
