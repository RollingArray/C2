/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Account verification module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 14:25:52 
 * Last modified  : 2021-11-11 16:58:04
 */

import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountVerificationComponent } from './account-verification.component';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		PageInfoTitleModule
	],

	declarations: [AccountVerificationComponent],
	exports: [AccountVerificationComponent],
	entryComponents: [AccountVerificationComponent]
})
export class AccountVerificationModule { }
