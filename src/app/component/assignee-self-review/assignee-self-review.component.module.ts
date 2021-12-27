/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Assignee self review module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:21:25 
 * Last modified  : 2021-11-15 21:22:17
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AssigneeSelfReviewComponent } from './assignee-self-review.component';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { NoDataModule } from '../no-data/no-data.component.module';
import { CreateEditProjectActivityCommentModule } from '../create-edit-project-activity-comment/create-edit-project-activity-comment.component.module';
import { WorkProgressModule } from '../work-progress/work-progress.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		PanelHeaderModule, 
		CustomFieldsModule, 
		NoDataModule,
		WorkProgressModule,
		CreateEditProjectActivityCommentModule
	],
	declarations: [AssigneeSelfReviewComponent],
	exports: [AssigneeSelfReviewComponent],
	entryComponents: [AssigneeSelfReviewComponent]
})
export class AssigneeSelfReviewModule { }
