import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.scss'],
})
export class PanelInfoComponent extends BaseViewComponent implements OnInit {

  @Input() title;

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}
