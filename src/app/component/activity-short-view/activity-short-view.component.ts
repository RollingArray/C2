import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { ActivityModel } from 'src/app/shared/model/activity.model';
import { ActivityMeasurementTypeEnum } from 'src/app/shared/enum/activity-measurement-type.enum';



@Component({
	selector: 'app-activity-short-view',
	templateUrl: './activity-short-view.component.html',
	styleUrls: ['./activity-short-view.component.scss'],
})
export class ActivityShortViewComponent extends BaseViewComponent implements OnInit {

	@Input() activity: ActivityModel;
	
	constructor(
		injector: Injector,
	) {
		super(injector);
		console.log(this.activity);
	}

	ngOnInit() { }

	/**
	 * Shows result
	 * @param selectedReviewer 
	 */
	get result() {
		if (this.activity.activityMeasurementType == ActivityMeasurementTypeEnum.Bool) {
			if (this.activity.claimedResultValue == 100) {
				return this.stringKey.ACHIEVED;
			}
			else {
				return this.stringKey.ACHIEVED;
			}
		}
		else {
			return `${this.activity.claimedResultValue.toString()} ${this.activity.activityResultType}`;
		}
	}
	

}
