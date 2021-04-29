import { Component, OnInit, OnDestroy, Input, Injector } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { GoalModel } from "src/app/shared/model/goal.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { NavParams } from "@ionic/angular";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";
import { ProjectGoalService } from 'src/app/shared/service/project-goal.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: "app-create-edit-project-goal",
	templateUrl: "./create-edit-project-goal.component.html",
	styleUrls: ["./create-edit-project-goal.component.scss"],
})
export class CreateEditProjectGoalComponent extends BaseFormComponent implements OnInit, OnDestroy {

	/**
	 * Input  of create edit project goal component
	 */
	@Input() data: string;

	/**
	 * Passed goal of create edit project goal component
	 */
	private _passedGoal: GoalModel;

	/**
	 * Default goal model of create edit project goal component
	 */
	private _defaultGoalModel: GoalModel;

	/**
	 * Modal data of create edit project goal component
	 */
	 private _modalData: ModalData;

	/**
	 * Creates an instance of create edit project goal component.
	 * @param injector 
	 * @param alertService 
	 * @param projectGoalService 
	 * @param loadingService 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectGoalService: ProjectGoalService,
		private loadingService: LoadingService,
		public navParams: NavParams
	) {
		super(injector);
	}

	/**
	  * on init
	  */
	ngOnInit() {
		this._passedGoal = this.navParams.get("data");
		this.buildFrom();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.goalName = this._passedGoal.goalName;
		form.goalDescription = this._passedGoal.goalDescription;
	}

	/**
	 * Gets goal name
	 */
	 get goalName() {
		return this.formGroup.get("goalName");
	}

	/**
	 * Gets goal description
	 */
	get goalDescription() {
		return this.formGroup.get("goalDescription");
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			goalName: [
				this._passedGoal.goalName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			goalDescription: [
				this._passedGoal.goalDescription,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.DESCRIPTION_PATTERN),
				]),
			]
		});

		this.setPassedValueToFrom();
	}

	/**
	 * Gets page title
	 */
	get pageTitle() {
		let title: string;
		switch (this._passedGoal.operationType) {
			case OperationsEnum.Create:
				title = this.stringKey.CREATE_GOAL;
				break;
			case OperationsEnum.Edit:
				title = this.stringKey.UPDATE_GOAL;
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
		const model: GoalModel = {
			userId: this._passedGoal.userId,
			projectId: this._passedGoal.projectId,
			goalId: this._passedGoal.goalId,
			goalName: form.goalName,
			goalDescription: form.goalDescription,
			operationType: this._passedGoal.operationType,
		};

		return model;
	}

	/**
	 * Submits create edit project goal component
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
		if (this._passedGoal.operationType === OperationsEnum.Delete) {
			return `${this.stringKey.API_REQUEST_MESSAGE_6}`;
		}
		else {
			return `${this.stringKey.API_REQUEST_MESSAGE_2}`;
		}
	}

	/**
	 * Deletes create edit project goal component
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
						this._passedGoal.operationType = OperationsEnum.Delete;
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

		const crudGoal: GoalModel = this.buildDataModelToPass();

		this.projectGoalService
			.projectGoalCrud(crudGoal)
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
					if (this._passedGoal.operationType === OperationsEnum.Delete) {
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
