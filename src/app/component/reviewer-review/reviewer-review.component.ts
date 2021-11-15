/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Reviewer review component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:26:30 
 * Last modified  : 2021-11-15 21:26:45
 */

import { Component, OnInit, Input, Injector, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { takeUntil } from "rxjs/operators";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ReviewLockTypeEnum } from "src/app/shared/enum/review-lock-type.enum";
import { UserTypeEnum } from "src/app/shared/enum/user-type.enum";
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { ActivityModel } from "src/app/shared/model/activity.model";
import { BaseModel } from "src/app/shared/model/base.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { ProjectModel } from "src/app/shared/model/project.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { ProjectActivityReviewerService } from "src/app/shared/service/project-activity-reviewer.service";
import { BaseViewComponent } from "../base/base-view.component";
import { CreateEditProjectActivityReviewComponent } from "../create-edit-project-activity-review/create-edit-project-activity-review.component";
import { CreateEditProjectActivityReviewerComponent } from "../create-edit-project-activity-reviewer/create-edit-project-activity-reviewer.component";

@Component({
	selector: 'app-reviewer-review',
	templateUrl: './reviewer-review.component.html',
	styleUrls: ['./reviewer-review.component.scss'],
})
export class ReviewerReviewComponent extends BaseViewComponent implements OnInit {

	/**
	 * Input  of assignee self review component
	 */
	@Input() activityReviews: ActivityReviewerModel[]

	/**
	 * Input  of reviewer review component
	 */
	@Input() userType: ProjectModel;

	/**
	 * Determines whether reviews data has
	 */
	 @Input() hasData: boolean = false;

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
	 * Activity id of project activity review page
	 */
	 private _activityId: string;

	/**
	 * Gets whether is administrator
	 */
	get isAdministrator()
	{
		return this.userType.userTypeId === UserTypeEnum.Administrator ? true : false;
	}

	/**
	 * Gets whether is reviewer
	 */
	get isReviewer()
	{
		return this.userType.userTypeId === UserTypeEnum.Reviewer	? true : false;
	}

	/**
	 * Gets whether is assignee
	 */
	get isAssignee()
	{
		return this.userType.userTypeId === UserTypeEnum.Assignee ? true : false;
	}

	/**
	 * Gets no data text
	 */
	get noDataText()
	{
		return this.isAdministrator ? this.stringKey.NO_DATA_PROJECT_REVIEWER : this.stringKey.NO_DATA_PROJECT_REVIEWER_OTHER; 
	}

	/**
	 * Review lock type enum of reviewer review component
	 */
	readonly reviewLockTypeEnum = ReviewLockTypeEnum;

