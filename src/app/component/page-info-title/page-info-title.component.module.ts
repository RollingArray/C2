/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Page info title component module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:22:36 
 * Last modified  : 2021-12-26 11:23:12
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PageInfoTitleComponent } from './page-info-title.component';


@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [PageInfoTitleComponent],
  exports: [PageInfoTitleComponent],
  entryComponents: [PageInfoTitleComponent]
})
export class PageInfoTitleModule {}
