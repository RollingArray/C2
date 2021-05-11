import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent extends BaseViewComponent implements OnInit {

  @Input() user;
  @Input() icon;
  
  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}
