import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CustomFieldsModule } from "../custom-fields/custom-fields-fields.component.module";
import { NoDataModule } from "../no-data/no-data.component.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { ProjectFilterComponent } from "./project-filter.component";

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		PanelHeaderModule,
		CustomFieldsModule,
		NoDataModule
	],

	declarations: [ProjectFilterComponent],
	exports: [ProjectFilterComponent],
	entryComponents: [ProjectFilterComponent],
})
export class ProjectFilterModule {}
