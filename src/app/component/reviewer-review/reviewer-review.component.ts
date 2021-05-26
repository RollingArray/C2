import { Component, OnInit, Input, Injector, EventEmitter, Output } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ActivityMeasurementTypeEnum } from "src/app/shared/enum/activity-measurement-type.enum";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { ActivityModel } from "src/app/shared/model/activity.model";
import { BaseModel } from "src/app/shared/model/base.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { ProjectActivityReviewerService } from "src/app/shared/service/project-activity-reviewer.service";
import { BaseViewComponent } from "../base/base-view.component";
import { CreateEditProjectActivityCommentComponent } from "../create-edit-project-activity-comment/create-edit-project-activity-comment.component";
import { CreateEditProjectActivityReviewComponent } from "../create-edit-project-activity-review/create-edit-project-activity-review.component";

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
	 * Shows result
	 * @param selectedReviewer 
	 */
	showResult(selectedActivityReviewer: ActivityReviewerModel) {
		if (selectedActivityReviewer.activityMeasurementType == ActivityMeasurementTypeEnum.Bool) {
			if (selectedActivityReviewer.achievedResultValue == 100) {
				return this.stringKey.ACHIEVED;
			}
			else {
				return this.stringKey.ACHIEVED;
			}
		}
		else {
			return `${selectedActivityReviewer.achievedResultValue.toString()} ${selectedActivityReviewer.activityResultType}`;
		}
	}

	/**
	 * Opens reviewer options
	 * @param selectedActivity 
	 */
	 async openReviewerOptions(selectedReviewer: ActivityReviewerModel) {
		const actionSheet = await this.actionSheetController.create({
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
		await actionSheet.present();
	}

	/**
	 * Adds edit review
	 * @param selectedReviewer 
	 */
	async addEditReview(selectedReviewer: ActivityReviewerModel){
		if(this._loggedInUser != selectedReviewer.reviewerUserId){
			this.alertService.presentBasicAlert(this.stringKey.ALERT_NO_SAME_REVIEWER)
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
	async delete(selectedReviewer: ActivityReviewerModel) {
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
}
