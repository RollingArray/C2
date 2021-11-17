/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Create edit project filter component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-17 18:16:16 
 * Last modified  : 2021-11-17 18:20:05
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CustomFieldsModule } from "../custom-fields/custom-fields-fields.component.module";
import { NoDataModule } from "../no-data/no-data.component.module";
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
		NoDataModule
	],

	declarations: [CreateEditProjectFilterComponent],
	exports: [CreateEditProjectFilterComponent],
	entryComponents: [CreateEditProjectFilterComponent],
})
export class CreateEditProjectFilterModule {}
