/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Custom fields module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:23:05 
 * Last modified  : 2021-11-15 21:24:39
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomFieldsComponent } from './custom-fields.component';

@NgModule({
	imports: [CommonModule, IonicModule],

	declarations: [CustomFieldsComponent],
	exports: [CustomFieldsComponent],
	entryComponents: [CustomFieldsComponent]
})
export class CustomFieldsModule { }
