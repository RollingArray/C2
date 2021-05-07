import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AssigneeSelfReviewModule } from "src/app/component/assignee-self-review/assignee-self-review.component.module";
import { BreadcrumbModule } from "src/app/component/breadcrumb/breadcrumb.component.module";
import { CustomFieldsModule } from "src/app/component/custom-fields/custom-fields-fields.component.module";
import { MeasurementScaleModule } from "src/app/component/measurement-scale/measurement-scale.component.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { ReviewerReviewModule } from "src/app/component/reviewer-review/reviewer-review.component.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ProjectActivityReviewPage } from "./project-activity-review.page";


const routes: Routes = [
  {
    path: '',
    component: ProjectActivityReviewPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    AssigneeSelfReviewModule,
    MeasurementScaleModule,
    ReviewerReviewModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    BreadcrumbModule,
    CustomFieldsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectActivityReviewPage]
})
export class ProjectActivityReviewPageModule {}
