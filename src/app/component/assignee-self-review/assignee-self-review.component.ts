/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Assignee self review component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:21:25 
 * Last modified  : 2021-11-15 21:21:44
 */

import { Component, OnInit, Input, Injector, EventEmitter, Output } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ActivityMeasurementTypeEnum } from "src/app/shared/enum/activity-measurement-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ActivityModel } from "src/app/shared/model/activity.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { BaseViewComponent } from "../base/base-view.component";
import { CreateEditProjectActivityCommentComponent } from "../create-edit-project-activity-comment/create-edit-project-activity-comment.component";

@Component({
	selector: 'app-assignee-self-review',
	templateUrl: './assignee-self-review.component.html',
	styleUrls: ['./assignee-self-review.component.scss'],
})
export class AssigneeSelfReviewComponent extends BaseViewComponent implements OnInit {

	/**
	 * Input  of assignee self review component
	 */
	@Input() activity: ActivityModel;

	/**
	 * Input  of assignee self review component
	 */
	@Input() allowAction: boolean;

	/**
	 * Output  of assignee self review component
	 */
	@Output() event = new EventEmitter();

	/**
	 * Modal data of project activity page
	 */
	private _modalData: ModalData;

	/**
	 * Logged in user of project activity page
	 */
	private _loggedInUser: string;

	/**
	 * Project id of project activity page
	 */
	private _projectId: string;

	/**
	 * Creates an instance of assignee self review component.
	 * @param injector 
	 * @param localStorageService 
	 * @param alertService 
	 */
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private alertService: AlertService
	) {
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit() {
		this.activeUserId();
		this._projectId = this.activatedRoute.snapshot.paramMap.get("projectId");
	}



	/**
	* on destroy
	*/
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Actives user id
	 * @returns  
	 */
	async activeUserId() {
		this.localStorageService
			.getActiveUserId()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				this._loggedInUser = data;
			});
	}

	/**
	 * Shows result
	 * @param selectedReviewer 
	 */
	showResult(selectedActivity: ActivityModel) {
		if (selectedActivity.activityMeasurementType == ActivityMeasurementTypeEnum.Bool) {
			if (selectedActivity.claimedResultValue == 100) {
				return this.stringKey.ACHIEVED;
			}
			else {
				return this.stringKey.ACHIEVED;
			}
		}
		else {
			return `${selectedActivity.claimedResultValue.toString()} ${selectedActivity.activityResultType}`;
		}
	}

	/**
	 * Opens activity comment options
	 * @param selectedActivity 
	 */
	async openActivityCommentOptions(selectedActivity: ActivityModel) {
		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.EDIT + ' ' + this.stringKey.DETAILS,
					icon: this.stringKey.ICON_EDIT,
					handler: () => {
						if(selectedActivity.commentId){
							this.editActivityComment(selectedActivity, `${OperationsEnum.Edit}`);
						}
						else{
							this.addActivityComment(selectedActivity);
						}
						
					}
				},
				{
					text: this.stringKey.CANCEL,
					icon: this.stringKey.ICON_CANCEL,
					handler: () => {
						//
					}
				}
			]
		});
		await actionSheet.present();
	}

	/**
	 * Activities comment
	 * @param activityModel 
	 * @param operation 
	 * @returns  
	 */
	async addActivityComment(activityModel: ActivityModel) {
		if (this._loggedInUser != activityModel.assigneeUserId) {
			this.alertService.presentBasicAlert(this.stringKey.ALERT_NO_SAME_USER)
		}
		else {
			//activityModel.operationType = operation;
			const passedModel: ActivityModel = {
				userId: this._loggedInUser,
				projectId: this._projectId,
				assigneeUserId: activityModel.assigneeUserId,
				activityId: activityModel.activityId,
				commentDescription: activityModel.commentDescription,
				claimedResultValue: activityModel.claimedResultValue,
				activityMeasurementType: activityModel.activityMeasurementType,
				activityResultType: activityModel.activityResultType,
				criteriaPoorValue: activityModel.criteriaPoorValue,
				criteriaOutstandingValue: activityModel.criteriaOutstandingValue,
				characteristicsHigherBetter: activityModel.characteristicsHigherBetter,
				operationType: `${OperationsEnum.Create}`
			}

			const modal = await this.modalController.create({
				component: CreateEditProjectActivityCommentComponent,
				componentProps: {
					data: passedModel
				}
			});

			modal.onDidDismiss().then(data => {

				this._modalData = data.data;
				if (this._modalData.cancelled) {
					//do not refresh the page
				} else {
					
					//emit event to reload load data from network
					this.event.emit();
				}
			});

			return await modal.present();
		}
	}

	/**
	 * Edits activity comment
	 * @param activityModel 
	 * @param operation 
	 * @returns  
	 */
	async editActivityComment(activityModel: ActivityModel, operation: string) {
		if (this._loggedInUser != activityModel.assigneeUserId) {
			this.alertService.presentBasicAlert(this.stringKey.ALERT_NO_SAME_USER)
		}
		else {
			const passedModel: ActivityModel = {
				userId: this._loggedInUser,
				projectId: this._projectId,
				assigneeUserId: activityModel.assigneeUserId,
				activityId: activityModel.activityId,
				commentId: activityModel.commentId,
				commentDescription: activityModel.commentDescription,
				claimedResultValue: activityModel.claimedResultValue,
				activityMeasurementType: activityModel.activityMeasurementType,
				activityResultType: activityModel.activityResultType,
				criteriaPoorValue: activityModel.criteriaPoorValue,
				criteriaOutstandingValue: activityModel.criteriaOutstandingValue,
				characteristicsHigherBetter: activityModel.characteristicsHigherBetter,
				operationType: operation
			}

			const modal = await this.modalController.create({
				component: CreateEditProjectActivityCommentComponent,
				componentProps: {
					data: passedModel
				}
			});

			modal.onDidDismiss().then(data => {

				this._modalData = data.data;
				if (this._modalData.cancelled) {
					//do not refresh the page
				} else {
					
					//emit event to reload load data from network
					this.event.emit();
				}
			});

			return await modal.present();
		}
	}

	/**
	 * 
	 * @param selectedReviewer 
	 * @returns 
	 */
	 getUser(selectedActivity: ActivityModel)
	 {
		 return {
			 userFirstName: selectedActivity.assigneeUserFirstName,
			 userLastName: selectedActivity.assigneeUserLastName,
		 }
	 }

}
