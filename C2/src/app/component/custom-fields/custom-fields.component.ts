import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.css']
})

export class CustomFieldsComponent extends BaseViewComponent implements OnInit {
  @Input() description: string;
  @Input() sprintStartDate: string;
  @Input() sprintEndDate: string;
  @Input() weight: string;
  @Input() data: string;
  @Input() noData: boolean = false;

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }
}
