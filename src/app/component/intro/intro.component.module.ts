import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/module/shared.module";
import { IonicModule } from "@ionic/angular";
import { IntroComponent } from './intro.component';
@NgModule({
  imports: [CommonModule, SharedModule, IonicModule],

  declarations: [IntroComponent],
  exports: [IntroComponent],
  entryComponents: [IntroComponent]
})
export class IntroModule {}
