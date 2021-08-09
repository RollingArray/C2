/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Tool tip module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-08-06 18:56:45 
 * Last modified  : 2021-08-06 18:56:45 
 */



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolTipComponent } from './tool-tip.component';

@NgModule({
	imports: [
		CommonModule, 
		IonicModule
	],

	declarations: [ToolTipComponent],
	exports: [ToolTipComponent],
	entryComponents: [ToolTipComponent],
})
export class ToolTipModule { }
