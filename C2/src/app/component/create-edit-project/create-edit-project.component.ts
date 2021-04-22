import { Component, OnInit, OnDestroy, Input, Injector } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { ProjectModel } from "src/app/shared/model/project.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { ProjectService } from "src/app/shared/service/project.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { NavParams } from "@ionic/angular";
import { Operations } from "src/app/shared/enum/operations.enum";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";

@Component({
	selector: "app-create-edit-project",
	templateUrl: "./create-edit-project.component.html",
	styleUrls: ["./create-edit-project.component.scss"],
})
export class CreateEditProjectComponent extends BaseFormComponent
	implements OnInit, OnDestroy {
	@Input() data: string;
	passedProject: ProjectModel;
	defaultProjectModel: ProjectModel;
	modalData: ModalData;

	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectService: ProjectService,
		private loadingService: LoadingService,
		public navParams: NavParams
	) {
		super(injector);
		this.passedProject = this.navParams.get("data");
		
		this.buildFrom();
	}

	private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.projectName = this.passedProject.projectName;
		form.projectDescription = this.passedProject.projectDescription;
	}
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			projectName: [
				this.passedProject.projectName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			projectDescription: [
				this.passedProject.projectDescription,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.DESCRIPTION_PATTERN),
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	get pageTitle() {
		let title: string;
		if (this.passedProject.operationType === Operations.Create) {
			title = this.stringKey.CREATE_PROJECT;
		} else {
			title = this.stringKey.UPDATE_PROJECT;
		}

		return title;
	}

	//get user email
	get projectName() {
		return this.formGroup.get("projectName");
	}

	get projectDescription() {
		return this.formGroup.get("projectDescription");
	}

	// submit login
	async submit() {
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			await this.submitData();
		}
	}

	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: ProjectModel = {
			userId: this.passedProject.userId,
			projectId: this.passedProject.projectId,
			projectName: form.projectName,
			projectDescription: form.projectDescription,
			operationType: this.passedProject.operationType,
		};

		return model;
	}

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
						this.modalData = {
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

	cancelModal() {
		
		this.passedProject = this.defaultProjectModel;
		this.modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		this.dismissModal();
	}

	dismissModal() {
		this.modalController.dismiss(this.modalData).then(() => {
			this.formGroup.reset();
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
