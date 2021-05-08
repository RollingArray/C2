import { Component, OnInit, Input, Injector } from "@angular/core";
import { BaseViewComponent } from "../base/base-view.component";

@Component({
  selector: 'app-performance-gauge',
  templateUrl: './performance-gauge.component.html',
  styleUrls: ['./performance-gauge.component.scss'],
})
export class PerformanceGaugeComponent extends BaseViewComponent implements OnInit {

  @Input() panelTitle;
  @Input() gaugeMax;
  @Input() gaugeValue;
  percentageValue: (value: number) => string;
  constructor(
    injector: Injector,
  ) { 
    super(injector);

    this.percentageValue = function (value: number): string {
			return `${value}`;
    };
    
  }

  ngOnInit() {}

}
