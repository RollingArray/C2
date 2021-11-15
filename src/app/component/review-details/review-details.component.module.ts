/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Review details module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:25:05 
 * Last modified  : 2021-11-15 21:25:44
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReviewDetailsComponent } from './review-details.component';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { NoDataModule } from '../no-data/no-data.component.module';
import { WorkProgressModule } from '../work-progress/work-progress.component.module';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule, 
		PanelHeaderModule, 
		CustomFieldsModule, 
		NoDataModule,
		WorkProgressModule
	],
	declarations: [ReviewDetailsComponent],
	exports: [ReviewDetailsComponent],
	entryComponents: [ReviewDetailsComponent]
})
export class ReviewDetailsModule { }
