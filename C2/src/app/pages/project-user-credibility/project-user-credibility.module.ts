import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { BreadcrumbModule } from "src/app/component/breadcrumb/breadcrumb.component.module";
import { CustomFieldsModule } from "src/app/component/custom-fields/custom-fields-fields.component.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { PerformanceGaugeModule } from "src/app/component/performance-gauge/performance-gauge.component.module";
import { PerformanceOverReviewModule } from "src/app/component/performance-over-review/performance-over-review.component.module";
import { ReviewOverPerformanceModule } from "src/app/component/review-over-performance/review-over-performance.component.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { ProjectUserCredibilityPage } from "./project-user-credibility.page";

const routes: Routes = [
  {
    path: '',
    component: ProjectUserCredibilityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    CustomFieldsModule,
    BreadcrumbModule,
    RouterModule.forChild(routes),
    PerformanceGaugeModule,
    PerformanceOverReviewModule,
    ReviewOverPerformanceModule
  ],
  declarations: [ProjectUserCredibilityPage]
})
export class ProjectUserCredibilityPageModule {}
