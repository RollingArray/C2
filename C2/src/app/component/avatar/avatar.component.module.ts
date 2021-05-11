import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './avatar.component';


@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [AvatarComponent],
  exports: [AvatarComponent],
  entryComponents: [AvatarComponent]
})
export class AvatarModule {}
