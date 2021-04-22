import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PanelHeaderComponent } from './panel-header.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [PanelHeaderComponent],
  exports: [PanelHeaderComponent],
  entryComponents: [PanelHeaderComponent]
})
export class PanelHeaderModule {}
