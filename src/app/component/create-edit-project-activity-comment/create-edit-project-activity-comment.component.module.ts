import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/module/shared.module";
import { CustomFieldsModule } from "../custom-fields/custom-fields-fields.component.module";
import { PageInfoTitleModule } from "../page-info-title/page-info-title.component.module";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { CreateEditProjectActivityCommentComponent } from "./create-edit-project-activity-comment.component";

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule,
		PanelHeaderModule,
		CustomFieldsModule,
	],

	declarations: [CreateEditProjectActivityCommentComponent],
	exports: [CreateEditProjectActivityCommentComponent],
	entryComponents: [CreateEditProjectActivityCommentComponent],
})
export class CreateEditProjectActivityCommentModule {}
