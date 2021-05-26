import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
