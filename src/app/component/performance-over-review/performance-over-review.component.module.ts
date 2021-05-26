import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { PanelHeaderModule } from "../panel-header/panel-header.component.module";
import { PerformanceOverReviewComponent } from "./performance-over-review.component";

@NgModule({
  imports: [CommonModule, IonicModule, PanelHeaderModule],

  declarations: [PerformanceOverReviewComponent],
  exports: [PerformanceOverReviewComponent],
  entryComponents: [PerformanceOverReviewComponent]
})
export class PerformanceOverReviewModule {}
