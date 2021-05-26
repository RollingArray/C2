import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CustomFieldsModule } from "../custom-fields/custom-fields-fields.component.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { CreateEditProjectFilterComponent } from "./create-edit-project-filter.component";

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		PanelHeaderModule,
		CustomFieldsModule,
	],

	declarations: [CreateEditProjectFilterComponent],
	exports: [CreateEditProjectFilterComponent],
	entryComponents: [CreateEditProjectFilterComponent],
})
export class CreateEditProjectFilterModule {}
