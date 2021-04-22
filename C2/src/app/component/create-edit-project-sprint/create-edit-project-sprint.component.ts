import { Component, OnInit, OnDestroy, Input, Injector } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { SprintModel } from "src/app/shared/model/sprint.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { NavParams } from "@ionic/angular";
import { Operations } from "src/app/shared/enum/operations.enum";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";
import { ProjectSprintService } from 'src/app/shared/service/project-sprint.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: "app-create-edit-project-sprint",
	templateUrl: "./create-edit-project-sprint.component.html",
	styleUrls: ["./create-edit-project-sprint.component.scss"],
})
export class CreateEditProjectSprintComponent extends BaseFormComponent
	implements OnInit, OnDestroy {
	@Input() data: string;
	passedSprint: SprintModel;
	defaultSprintModel: SprintModel;
	modalData: ModalData;

	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectSprintService: ProjectSprintService,
		private loadingService: LoadingService,
		public navParams: NavParams,
		private datePipe: DatePipe
	) {
		super(injector);
		this.passedSprint = this.navParams.get("data");
		console.log(this.passedSprint);
		this.buildFrom();
	}

	private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.sprintName = this.passedSprint.sprintName;
		form.sprintStartDate = this.passedSprint.sprintStartDate;
		form.sprintEndDate = this.passedSprint.sprintEndDate;
	}
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			sprintName: [
				this.passedSprint.sprintName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			sprintStartDate: [
				this.passedSprint.sprintStartDate,
				this.validators().compose([
					this.validators().required,
				]),
			],
			sprintEndDate: [
				this.passedSprint.sprintEndDate,
				this.validators().compose([
					this.validators().required,
				]),
			],
		});

		this.setPassedValueToFrom();
	}

	get pageTitle() {
		let title: string;
		if (this.passedSprint.operationType === Operations.Create) {
			title = this.stringKey.CREATE_SPRINT;
		} else {
			title = this.stringKey.UPDATE_SPRINT;
		}

		return title;
	}

	//get user email
	get sprintName() {
		return this.formGroup.get("sprintName");
	}

	get sprintStartDate() {
		return this.formGroup.get("sprintStartDate");
	}

	get sprintEndDate() {
		return this.formGroup.get("sprintEndDate");
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
	/**
	 * @param  {} date
	 */
	private transformDate(date){
		let formattedDate = this.datePipe.transform(
			new Date(date),
			"yyyy-MM-dd"
		);
		
		return formattedDate;
	}
	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: SprintModel = {
			userId: this.passedSprint.userId,
			projectId: this.passedSprint.projectId,
			sprintId: this.passedSprint.sprintId,
			sprintName: form.sprintName,
			sprintStartDate: this.transformDate(form.sprintStartDate),
			sprintEndDate: this.transformDate(form.sprintEndDate),
			operationType: this.passedSprint.operationType,
		};

		return model;
	}

	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const crudSprint: SprintModel = this.buildDataModelToPass();

		this.projectSprintService
			.projectSprintCrud(crudSprint)
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
		
		this.passedSprint = this.defaultSprintModel;
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
