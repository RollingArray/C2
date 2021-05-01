import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { NoDataModule } from "../no-data/no-data.component.module";
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { CreateEditProjectActivityComponent } from './create-edit-project-activity.component';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		PanelHeaderModule,
		CustomFieldsModule,
	],

	declarations: [CreateEditProjectActivityComponent],
	exports: [CreateEditProjectActivityComponent],
	entryComponents: [CreateEditProjectActivityComponent],
})
export class CreateEditProjectActivityModule {}