	/**
	 * Creates an instance of assignee self review component.
	 * @param injector 
	 * @param localStorageService 
	 * @param alertService 
	 */
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private loadingService: LoadingService,
		private projectActivityReviewerService: ProjectActivityReviewerService,
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
		this._activityId = this.activatedRoute.snapshot.paramMap.get("activityId");
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
	 * Opens reviewer options
	 * @param selectedActivity 
	 */
	async openReviewerOptions(selectedReviewer: ActivityReviewerModel)
	{
		let actionSheet: HTMLIonActionSheetElement;

		if (this.isAdministrator)
		{
			actionSheet = await this.actionSheetController.create({
				header: this.stringKey.CHOOSE_YOUR_ACTION,
				buttons: [
					{
						text: this.stringKey.DELETE + ' ' + this.stringKey.REVIEWER,
						icon: this.stringKey.ICON_DELETE,
						handler: () => {
							this.delete(selectedReviewer);
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
		}
		else if (this.isReviewer)
		{
			actionSheet = await this.actionSheetController.create({
				header: this.stringKey.CHOOSE_YOUR_ACTION,
				buttons: [
					{
						text: this.stringKey.UPDATE + ' ' + this.stringKey.REVIEWER_COMMENT,
						icon: this.stringKey.ICON_EDIT,
						handler: () => {
							this.addEditReview(selectedReviewer);
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
		}
		
		await actionSheet.present();	
	}

	/**
	 * Adds edit review
	 * @param selectedReviewer 
	 */
	async addEditReview(selectedReviewer: ActivityReviewerModel)
	{
		if(this._loggedInUser != selectedReviewer.reviewerUserId){
			this.alertService.presentBasicAlert(this.stringKey.ALERT_NO_SAME_REVIEWER)
		}
		else if (selectedReviewer.reviewLock === this.reviewLockTypeEnum.Unlock)
		{
			this.alertService.presentBasicAlert(this.stringKey.ALERT_NO_UNLOCK_ACTIVITY)
		}
		else{
			const passedModel: ActivityReviewerModel = {
				userId: this._loggedInUser,
				projectId: this._projectId,
				activityId: this._activityId,
				activityReviewId: selectedReviewer.activityReviewId,
				achievedResultValue : selectedReviewer.achievedResultValue,
				reviewerUserId : selectedReviewer.reviewerUserId,
				reviewerComment : selectedReviewer.reviewerComment,
				activityMeasurementType: selectedReviewer.activityMeasurementType,
				activityResultType: selectedReviewer.activityResultType,
				criteriaPoorValue: selectedReviewer.criteriaPoorValue,
				criteriaOutstandingValue: selectedReviewer.criteriaOutstandingValue,
				characteristicsHigherBetter: selectedReviewer.characteristicsHigherBetter,
				operationType: `${OperationsEnum.Edit}`
			}
			const modal = await this.modalController.create({
				component: CreateEditProjectActivityReviewComponent,
				componentProps: {
					data: passedModel
				}
			});
	
			modal.onDidDismiss().then(data => {
	
				this._modalData = data.data;
				if (this._modalData.cancelled) {
					//do not refresh the page
				} else {
					//load data from network
					this.event.emit();
				}
			});
	
			return await modal.present();
		}
	}
	
	/**
	 * Deletes project activity review page
	 * @param selectedReviewer 
	 */
	async delete(selectedReviewer: ActivityReviewerModel)
	{
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.ALERT_DELETE,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {
						await this.deleteReviewer(selectedReviewer);
					}
				}
			]
		});

		await alertController.present();
	}

	/**
	 * Deletes reviewer
	 * @param selectedReviewer 
	 */
	async deleteReviewer(selectedReviewer: ActivityReviewerModel) {
		
		// start loaded
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_6}`);

		// build model
		const passedData: ActivityReviewerModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			activityId: this._activityId,
			activityReviewId: selectedReviewer.activityReviewId,
			reviewerUserId:selectedReviewer.reviewerUserId,
			operationType: OperationsEnum.Delete,
		};

		// call api
		this.projectActivityReviewerService
			.projectActivityReviewerCrud(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {

					// end loaded
					await this.loadingService.dismiss();

					// build
					if (baseModel.success) {

						// show toast
						await this.presentToast(baseModel.message);

						//load data
						this.event.emit();
					}
				},
				async (error) => {
					await this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Locks review
	 * @param selectedReviewer 
	 */
	async lockReview(selectedReviewer: ActivityReviewerModel)
	{
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.ALERT_LOCK,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {
						await this.lockUnlockReview(selectedReviewer, ReviewLockTypeEnum.Lock);
					}
				}
			]
		});

		await alertController.present();
	}

	/**
	 * lock review
	 * @param selectedReviewer 
	 */
	async unLockReview(selectedReviewer: ActivityReviewerModel)
	{
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.ALERT_UNLOCK,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {
						await this.lockUnlockReview(selectedReviewer, ReviewLockTypeEnum.Unlock);
					}
				}
			]
		});

		await alertController.present();
	}

	/**
	 * Deletes reviewer
	 * @param selectedReviewer 
	 */
	 async lockUnlockReview(selectedReviewer: ActivityReviewerModel, reviewLockTypeStatus: ReviewLockTypeEnum) {
		
		// start loaded
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build model
		const passedData: ActivityReviewerModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			activityReviewId: selectedReviewer.activityReviewId,
		};

		 console.log(passedData);
		 let projectActivityReviewerService : Observable<BaseModel>;

		 if (reviewLockTypeStatus === ReviewLockTypeEnum.Lock)
		 {
			projectActivityReviewerService = this.projectActivityReviewerService.projectActivityReviewLock(passedData);
		 }
		 else
		 {
			projectActivityReviewerService = this.projectActivityReviewerService.projectActivityReviewUnlock(passedData);
		 }
		 
		// call api
		projectActivityReviewerService
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {

					// end loaded
					await this.loadingService.dismiss();

					// build
					if (baseModel.success) {

						// show toast
						await this.presentToast(baseModel.message);

						//load data
						this.event.emit();
					}
				},
				async (error) => {
					await this.loadingService.dismiss();
				}
			);
	 }
	
	/**
	 * Adds reviewer
	 * @returns  
	 */
	async addReviewer()
	{
		const passedModel: ActivityModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			activityId: this._activityId,
			operationType: `${OperationsEnum.Create}`
		}
		const modal = await this.modalController.create({
			component: CreateEditProjectActivityReviewerComponent,
			componentProps: {
				data: passedModel
			}
		});

		modal.onDidDismiss().then(data => {

			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				//load data
				this.event.emit();
			}
		});

		return await modal.present();
	}

	/**
	 * 
	 * @param selectedReviewer 
	 * @returns 
	 */
	getUser(selectedReviewer: ActivityReviewerModel)
	{
		return {
			userFirstName: selectedReviewer.reviewerUserFirstName,
			userLastName: selectedReviewer.reviewerUserLastName,
		}
	}
}
