/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Account verification module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 14:25:52 
 * Last modified  : 2021-10-31 16:09:00
 */

import { SharedModule } from 'src/app/shared/module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountVerificationPage } from './account-verification.page';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';

const routes: Routes = [
	{
		path: '',
		component: AccountVerificationPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SharedModule,
		PageInfoTitleModule,
		RouterModule.forChild(routes)
	],
	declarations: [AccountVerificationPage]
})
export class AccountVerificationPageModule { }
