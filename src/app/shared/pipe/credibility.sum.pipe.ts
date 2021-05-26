import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sum"
})
export class CredibilitySumPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    return items.reduce((a, b) => a + b[attr], 0);
  }
}

@NgModule({
  declarations: [CredibilitySumPipe],
  exports: [CredibilitySumPipe]
})
export class CredibilitySumPipeModule {}
