import { Component, OnInit, OnDestroy, Input, Injector, ElementRef, ViewChild } from "@angular/core";
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
import { StringKey } from 'src/app/shared/constant/string.constant';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { ProjectActivityService } from 'src/app/shared/service/project-activity.service';
import { ProjectService } from 'src/app/shared/service/project.service';
import { ActivityModel } from 'src/app/shared/model/activity.model';
import { ActivityMeasurementTypeEnum } from "src/app/shared/enum/activity-measurement-type.enum";
import { UserModel } from "src/app/shared/model/user.model";
import { GoalModel } from "src/app/shared/model/goal.model";
import { ModuleEnum } from "src/app/shared/enum/module.enum";

@Component({
	selector: "app-create-edit-project-activity",
	templateUrl: "./create-edit-project-activity.component.html",
	styleUrls: ["./create-edit-project-activity.component.scss"],
})
export class CreateEditProjectActivityComponent extends BaseFormComponent
	implements OnInit, OnDestroy {

	/**
	 * Passed activity of create edit project activity component
	 */
	_passedActivity: ActivityModel;

	/**
	 * Default sprint model of create edit project activity component
	 */
	_defaultSprintModel: SprintModel;

	/**
	 * Project sprints of create edit project activity component
	 */
	_projectSprints: SprintModel[];

	/**
	 * Project users of create edit project activity component
	 */
	_projectUsers: UserModel[];

	/**
	 * Project goals of create edit project activity component
	 */
	_projectGoals: GoalModel[];

	/**
	 * Selected sprint of create edit project activity component
	 */
	_selectedSprint: SprintModel;

	/**
	 * Selected user of create edit project activity component
	 */
	_selectedUser: UserModel = null;

	/**
	 * Selected goal of create edit project activity component
	 */
	_selectedGoal: GoalModel;

	/**
	 * Selected activity measurement type of create edit project activity component
	 */
	selectedActivityMeasurementType: ActivityMeasurementTypeEnum;

	/**
	 * Modal data of create edit project activity component
	 */
	_modalData: ModalData;

	/**
	 * Show num scale of create edit project activity component
	 */
	_showNumScale : boolean = false;

	/**
	 * Activity weight delta of create edit project activity component
	 */
	_activityWeightDelta : number = 0

	/**
	 * Previous activity weight delta of create edit project activity component
	 */
	_previousActivityWeightDelta : number = 0

	/**
	 * Characteristics higher better of create edit project activity component
	 */
	_characteristicsHigherBetter : boolean = true;
	
	/**
	 * Activity measurement type enum of create edit project activity component
	 */
	activityMeasurementTypeEnum = ActivityMeasurementTypeEnum;

	/**
	 * Module enum of create edit project activity component
	 */
	moduleEnum = ModuleEnum;

	/**
	 * Animation duration of create edit project activity component
	 */
	_animationDuration = 100;

	/**
	 * Transition height of create edit project activity component
	 */
	_transitionHeight = -356;

	/**
	 * Drop selector title of create edit project activity component
	 */
	_dropSelectorTitle: string;

	/**
	 * View child of create edit project activity component
	 */
	@ViewChild("dropSelector", { read: ElementRef, static: true}) dropSelector: ElementRef;
	
	/**
	 * View child of create edit project activity component
	 */
	@ViewChild("dropSelectorBackdrop", { read: ElementRef, static: true}) dropSelectorBackdrop: ElementRef;
	
	/**
	 * View child of create edit project activity component
	 */
	@ViewChild("activityMeasurementTypeDropSelector", { read: ElementRef, static: true}) activityMeasurementTypeDropSelector: ElementRef;
	
	/**
	 * Sets bread crumb
	 */
	 public set dropSelectorTitle(value: string) {
		this._dropSelectorTitle = value;
	}

	/**
	 * Gets bread crumb
	 */
	public get dropSelectorTitle(): string {
		return this._dropSelectorTitle;
	}

	/**
	 * Sets show num scale
	 */
	 public set showNumScale(value: boolean) {
		this._showNumScale = value;
	}

	/**
	 * Gets show num scale
	 */
	public get showNumScale(): boolean {
		return this._showNumScale;
	}

	/**
	 * Sets characteristics higher better
	 */
	public set characteristicsHigherBetter(value: boolean) {
		this._characteristicsHigherBetter = value;
	}

	/**
	 * Gets characteristics higher better
	 */
	public get characteristicsHigherBetter(): boolean {
		return this._characteristicsHigherBetter;
	}
	
	/**
	 * Creates an instance of create edit project activity component.
	 * @param injector 
	 * @param alertService 
	 * @param projectActivityService 
	 * @param projectService 
	 * @param loadingService 
	 * @param navParams 
	 * @param animationController 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectActivityService: ProjectActivityService,
		private projectService: ProjectService,
		private loadingService: LoadingService,
		public navParams: NavParams,
		public animationController: AnimationController

	) {
		super(injector);
		this._passedActivity = this.navParams.get("data");
		this.buildFrom();
		this.loadData();
	}

	/**
	 * on init
	 */
	 ngOnInit() { 
		this.dropSelectorBackdrop.nativeElement.hidden = true;
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Chooses task measurement type
	 * @param operations 
	 */
	 public chooseTaskMeasurementType(operations: ActivityMeasurementTypeEnum){
		this.selectedActivityMeasurementType = operations;
		const form = this.formGroup.value;
		this.formGroup.controls.activityMeasurementType.setValue(operations);
		if(operations == ActivityMeasurementTypeEnum.Bool){
			this._showNumScale = false;
			this.formGroup.controls.criteriaPoorValue.setValue('0');
			this.formGroup.controls.criteriaImprovementValue.setValue('0');
			this.formGroup.controls.criteriaExpectationValue.setValue('0');
			this.formGroup.controls.criteriaExceedValue.setValue('0');
			this.formGroup.controls.criteriaOutstandingValue.setValue('100');
		}
		else{
			this._showNumScale = true;
		}
		this.closeDropSelector();
	}

	/**
	 * Sets passed value to from
	 */
	private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.activityName = this._passedActivity.activityName;
		form.activityWeight = this._passedActivity.activityWeight;
		form.activityMeasurementType = this._passedActivity.activityMeasurementType;
		form.activityResultType = this._passedActivity.activityResultType;
		form.criteriaPoorValue = this._passedActivity.criteriaPoorValue;
		form.criteriaImprovementValue = this._passedActivity.criteriaImprovementValue;
		form.criteriaExpectationValue = this._passedActivity.criteriaExpectationValue;
		form.criteriaExceedValue = this._passedActivity.criteriaExceedValue;
		form.criteriaOutstandingValue = this._passedActivity.criteriaOutstandingValue;

		if(this._passedActivity.activityMeasurementType){
			this.chooseTaskMeasurementType(this._passedActivity.activityMeasurementType);
		}
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			activityName: [
				this._passedActivity.activityName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			activityWeight: [
				this._passedActivity.activityWeight,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			
			activityMeasurementType: [
				this._passedActivity.activityMeasurementType,
				this.validators().compose([
					this.validators().required,
				]),
			],
			activityResultType: [
				this._passedActivity.activityResultType,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ACTIVITY_RESULT_TYPE_PATTERN),
				]),
			],
			criteriaPoorValue: [
				this._passedActivity.criteriaPoorValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaImprovementValue: [
				this._passedActivity.criteriaImprovementValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaExpectationValue: [
				this._passedActivity.criteriaExpectationValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaExceedValue: [
				this._passedActivity.criteriaExceedValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaOutstandingValue: [
				this._passedActivity.criteriaOutstandingValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
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
		if (this._passedActivity.operationType === OperationsEnum.Create) {
			title = this.stringKey.CREATE_ACTIVITY;
		} else {
			title = this.stringKey.UPDATE_ACTIVITY;
			this._previousActivityWeightDelta = this._passedActivity.activityWeight;
		}

		return title;
	}

	/**
	 * Calculates weight delta
	 * @param activityWeight 
	 * @returns  
	 */
	async calculateWeightDelta(activityWeight: number){
		//console.log(`${this._previousActivityWeightDelta} - ${activityWeight}`);
		return activityWeight - this._previousActivityWeightDelta;
	}
	
	/**
	 * Loads data
	 */
	async loadData() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this._passedActivity.projectId,
			userId: this._passedActivity.userId
		};

		this.projectService
			.getProjectRaw(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						this._projectSprints = baseModel.data.projectSprints.data;
						this._projectUsers = baseModel.data.projectAssignees.data;
						this._projectGoals = baseModel.data.projectGoals.data;
					}
				}
			);
	}

	/**
	 * Gets activity name
	 */
	get activityName() {
		return this.formGroup.get("activityName");
	}

	/**
	 * Gets activity weight
	 */
	get activityWeight() {
		return this.formGroup.get("activityWeight");
	}

	/**
	 * Gets activity result type
	 */
	get activityResultType() {
		return this.formGroup.get("activityResultType");
	}

	/**
	 * Gets activity measurement type
	 */
	get activityMeasurementType() {
		return this.formGroup.get("activityMeasurementType");
	}

	/**
	 * Gets criteria poor value
	 */
	get criteriaPoorValue() {
		return this.formGroup.get("criteriaPoorValue");
	}

	/**
	 * Gets criteria improvement value
	 */
	get criteriaImprovementValue() {
		return this.formGroup.get("criteriaImprovementValue");
	}

	/**
	 * Gets criteria expectation value
	 */
	get criteriaExpectationValue() {
		return this.formGroup.get("criteriaExpectationValue");
	}

	/**
	 * Gets criteria exceed value
	 */
	get criteriaExceedValue() {
		return this.formGroup.get("criteriaExceedValue");
	}

	/**
	 * Gets criteria outstanding value
	 */
	get criteriaOutstandingValue() { 
		return this.formGroup.get("criteriaOutstandingValue");
	}

	/**
	 * Submits create edit project activity component
	 */
	async submit() {
		console.log(this.findInvalidControls());
		console.log(this.formGroup.value);

		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			if(this.selectedActivityMeasurementType === ActivityMeasurementTypeEnum.Bool){
				await this.submitData();
			}
			else{
				if(this._characteristicsHigherBetter){
					this.higherBetterValueValidation();
				}
				else{
					this.lowerBetterValueValidation();
				}
			}
		}
	}

	/**
	 * Highers better value validation
	 */
	private async higherBetterValueValidation() {
		const form = this.formGroup.value;
		if(parseInt(form.criteriaImprovementValue) >= parseInt(form.criteriaPoorValue) && parseInt(form.criteriaImprovementValue) < parseInt(form.criteriaExpectationValue))
		{
			if(parseInt(form.criteriaExpectationValue) >= parseInt(form.criteriaImprovementValue) && parseInt(form.criteriaExpectationValue) < parseInt(form.criteriaExceedValue))
			{
			
				if(parseInt(form.criteriaExceedValue) >= parseInt(form.criteriaExpectationValue) && parseInt(form.criteriaExceedValue) < parseInt(form.criteriaOutstandingValue))
				{
					if(parseInt(form.criteriaOutstandingValue) >= parseInt(form.criteriaExceedValue))
					{
						await this.submitData();
					}		
					else{
						await this.alertService.presentBasicAlert(
							`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
						);
					}
				}
				else{
					await this.alertService.presentBasicAlert(
						`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
					);
				}	
			}	
			else{
				await this.alertService.presentBasicAlert(
					`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
				);
			}
		}
		else{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
			);
		}	
	}

	/**
	 * Lowers better value validation
	 */
	private async lowerBetterValueValidation() {
		const form = this.formGroup.value;
		if(parseInt(form.criteriaImprovementValue) <= parseInt(form.criteriaPoorValue) && parseInt(form.criteriaImprovementValue) > parseInt(form.criteriaExpectationValue))
		{
			if(parseInt(form.criteriaExpectationValue) <= parseInt(form.criteriaImprovementValue) && parseInt(form.criteriaExpectationValue) > parseInt(form.criteriaExceedValue))
			{
			
				if(parseInt(form.criteriaExceedValue) <= parseInt(form.criteriaExpectationValue) && parseInt(form.criteriaExceedValue) > parseInt(form.criteriaOutstandingValue))
				{
					if(parseInt(form.criteriaOutstandingValue) <= parseInt(form.criteriaExceedValue))
					{
						await this.submitData();
					}		
					else{
						await this.alertService.presentBasicAlert(
							`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
						);
					}
				}
				else{
					await this.alertService.presentBasicAlert(
						`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
					);
				}	
			}	
			else{
				await this.alertService.presentBasicAlert(
					`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
				);
			}
		}
		else{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_MEASUREMENT_CRITERIA_RANGE}`
			);
		}	
	}
	
	/**
	 * Determines whether toggle btn change on
	 * @param event 
	 */
	onToggleBtnChange(event): void {
		const val = this._characteristicsHigherBetter;
		console.log(val);
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private async buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: ActivityModel = {
			userId: this._passedActivity.userId,
			projectId: this._passedActivity.projectId,
			sprintId: this._passedActivity.sprintId,
			assigneeUserId:this._passedActivity.assigneeUserId,
			goalId:this._passedActivity.goalId,
			activityId: this._passedActivity.activityId,
			activityName: form.activityName,
			activityWeight: form.activityWeight,
			activityWeightDelta: await this.calculateWeightDelta(form.activityWeight),
			activityMeasurementType: this.selectedActivityMeasurementType,
			activityResultType: form.activityResultType,
			criteriaPoorValue: form.criteriaPoorValue,
			criteriaImprovementValue: form.criteriaImprovementValue,
			criteriaExpectationValue: form.criteriaExpectationValue,
			criteriaExceedValue: form.criteriaExceedValue,
			criteriaOutstandingValue: form.criteriaOutstandingValue,
			characteristicsHigherBetter : this._characteristicsHigherBetter ? 1 : 0,
			operationType: this._passedActivity.operationType,
		};

		return model;
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const activityModel: ActivityModel = await this.buildDataModelToPass();
		
		this.projectActivityService
			.projectActivityCrud(activityModel)
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
	 * Cancels modal
	 */
	cancelModal() {

		this._passedActivity = this._defaultSprintModel;
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

	/**
	 * Opens drop selector
	 * @param dropSelectorType 
	 */
	async openDropSelector(dropSelectorType: ModuleEnum) {
		this.activeDropSelector(dropSelectorType);
		const animation = this.animationController
		.create()
		.addElement(this.dropSelector.nativeElement)
		.duration(this._animationDuration)
		.fromTo("transform", "translateY(0px)", `translateY(${this._transitionHeight}px)`);
		animation.play();
	}	

	/**
	 * Actives drop selector
	 * @param dropSelectorType 
	 */
	private activeDropSelector(dropSelectorType: ModuleEnum) {
		this.dropSelectorBackdrop.nativeElement.hidden = false;
		console.log(dropSelectorType);
		switch (dropSelectorType) {
			case ModuleEnum.measurementType:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.measurementType}`;
				this.activityMeasurementTypeDropSelector.nativeElement.hidden = false;
				break;
		
			default:
				break;
		}
	}

	/**
	 * Closes drop selector
	 */
	async closeDropSelector(){
		this.dropSelectorBackdrop.nativeElement.hidden = true;
		const animation = this.animationController
		.create()
		.addElement(this.dropSelector.nativeElement)
		.duration(this._animationDuration)
		.fromTo("transform", `translateY(${this._transitionHeight}px)`, "translateY(0px)");
		animation.play();
	}
}
