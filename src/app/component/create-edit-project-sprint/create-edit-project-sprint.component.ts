import { Component, OnInit, OnDestroy, Input, Injector, ViewChild, ElementRef } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { SprintModel } from "src/app/shared/model/sprint.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { AnimationController, NavParams } from "@ionic/angular";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";
import { ProjectSprintService } from 'src/app/shared/service/project-sprint.service';
import { DatePipe } from '@angular/common';
import { IntroModule } from "../intro/intro.component.module";

@Component({
	selector: "app-create-edit-project-sprint",
	templateUrl: "./create-edit-project-sprint.component.html",
	styleUrls: ["./create-edit-project-sprint.component.scss"],
})
export class CreateEditProjectSprintComponent extends BaseFormComponent
	implements OnInit, OnDestroy {

	/**
	 * Input  of create edit project sprint component
	 */
	@Input() data: string;

	/**
	 * Passed sprint of create edit project sprint component
	 */
	private _passedSprint: SprintModel;

	/**
	 * Default sprint model of create edit project sprint component
	 */
	private _defaultSprintModel: SprintModel;

	/**
	 * Modal data of create edit project sprint component
	 */
	private _modalData: ModalData;

	/**
	 * Creates an instance of create edit project sprint component.
	 * @param injector 
	 * @param alertService 
	 * @param projectSprintService 
	 * @param loadingService 
	 * @param navParams 
	 * @param datePipe 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectSprintService: ProjectSprintService,
		private loadingService: LoadingService,
		public navParams: NavParams,
		private datePipe: DatePipe,
		public animationCtrl: AnimationController
	) {
		super(injector);
		this._passedSprint = this.navParams.get("data");
		this.buildFrom();
	}

	/**
	 * on init
	 */
	ngOnInit() { }

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
		form.sprintName = this._passedSprint.sprintName;
		form.sprintStartDate = this._passedSprint.sprintStartDate;
		form.sprintEndDate = this._passedSprint.sprintEndDate;
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			sprintName: [
				this._passedSprint.sprintName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			sprintStartDate: [
				this._passedSprint.sprintStartDate,
				this.validators().compose([
					this.validators().required,
				]),
			],
			sprintEndDate: [
				this._passedSprint.sprintEndDate,
				this.validators().compose([
					this.validators().required,
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	/**
	 * Gets page title
	 */
	get pageTitle() {
		let title: string;
		switch (this._passedSprint.operationType) {
			case OperationsEnum.Create:
				title = this.stringKey.CREATE_SPRINT;
				break;
			case OperationsEnum.Edit:
				title = this.stringKey.UPDATE_SPRINT;
				break;
			default:
				break;
		}

		return title;
	}

	/**
	 * Gets sprint name
	 */
	get sprintName() {
		return this.formGroup.get("sprintName");
	}

	/**
	 * Gets sprint start date
	 */
	get sprintStartDate() {
		return this.formGroup.get("sprintStartDate");
	}

	/**
	 * Gets sprint end date
	 */
	get sprintEndDate() {
		return this.formGroup.get("sprintEndDate");
	}

	/**
	 * Submits create edit project sprint component
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
	 * Transforms date
	 * @param date 
	 * @returns  
	 */
	private transformDate(date) {
		let formattedDate = this.datePipe.transform(
			new Date(date),
			"yyyy-MM-dd"
		);

		return formattedDate;
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: SprintModel = {
			userId: this._passedSprint.userId,
			projectId: this._passedSprint.projectId,
			sprintId: this._passedSprint.sprintId,
			sprintName: form.sprintName,
			sprintStartDate: this.transformDate(form.sprintStartDate),
			sprintEndDate: this.transformDate(form.sprintEndDate),
			operationType: this._passedSprint.operationType,
		};

		return model;
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
						this._passedSprint.operationType = OperationsEnum.Delete;
						await this.submitData();
					}
				}
			]
		});

		await alertController.present();
	}

	/**
	 * Gets loading message
	 */
	async getLoadingMessage() {
		if (this._passedSprint.operationType === OperationsEnum.Delete) {
			return `${this.stringKey.API_REQUEST_MESSAGE_6}`;
		}
		else {
			return `${this.stringKey.API_REQUEST_MESSAGE_2}`;
		}
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(await this.getLoadingMessage());

		const crudSprint: SprintModel = this.buildDataModelToPass();

		this.projectSprintService
			.crudSprint(crudSprint)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					await this.loadingService.dismiss();

					// build
					if (baseModel.success) {
						this._modalData = {
							cancelled: false,
							operationSubmitted: true,
							returnMessage: baseModel.message
						};

						await this.presentToast(baseModel.message);
						// store active user
						this.dismissModal();
					}

					// cancel model if operation delete
					if (this._passedSprint.operationType === OperationsEnum.Delete) {
						this.cancelModal()
					}
				},
				(error) => {
					this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Cancels modal
	 */
	cancelModal() {

		this._passedSprint = this._defaultSprintModel;
		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		this.dismissModal();
	}

	/**
	 * Dismiss modal
	 */
	dismissModal() {
		this.modalController.dismiss(this._modalData).then(() => {
			this.formGroup.reset();
		});
	}
}
