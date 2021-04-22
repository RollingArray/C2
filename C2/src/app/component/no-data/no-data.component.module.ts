import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoDataComponent } from './no-data.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [NoDataComponent],
  exports: [NoDataComponent],
  entryComponents: [NoDataComponent]
})
export class NoDataModule {}
