import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivityShortViewComponent } from './activity-short-view.component';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { WorkProgressModule } from '../work-progress/work-progress.component.module';

@NgModule({
  imports: [CommonModule, IonicModule, PanelHeaderModule, CustomFieldsModule, WorkProgressModule],

  declarations: [ActivityShortViewComponent],
  exports: [ActivityShortViewComponent],
  entryComponents: [ActivityShortViewComponent]
})
export class ActivityShortViewModule {}
