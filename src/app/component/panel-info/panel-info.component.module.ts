import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PanelInfoComponent } from './panel-info.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [PanelInfoComponent],
  exports: [PanelInfoComponent],
  entryComponents: [PanelInfoComponent]
})
export class PanelInfoModule {}
