/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary No data component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-23 19:33:50 
 * Last modified  : 2021-11-23 20:21:10
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoDataComponent } from './no-data.component';

@NgModule({
	imports: [CommonModule, IonicModule],

	declarations: [NoDataComponent],
	exports: [NoDataComponent],
	entryComponents: [NoDataComponent]
})
export class NoDataModule { }
