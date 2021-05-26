/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Create edit project component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:11:18 
 * Last modified  : 2021-05-18 19:11:41
 */


import { Component, OnInit, OnDestroy, Input, Injector } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { ProjectModel } from "src/app/shared/model/project.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ProjectService } from "src/app/shared/service/project.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { NavParams } from "@ionic/angular";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";

@Component({
	selector: "app-create-edit-project",
	templateUrl: "./create-edit-project.component.html",
	styleUrls: ["./create-edit-project.component.scss"],
})
export class CreateEditProjectComponent extends BaseFormComponent implements OnInit, OnDestroy {
	
	/**
	 * Input  of create edit project component
	 */
	@Input() data: string;

	/**
	 * Passed project of create edit project component
	 */
	private _passedProject: ProjectModel;

	/**
	 * Modal data of create edit project component
	 */
	private _modalData: ModalData;

	/**
	 * Creates an instance of create edit project component.
	 * @param injector 
	 * @param alertService 
	 * @param projectService 
	 * @param loadingService 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectService: ProjectService,
		private loadingService: LoadingService,
		public navParams: NavParams
	) {
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit() {
		this._passedProject = this.navParams.get("data");
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
		form.projectName = this._passedProject.projectName;
		form.projectDescription = this._passedProject.projectDescription;
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			projectName: [
				this._passedProject.projectName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			projectDescription: [
				this._passedProject.projectDescription,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.DESCRIPTION_PATTERN),
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
		if (this._passedProject.operationType === OperationsEnum.Create) {
			title = this.stringKey.CREATE_PROJECT;
		} else {
			title = this.stringKey.UPDATE_PROJECT;
		}

		return title;
	}

	/**
	 * Gets project name
	 */
	get projectName() {
		return this.formGroup.get("projectName");
	}

	/**
	 * Gets project description
	 */
	get projectDescription() {
		return this.formGroup.get("projectDescription");
	}

	/**
	 * Submits create edit project component
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
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: ProjectModel = {
			userId: this._passedProject.userId,
			projectId: this._passedProject.projectId,
			projectName: form.projectName,
			projectDescription: form.projectDescription,
			operationType: this._passedProject.operationType,
		};

		return model;
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const crudProject: ProjectModel = this.buildDataModelToPass();

		this.projectService
			.crudProject(crudProject)
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
						await this.dismissModal();
					}
				},
				async (error) => {
					await this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Cancels modal
	 */
	 async cancelModal() {
		this._passedProject = this._passedProject;
		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		await this.dismissModal();
	}

	/**
	 * Dismiss modal
	 */
	async dismissModal() {
		await this.modalController.dismiss(this._modalData).then(() => {
			this.formGroup.reset();
		}); 
	}
}