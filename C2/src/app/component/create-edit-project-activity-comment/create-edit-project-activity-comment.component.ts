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

@Component({
	selector: "app-create-edit-project-activity-comment",
	templateUrl: "./create-edit-project-activity-comment.component.html",
	styleUrls: ["./create-edit-project-activity-comment.component.scss"],
})
export class CreateEditProjectActivityCommentComponent extends BaseFormComponent implements OnInit, OnDestroy {

	/**
	 * Input  of create edit project activity component
	 */
	@Input() data: string;

	/**
	 * Passed activity of create edit project activity component
	 */
	private _passedActivity: ActivityModel;

	/**
	 * Modal data of create edit project activity component
	 */
	 private _modalData: ModalData;

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
		private loadingService: LoadingService,
		public navParams: NavParams
	) {
		super(injector);
	}

	/**
	  * on init
	  */
	ngOnInit() {
		this._passedActivity = this.navParams.get("data");
		this.buildFrom();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	

	/**
	 * Gets activity description
	 */
	get commentDescription() {
		return this.formGroup.get("commentDescription");
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			commentDescription: [
				this._passedActivity.commentDescription,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.COMMENT_PATTERN),
				]),
			]
		});

		this.setPassedValueToFrom();
	}

	/**
	 * Sets passed value to from
	 */
	 private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.commentDescription = this._passedActivity.commentDescription;
	}

	/**
	 * Gets page title
	 */
	get pageTitle() {
		let title: string;
		switch (this._passedActivity.operationType) {
			case OperationsEnum.Create:
				title = this.stringKey.ADD_COMMENT;
				break;
			case OperationsEnum.Edit:
				title = this.stringKey.UPDATE_COMMENT;
				break;

			default:
				break;
		}

		return title;
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: ActivityModel = {
			userId: this._passedActivity.userId,
			projectId: this._passedActivity.projectId,
			activityId: this._passedActivity.activityId,
			assigneeUserId: this._passedActivity.assigneeUserId,
			commentDescription: form.commentDescription,
			operationType: this._passedActivity.operationType,
		};

		return model;
	}

	/**
	 * Submits create edit project activity component
	 */
	async submit() {
		console.log(this.findInvalidControls());
		
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
		if (this._passedActivity.operationType === OperationsEnum.Delete) {
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
						this._passedActivity.operationType = OperationsEnum.Delete;
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
		this.loadingService.present(await this.getLoadingMessage());

		const crudActivity: ActivityModel = this.buildDataModelToPass();

		this.projectActivityService
			.projectActivityCommentCrud(crudActivity)
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

					// cancel model if operation delete
					if (this._passedActivity.operationType === OperationsEnum.Delete) {
						this.cancelModal()
					}
				},
				(error) => {
					//console.log(error);
					this.loadingService.dismiss();
				}
			);
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
