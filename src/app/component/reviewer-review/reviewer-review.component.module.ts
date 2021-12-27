/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Reviewer review module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:26:30 
 * Last modified  : 2021-11-15 21:27:10
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReviewerReviewComponent } from './reviewer-review.component';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { NoDataModule } from '../no-data/no-data.component.module';
import { CreateEditProjectActivityReviewModule } from '../create-edit-project-activity-review/create-edit-project-activity-review.component.module';
import { WorkProgressModule } from '../work-progress/work-progress.component.module';
import { ReviewDetailsModule } from '../review-details/review-details.component.module';
import { CreateEditProjectActivityReviewerModule } from '../create-edit-project-activity-reviewer/create-edit-project-activity-reviewer.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		PanelHeaderModule, 
		CustomFieldsModule, 
		NoDataModule,
		WorkProgressModule,
		ReviewDetailsModule,
		CreateEditProjectActivityReviewModule,
		CreateEditProjectActivityReviewerModule,
	],
	declarations: [ReviewerReviewComponent],
	exports: [ReviewerReviewComponent],
	entryComponents: [ReviewerReviewComponent]
})
export class ReviewerReviewModule { }
