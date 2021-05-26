import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReviewerReviewComponent } from './reviewer-review.component';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { NoDataModule } from '../no-data/no-data.component.module';
import { CreateEditProjectActivityReviewModule } from '../create-edit-project-activity-review/create-edit-project-activity-review.component.module';
import { WorkProgressModule } from '../work-progress/work-progress.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		PanelHeaderModule, 
		CustomFieldsModule, 
		NoDataModule,
		WorkProgressModule,
		CreateEditProjectActivityReviewModule
	],
	declarations: [ReviewerReviewComponent],
	exports: [ReviewerReviewComponent],
	entryComponents: [ReviewerReviewComponent]
})
export class ReviewerReviewModule { }
