/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Learn more module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-05 11:29:45 
 * Last modified  : 2021-11-05 11:31:03
 */

import { SharedModule } from 'src/app/shared/module/shared.module';
import { PageInfoTitleModule } from './../../component/page-info-title/page-info-title.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LearnMoreComponent } from './learn-more.component';

@NgModule({
	imports: [CommonModule, SharedModule, IonicModule, PageInfoTitleModule],
	declarations: [LearnMoreComponent],
	exports: [LearnMoreComponent],
	entryComponents: [LearnMoreComponent]
})
export class LearnMoreModule { }
