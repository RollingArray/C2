import { PageInfoTitleModule } from './../page-info-title/page-info-title.component.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { PpComponent } from './pp.component';
@NgModule({
  imports: [CommonModule, SharedModule, IonicModule, PageInfoTitleModule],

  declarations: [PpComponent],
  exports: [PpComponent],
  entryComponents: [PpComponent]
})
export class PpModule {}
