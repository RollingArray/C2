import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss'],
})
export class LeaderComponent extends BaseViewComponent implements OnInit {

  @Input() leader;
  @Input() showScore: boolean = false;
  @Input() showReviewsCount: boolean = false;
  
  @Input() reviews: number;
  

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}
