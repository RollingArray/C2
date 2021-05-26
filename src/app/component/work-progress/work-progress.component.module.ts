import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WorkProgressComponent } from './work-progress.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [WorkProgressComponent],
  exports: [WorkProgressComponent],
  entryComponents: [WorkProgressComponent]
})
export class WorkProgressModule {}
