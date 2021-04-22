import { PanelHeaderModule } from "./../panel-header/panel-header.component.module";
import { PageInfoTitleModule } from "./../page-info-title/page-info-title.component.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { NoDataModule } from "../no-data/no-data.component.module";
import { CreateEditProjectSprintComponent } from './create-edit-project-sprint.component';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		PanelHeaderModule,
	],

	declarations: [CreateEditProjectSprintComponent],
	exports: [CreateEditProjectSprintComponent],
	entryComponents: [CreateEditProjectSprintComponent],
})
export class CreateEditProjectSprintModule {}
