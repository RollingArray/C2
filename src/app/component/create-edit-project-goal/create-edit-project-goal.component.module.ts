import { PanelHeaderModule } from "./../panel-header/panel-header.component.module";
import { PageInfoTitleModule } from "./../page-info-title/page-info-title.component.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { NoDataModule } from "../no-data/no-data.component.module";
import { CreateEditProjectGoalComponent } from './create-edit-project-goal.component';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		PanelHeaderModule,
	],

	declarations: [CreateEditProjectGoalComponent],
	exports: [CreateEditProjectGoalComponent],
	entryComponents: [CreateEditProjectGoalComponent],
})
export class CreateEditProjectGoalModule {}
