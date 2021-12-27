/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Intro module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2021-11-11 16:42:07
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { IntroComponent } from './intro.component';
@NgModule({
  imports: [CommonModule, SharedModule, IonicModule],

  declarations: [IntroComponent],
  exports: [IntroComponent],
  entryComponents: [IntroComponent]
})
export class IntroModule {}
