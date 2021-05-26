import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { BreadcrumbModule } from "src/app/component/breadcrumb/breadcrumb.component.module";
import { CreateEditProjectUserModule } from "src/app/component/create-edit-project-user/create-edit-project-user.component.module";
import { LeaderModule } from "src/app/component/leader/leader.component.module";
import { NoDataModule } from "src/app/component/no-data/no-data.component.module";
import { PageInfoTitleModule } from "src/app/component/page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "src/app/component/panel-header/panel-header.component.module";
import { PanelInfoModule } from "src/app/component/panel-info/panel-info.component.module";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CredibilityBoardPage } from "./credibility-board.page";


const routes: Routes = [
  {
    path: '',
    component: CredibilityBoardPage
  },
  {
		path: ":assigneeId/credibility",
		loadChildren: () => import('../project-user-credibility/project-user-credibility.module').then( m => m.ProjectUserCredibilityPageModule),
	}
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CreateEditProjectUserModule,
    LeaderModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    BreadcrumbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CredibilityBoardPage]
})
export class CredibilityBoardPageModule {}
