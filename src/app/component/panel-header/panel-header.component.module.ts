import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PanelHeaderComponent } from './panel-header.component';
import { AvatarModule } from '../avatar/avatar.component.module';

@NgModule({
  imports: [CommonModule, IonicModule, AvatarModule],

  declarations: [PanelHeaderComponent],
  exports: [PanelHeaderComponent],
  entryComponents: [PanelHeaderComponent]
})
export class PanelHeaderModule {}
