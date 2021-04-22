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
