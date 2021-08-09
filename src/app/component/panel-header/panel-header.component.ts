import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.scss'],
})
export class PanelHeaderComponent extends BaseViewComponent implements OnInit {

  @Input() user;
  @Input() panelTitle;
  @Input() panelIcon;
  @Input() panelColor;
  @Input() eventIcon;
  @Input() isEventRequired : boolean;
  @Input() isNoIcon : boolean;
  @Input() isExpand: boolean = false;;
  @Input() isLargeIcon : boolean = false;;
  @Input() panelSubHead;
  @Output() event = new EventEmitter();

  onPanelTap() {
    this.event.emit();
  }

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}
