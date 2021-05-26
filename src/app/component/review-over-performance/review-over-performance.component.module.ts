import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { ReviewOverPerformanceComponent } from './review-over-performance.component';


@NgModule({
  imports: [CommonModule, IonicModule, PanelHeaderModule],

  declarations: [ReviewOverPerformanceComponent],
  exports: [ReviewOverPerformanceComponent],
  entryComponents: [ReviewOverPerformanceComponent]
})
export class ReviewOverPerformanceModule {}
