import { Component, OnInit, OnDestroy, Input, Injector } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { ActivityModel } from "src/app/shared/model/activity.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { NavParams } from "@ionic/angular";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";
import { ProjectActivityService } from 'src/app/shared/service/project-activity.service';
import { DatePipe } from '@angular/common';
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { ProjectActivityReviewerService } from "src/app/shared/service/project-activity-reviewer.service";
import { ActivityMeasurementTypeEnum } from "src/app/shared/enum/activity-measurement-type.enum";

@Component({
	selector: "app-create-edit-project-activity-review",
	templateUrl: "./create-edit-project-activity-review.component.html",
	styleUrls: ["./create-edit-project-activity-review.component.scss"],
})
export class CreateEditProjectActivityReviewComponent extends BaseFormComponent implements OnInit, OnDestroy {

	/**
	 * Input  of create edit project activity component
	 */
	@Input() data: string;

	/**
	 * Passed activity of create edit project activity component
	 */
	private _passedActivityReview: ActivityReviewerModel;

	/**
	 * Modal data of create edit project activity component
	 */
	private _modalData: ModalData;

	/**
	 * Activity measurement type enum of create edit project activity component
	 */
	activityMeasurementTypeEnum = ActivityMeasurementTypeEnum;

	/**
	 * Determines whether toggled is
	 */
	private _isToggled: boolean = false;

	/**
	 * Sets passed activity review
	 */
	public set passedActivityReview(value: ActivityReviewerModel) {
		this._passedActivityReview = value;
	}

	/**
	 * Gets passed activity review
	 */
	public get passedActivityReview(): ActivityReviewerModel {
		return this._passedActivityReview;
	}

	public set isToggled(value: boolean) {
		this._isToggled = value;
	}

	/**
	 * Gets passed activity review
	 */
	public get isToggled(): boolean {
		return this._isToggled;
	}

	

	/**
	 * Creates an instance of create edit project activity component.
	 * @param injector 
	 * @param alertService 
	 * @param projectActivityService 
	 * @param loadingService 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectActivityService: ProjectActivityService,
		private projectActivityReviewerService: ProjectActivityReviewerService,
		private loadingService: LoadingService,
		public navParams: NavParams
	) {
		super(injector);
	}

	/**
	  * on init
	  */
	ngOnInit() {
		this._passedActivityReview = this.navParams.get("data");
		this.buildFrom();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Gets achieved result value
	 */
	get achievedResultValue() {
		return this.formGroup.get("achievedResultValue");
	}

	/**
	 * Gets activity description
	 */
	 get reviewerComment() {
		return this.formGroup.get("reviewerComment");
	}

	/**
	 * Builds from
	 */
	private async buildFrom() {
		this.formGroup = this.formBuilder.group({
			achievedResultValue: [
				this._passedActivityReview.achievedResultValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			reviewerComment: [
				this._passedActivityReview.reviewerComment,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.COMMENT_PATTERN),
				]),
			]
		});

		this.setPassedValueToFrom();
		await this.mapToggle();
	}

	/**
	 * Sets passed value to from
	 */
	 private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.reviewerComment = this._passedActivityReview.reviewerComment;
		form.achievedResultValue = this._passedActivityReview.achievedResultValue;
	}

	/**
	 * Maps toggle
	 */
	 async mapToggle(){
		if(this._passedActivityReview.activityMeasurementType == this.activityMeasurementTypeEnum.Bool){
			if(this._passedActivityReview.achievedResultValue == 100){
				this._isToggled = true;
			}
			else{
				this._isToggled = false;
			}
		}
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: ActivityReviewerModel = {
			userId: this._passedActivityReview.userId,
			projectId: this._passedActivityReview.projectId,
			activityId: this._passedActivityReview.activityId,
			activityReviewId: this._passedActivityReview.activityReviewId,
			reviewerUserId: this._passedActivityReview.reviewerUserId,
			reviewerComment: form.reviewerComment,
			achievedResultValue: form.achievedResultValue,
			operationType: this._passedActivityReview.operationType,
		};

		return model;
	}

	/**
	 * Submits create edit project activity component
	 */
	async submit() {
		
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			await this.submitData();
		}
	}

	/**
	 * Gets loading message
	 */
	async getLoadingMessage() {
		if (this._passedActivityReview.operationType === OperationsEnum.Delete) {
			return `${this.stringKey.API_REQUEST_MESSAGE_6}`;
		}
		else {
			return `${this.stringKey.API_REQUEST_MESSAGE_2}`;
		}
	}

	/**
	 * Deletes create edit project activity component
	 */
	async delete() {
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
						this._passedActivityReview.operationType = OperationsEnum.Delete;
						await this.submitData();
					}
				}
			]
		});

		await alertController.present();
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const passedData: ActivityReviewerModel = this.buildDataModelToPass();

		this.projectActivityReviewerService
			.projectActivityReviewUpdate(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					await this.loadingService.dismiss();

					// build
					if (baseModel.success) {

						this._modalData = {
							cancelled: false,
							operationSubmitted: true,
						};

						await this.presentToast(baseModel.message);
						// store active user
						this.dismissModal();
					}
				},
				(error) => {
					//console.log(error);
					this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Determines whether toggle btn change on
	 * @param event 
	 */
	onToggleBtnChange(event): void {
		const val = this._isToggled;
		if(val){
			this.formGroup.controls.achievedResultValue.setValue(100);
		}
		else{
			this.formGroup.controls.achievedResultValue.setValue(0);
		}
	}

	/**
	 * Dismiss modal
	 */
	 dismissModal() {
		this.modalController.dismiss(this._modalData).then(() => {
			this.formGroup.reset();
		});
	}

	/**
	 * Cancels modal
	 */
	cancelModal() {

		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		this.dismissModal();
	}
}
