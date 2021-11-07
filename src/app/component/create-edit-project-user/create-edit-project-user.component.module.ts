import { PanelHeaderModule } from "./../panel-header/panel-header.component.module";
import { PageInfoTitleModule } from "./../page-info-title/page-info-title.component.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { NoDataModule } from "../no-data/no-data.component.module";
import { CreateEditProjectUserComponent } from "./create-edit-project-user.component";
import { CustomFieldsModule } from "../custom-fields/custom-fields-fields.component.module";
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		NoDataModule,
		PageInfoTitleModule,
		PanelHeaderModule,
		CustomFieldsModule
	],

	declarations: [CreateEditProjectUserComponent],
	exports: [CreateEditProjectUserComponent],
	entryComponents: [CreateEditProjectUserComponent],
})
export class CreateEditProjectUserModule {}
