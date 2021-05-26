import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LeaderComponent } from './leader.component';
import { AvatarModule } from '../avatar/avatar.component.module';

@NgModule({
  imports: [CommonModule, IonicModule, AvatarModule],

  declarations: [LeaderComponent],
  exports: [LeaderComponent],
  entryComponents: [LeaderComponent]
})
export class LeaderModule {}
