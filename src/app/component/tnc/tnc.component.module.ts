import { PageInfoTitleModule } from './../page-info-title/page-info-title.component.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { TncComponent } from './tnc.component';

@NgModule({
  imports: [CommonModule, SharedModule, IonicModule, PageInfoTitleModule],

  declarations: [TncComponent],
  exports: [TncComponent],
  entryComponents: [TncComponent]
})
export class TncModule {}
