import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { ActivityModel } from 'src/app/shared/model/activity.model';



@Component({
	selector: 'app-work-progress',
	templateUrl: './work-progress.component.html',
	styleUrls: ['./work-progress.component.scss'],
})
export class WorkProgressComponent extends BaseViewComponent implements OnInit {

	@Input() activity: ActivityModel;
	@Input() resultValue: number;

	/**
	   * Work progress of assignee self review component
	   */
	 private _workProgress: number;

	 /**
	  * Gets work progress
	  */
	 get workProgress() {
		 let top, bottom = 0;
		 
		 if (this.activity.characteristicsHigherBetter == 1) {
			 top = this.resultValue - this.activity.criteriaPoorValue;
			 bottom = this.activity.criteriaOutstandingValue - this.activity.criteriaPoorValue;
		 }
		 else {
			 top = this.activity.criteriaPoorValue - this.resultValue;
			 bottom = this.activity.criteriaPoorValue - this.activity.criteriaOutstandingValue;
		 }
 
		 return top / bottom;
	 }

	constructor(
		injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() { }

	

}
