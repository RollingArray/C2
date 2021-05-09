import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AssigneeSelfReviewModule } from 'src/app/component/assignee-self-review/assignee-self-review.component.module';
import { BreadcrumbModule } from 'src/app/component/breadcrumb/breadcrumb.component.module';
import { CreateEditProjectActivityModule } from 'src/app/component/create-edit-project-activity/create-edit-project-activity.component.module';
import { CreateEditProjectFilterModule } from 'src/app/component/create-edit-project-filter/create-edit-project-filter.component.module';
import { CustomFieldsModule } from 'src/app/component/custom-fields/custom-fields-fields.component.module';
import { MeasurementScaleModule } from 'src/app/component/measurement-scale/measurement-scale.component.module';
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { PanelHeaderModule } from 'src/app/component/panel-header/panel-header.component.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { ProjectFilterModule } from 'src/app/component/project-filter/project-filter.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ProjectActivityPage } from './project-activity.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectActivityPage
  },
  {
		path: ":activityId/review",
		loadChildren: () => import('../project-activity-review/project-activity-review.module').then( m => m.ProjectActivityReviewPageModule),
	}
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CreateEditProjectFilterModule,
    CreateEditProjectActivityModule,
    AssigneeSelfReviewModule,
    MeasurementScaleModule,
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
