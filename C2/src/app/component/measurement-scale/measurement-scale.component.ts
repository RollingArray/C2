import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { ActivityModel } from 'src/app/shared/model/activity.model';
import { ActivityMeasurementTypeEnum } from 'src/app/shared/enum/activity-measurement-type.enum';

@Component({
	selector: 'app-measurement-scale',
	templateUrl: './measurement-scale.component.html',
	styleUrls: ['./measurement-scale.component.scss'],
})
export class MeasurementScaleComponent extends BaseViewComponent implements OnInit {

	/**
	 * Input  of measurement scale component
	 */
	@Input() activity: ActivityModel;

	/**
	   * Activity measurement type enum of project activity page
	   */
	activityMeasurementTypeEnum = ActivityMeasurementTypeEnum;

	/**
	 * Creates an instance of measurement scale component.
	 * @param injector 
	 */
	constructor(
		injector: Injector,
	) {
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit() { }

}
