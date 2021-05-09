import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LeaderComponent } from './leader.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [LeaderComponent],
  exports: [LeaderComponent],
  entryComponents: [LeaderComponent]
})
export class LeaderModule {}
