import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomFieldsComponent } from './custom-fields.component';


@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [CustomFieldsComponent],
  exports: [CustomFieldsComponent],
  entryComponents: [CustomFieldsComponent]
})
export class CustomFieldsModule {}
