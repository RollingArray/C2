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
	@Input() data: string;
	passedActivity: ActivityModel;
	defaultSprintModel: SprintModel;
	projectSprints: SprintModel[];
	projectUsers: UserModel[];
	projectGoals: GoalModel[];
	selectedSprint: SprintModel;
	selectedUser: UserModel = null;
	selectedGoal: GoalModel;
	selectedActivityMeasurementType: ActivityMeasurementTypeEnum;
	modalData: ModalData;
	showNumScale : boolean = false;
	characteristicsHigherBetter : boolean = true;
	activityMeasurementTypeEnum = ActivityMeasurementTypeEnum;
	moduleEnum = ModuleEnum;
	_animationDuration = 100;
	_transitionHeight = -356;
	_dropSelectorTitle: string;

	@ViewChild("dropSelector", { read: ElementRef, static: true}) dropSelector: ElementRef;
	@ViewChild("memberDropSelector", { read: ElementRef, static: true}) memberDropSelector: ElementRef;
	@ViewChild("sprintDropSelector", { read: ElementRef, static: true}) sprintDropSelector: ElementRef;
	@ViewChild("goalDropSelector", { read: ElementRef, static: true}) goalDropSelector: ElementRef;
	@ViewChild("dropSelectorBackdrop", { read: ElementRef, static: true}) dropSelectorBackdrop: ElementRef;
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
		this.passedActivity = this.navParams.get("data");
		console.log(this.passedActivity);
		this.buildFrom();
		this.loadData();
	}

	// load data
	async loadData() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this.passedActivity.projectId,
			userId: this.passedActivity.userId
		};

		this.projectService
			.getProjectRaw(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						this.projectSprints = baseModel.data.projectSprints.data;
						this.projectUsers = baseModel.data.projectMembers.data;
						this.projectGoals = baseModel.data.projectGoals.data;
					}
				}
			);
	}

	public chooseUser(passedUser: UserModel){
		this.selectedUser = passedUser;
		this.formGroup.controls.userId.setValue(this.selectedUser);
		this.closeDropSelector();
	}

	public chooseSprint(passedSprint: SprintModel){
		this.selectedSprint = passedSprint;
		this.formGroup.controls.sprintId.setValue(this.selectedSprint);
		this.closeDropSelector();
	}

	public chooseGoal(passedGoal: GoalModel){
		this.selectedGoal = passedGoal;
		this.formGroup.controls.goalId.setValue(this.selectedGoal);
		this.closeDropSelector();
	}

	public chooseTaskMeasurementType(operations: ActivityMeasurementTypeEnum){
		this.selectedActivityMeasurementType = operations;
		const form = this.formGroup.value;
		this.formGroup.controls.activityMeasurementType.setValue(operations);
		if(operations == ActivityMeasurementTypeEnum.Bool){
			this.showNumScale = false;
			this.formGroup.controls.criteriaPoorValue.setValue('0');
			this.formGroup.controls.criteriaImprovementValue.setValue('0');
			this.formGroup.controls.criteriaExpectationValue.setValue('0');
			this.formGroup.controls.criteriaExceedValue.setValue('0');
			this.formGroup.controls.criteriaOutstandingValue.setValue('100');
		}
		else{
			this.showNumScale = true;
		}
		this.closeDropSelector();
	}

	private setPassedValueToFrom() {
		const form = this.formGroup.value;
		form.sprintId = this.passedActivity.sprintId;
		form.userId = this.passedActivity.userId;
		form.goalId = this.passedActivity.goalId;
		form.activityName = this.passedActivity.activityName;
		form.activityWeight = this.passedActivity.activityWeight;
		form.activityMeasurementType = this.passedActivity.activityMeasurementType;
		form.activityResultType = this.passedActivity.activityResultType;
		form.criteriaPoorValue = this.passedActivity.criteriaPoorValue;
		form.criteriaImprovementValue = this.passedActivity.criteriaImprovementValue;
		form.criteriaExpectationValue = this.passedActivity.criteriaExpectationValue;
		form.criteriaExceedValue = this.passedActivity.criteriaExceedValue;
		form.criteriaOutstandingValue = this.passedActivity.criteriaOutstandingValue;
	}
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			sprintId: [
				this.passedActivity.sprintId,
				this.validators().compose([
					this.validators().required,
				]),
			],
			userId: [
				this.passedActivity.userId,
				this.validators().compose([
					this.validators().required,
				]),
			],
			goalId: [
				this.passedActivity.goalId,
				this.validators().compose([
					this.validators().required,
				]),
			],
			activityName: [
				this.passedActivity.activityName,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.ALPHANUMERIC_NAME_PATTERN),
				]),
			],
			activityWeight: [
				this.passedActivity.activityWeight,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			
			activityMeasurementType: [
				this.passedActivity.activityMeasurementType,
				this.validators().compose([
					this.validators().required,
				]),
			],
			activityResultType: [
				this.passedActivity.activityResultType,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.DESCRIPTION_PATTERN),
				]),
			],
			criteriaPoorValue: [
				this.passedActivity.criteriaPoorValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaImprovementValue: [
				this.passedActivity.criteriaImprovementValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaExpectationValue: [
				this.passedActivity.criteriaExpectationValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaExceedValue: [
				this.passedActivity.criteriaExceedValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
			criteriaOutstandingValue: [
				this.passedActivity.criteriaOutstandingValue,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.NUMBER_PATTERN),
				]),
			],
		});
	
		this.setPassedValueToFrom();
	}
	
	

	get pageTitle() {
		let title: string;
		if (this.passedActivity.operationType === OperationsEnum.Create) {
			title = this.stringKey.CREATE_ACTIVITY;
		} else {
			title = this.stringKey.UPDATE_ACTIVITY;
		}

		return title;
	}

	
	//get frm value
	get sprintId() {
		return this.formGroup.get("sprintId");
	}

	get userId() {
		return this.formGroup.get("userId");
	}

	get goalId() {
		return this.formGroup.get("goalId");
	}

	get activityName() {
		return this.formGroup.get("activityName");
	}

	get activityWeight() {
		return this.formGroup.get("activityWeight");
	}

	get activityResultType() {
		return this.formGroup.get("activityResultType");
	}

	get activityMeasurementType() {
		return this.formGroup.get("activityMeasurementType");
	}

	get criteriaPoorValue() {
		return this.formGroup.get("criteriaPoorValue");
	}

	get criteriaImprovementValue() {
		return this.formGroup.get("criteriaImprovementValue");
	}

	get criteriaExpectationValue() {
		return this.formGroup.get("criteriaExpectationValue");
	}

	get criteriaExceedValue() {
		return this.formGroup.get("criteriaExceedValue");
	}

	get criteriaOutstandingValue() { 
		return this.formGroup.get("criteriaOutstandingValue");
	}

	public findInvalidControls() {
		const invalid = [];
		const controls = this.formGroup.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}

	// submit login
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
				if(this.characteristicsHigherBetter){
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
	
	onToggleBtnChange(event): void {
		const val = this.characteristicsHigherBetter;
		console.log(val);
	}

	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: ActivityModel = {
			userId: this.passedActivity.userId,
			projectId: this.passedActivity.projectId,
			sprintId: this.selectedSprint.sprintId,
			assigneeUserId:this.selectedUser.userId,
			goalId:this.selectedGoal.goalId,
			activityName: form.activityName,
			activityWeight: form.activityWeight,
			activityMeasurementType: this.selectedActivityMeasurementType,
			activityResultType: form.activityResultType,
			criteriaPoorValue: form.criteriaPoorValue,
			criteriaImprovementValue: form.criteriaImprovementValue,
			criteriaExpectationValue: form.criteriaExpectationValue,
			criteriaExceedValue: form.criteriaExceedValue,
			criteriaOutstandingValue: form.criteriaOutstandingValue,
			characteristicsHigherBetter : this.characteristicsHigherBetter ? 1 : 0,
			operationType: this.passedActivity.operationType,
		};

		return model;
	}

	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const activityModel: ActivityModel = this.buildDataModelToPass();
		
		this.projectActivityService
			.projectActivityCrud(activityModel)
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

		this.passedActivity = this.defaultSprintModel;
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

	
	ngOnInit() { 
		this.dropSelectorBackdrop.nativeElement.hidden = true;
	}

	ngOnDestroy() {
		super.ngOnDestroy();
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
		
		switch (dropSelectorType) {
			case ModuleEnum.member:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.member}`;
				this.memberDropSelector.nativeElement.hidden = false;
				this.sprintDropSelector.nativeElement.hidden = true;
				this.goalDropSelector.nativeElement.hidden = true;
				this.activityMeasurementTypeDropSelector.nativeElement.hidden = true;
				break;
			case ModuleEnum.sprint:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.sprint}`;
				this.memberDropSelector.nativeElement.hidden = true;
				this.sprintDropSelector.nativeElement.hidden = false;
				this.goalDropSelector.nativeElement.hidden = true;
				this.activityMeasurementTypeDropSelector.nativeElement.hidden = true;
				break;
			case ModuleEnum.goal:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.goal}`;
				this.memberDropSelector.nativeElement.hidden = true;
				this.sprintDropSelector.nativeElement.hidden = true;
				this.goalDropSelector.nativeElement.hidden = false;
				this.activityMeasurementTypeDropSelector.nativeElement.hidden = true;
				break;
			case ModuleEnum.measurementType:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.measurementType}`;
				this.memberDropSelector.nativeElement.hidden = true;
				this.sprintDropSelector.nativeElement.hidden = true;
				this.goalDropSelector.nativeElement.hidden = true;
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
