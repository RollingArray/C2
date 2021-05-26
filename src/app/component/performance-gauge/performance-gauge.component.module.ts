import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { GaugeModule } from "angular-gauge";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PerformanceGaugeComponent } from "./performance-gauge.component";

@NgModule({
  imports: [CommonModule, IonicModule, PanelHeaderModule, GaugeModule.forRoot()],

  declarations: [PerformanceGaugeComponent],
  exports: [PerformanceGaugeComponent],
  entryComponents: [PerformanceGaugeComponent]
})
export class PerformanceGaugeModule {}
