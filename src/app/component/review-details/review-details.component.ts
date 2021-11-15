/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Review details component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:25:05 
 * Last modified  : 2021-11-15 21:25:20
 */


import { Component, OnInit, Input, Injector } from "@angular/core";
import { ActivityMeasurementTypeEnum } from "src/app/shared/enum/activity-measurement-type.enum";
import { ReviewLockTypeEnum } from "src/app/shared/enum/review-lock-type.enum";
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { BaseViewComponent } from "../base/base-view.component";

@Component({
	selector: 'app-review-details',
	templateUrl: './review-details.component.html',
	styleUrls: ['./review-details.component.scss'],
})
export class ReviewDetailsComponent extends BaseViewComponent implements OnInit {

	/**
	 * Input  of assignee self review component
	 */
	@Input() reviewer: ActivityReviewerModel;
	
	/**
	 * Review lock type enum of reviewer review component
	 */
	readonly reviewLockTypeEnum = ReviewLockTypeEnum;
	
	/**
	 * Creates an instance of review details component.
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
	ngOnInit() {
		//
	}

	/**
	* on destroy
	*/
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Shows result
	 * @param selectedReviewer 
	 */
	 showResult() {
		if (this.reviewer.activityMeasurementType == ActivityMeasurementTypeEnum.Bool) {
			if (this.reviewer.achievedResultValue == 100) {
				return this.stringKey.ACHIEVED;
			}
			else {
				return this.stringKey.ACHIEVED;
			}
		}
		else {
			return `${this.reviewer.achievedResultValue.toString()} ${this.reviewer.activityResultType}`;
		}
	}
}
