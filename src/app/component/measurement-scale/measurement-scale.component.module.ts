import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MeasurementScaleComponent } from './measurement-scale.component';
import { PanelInfoModule } from '../panel-info/panel-info.component.module';
import { CustomFieldsModule } from '../custom-fields/custom-fields-fields.component.module';
import { PanelHeaderModule } from '../panel-header/panel-header.component.module';

@NgModule({
  imports: [CommonModule, IonicModule, PanelInfoModule, CustomFieldsModule, PanelHeaderModule],

  declarations: [MeasurementScaleComponent],
  exports: [MeasurementScaleComponent],
  entryComponents: [MeasurementScaleComponent]
})
export class MeasurementScaleModule {}
