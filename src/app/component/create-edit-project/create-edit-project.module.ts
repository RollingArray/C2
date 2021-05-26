import { PageInfoTitleModule } from './../page-info-title/page-info-title.component.module';
import { CreateEditProjectComponent } from "src/app/component/create-edit-project/create-edit-project.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
@NgModule({
  imports: [
    CommonModule, 
    SharedModule, 
    IonicModule, 
    PageInfoTitleModule
  ],

  declarations: [CreateEditProjectComponent],
  exports: [CreateEditProjectComponent],
  entryComponents: [CreateEditProjectComponent]
})
export class CreateEditProjectModule {}
