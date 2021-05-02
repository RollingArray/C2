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
import { FilterModel } from 'src/app/shared/model/filter.model';
import { ActivityMeasurementTypeEnum } from "src/app/shared/enum/activity-measurement-type.enum";
import { UserModel } from "src/app/shared/model/user.model";
import { GoalModel } from "src/app/shared/model/goal.model";
import { ModuleEnum } from "src/app/shared/enum/module.enum";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";

@Component({
	selector: "app-create-edit-project-filter",
	templateUrl: "./create-edit-project-filter.component.html",
	styleUrls: ["./create-edit-project-filter.component.scss"],
})
export class CreateEditProjectFilterComponent extends BaseFormComponent
	implements OnInit, OnDestroy {
	
	/**
	 * Filter  of create edit project filter component
	 */
	private _filter: FilterModel;

	/**
	 * Project sprints of create edit project filter component
	 */
	private _projectSprints: SprintModel[];

	/**
	 * Project users of create edit project filter component
	 */
	private _projectUsers: UserModel[];

	/**
	 * Project goals of create edit project filter component
	 */
	private _projectGoals: GoalModel[];

	/**
	 * Selected sprint of create edit project filter component
	 */
	private _selectedSprint: SprintModel;

	/**
	 * Selected user of create edit project filter component
	 */
	private _selectedUser: UserModel = null;

	/**
	 * Selected goal of create edit project filter component
	 */
	private _selectedGoal: GoalModel;

	/**
	 * Modal data of create edit project filter component
	 */
	private _modalData: ModalData;

	/**
	 * Animation duration of create edit project filter component
	 */
	private _animationDuration = 100;

	/**
	 * Transition height of create edit project filter component
	 */
	private _transitionHeight = -356;

	/**
	 * Drop selector title of create edit project filter component
	 */
	private _dropSelectorTitle: string;

	/**
	 * Module enum of create edit project filter component
	 */
	moduleEnum = ModuleEnum;

    /**
     * Getter projectSprints
     * @return {SprintModel[]}
     */
	public get projectSprints(): SprintModel[] {
		return this._projectSprints;
	}

    /**
     * Getter projectUsers
     * @return {UserModel[]}
     */
	public get projectUsers(): UserModel[] {
		return this._projectUsers;
	}

    /**
     * Getter projectGoals
     * @return {GoalModel[]}
     */
	public get projectGoals(): GoalModel[] {
		return this._projectGoals;
	}

    /**
     * Getter selectedSprint
     * @return {SprintModel}
     */
	public get selectedSprint(): SprintModel {
		return this._selectedSprint;
	}

    /**
     * Getter selectedUser
     * @return {UserModel }
     */
	public get selectedUser(): UserModel  {
		return this._selectedUser;
	}

    /**
     * Getter selectedGoal
     * @return {GoalModel}
     */
	public get selectedGoal(): GoalModel {
		return this._selectedGoal;
	}

    /**
     * Setter projectSprints
     * @param {SprintModel[]} value
     */
	public set projectSprints(value: SprintModel[]) {
		this._projectSprints = value;
	}

    /**
     * Setter projectUsers
     * @param {UserModel[]} value
     */
	public set projectUsers(value: UserModel[]) {
		this._projectUsers = value;
	}

    /**
     * Setter projectGoals
     * @param {GoalModel[]} value
     */
	public set projectGoals(value: GoalModel[]) {
		this._projectGoals = value;
	}

    /**
     * Setter selectedSprint
     * @param {SprintModel} value
     */
	public set selectedSprint(value: SprintModel) {
		this._selectedSprint = value;
	}

    /**
     * Setter selectedUser
     * @param {UserModel } value
     */
	public set selectedUser(value: UserModel ) {
		this._selectedUser = value;
	}

    /**
     * Setter selectedGoal
     * @param {GoalModel} value
     */
	public set selectedGoal(value: GoalModel) {
		this._selectedGoal = value;
	}

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
	 * View child of create edit project filter component
	 */
	@ViewChild("dropSelector", { read: ElementRef, static: true}) dropSelector: ElementRef;
	
	/**
	 * View child of create edit project filter component
	 */
	@ViewChild("memberDropSelector", { read: ElementRef, static: true}) memberDropSelector: ElementRef;
	
	/**
	 * View child of create edit project filter component
	 */
	@ViewChild("sprintDropSelector", { read: ElementRef, static: true}) sprintDropSelector: ElementRef;
	
	/**
	 * View child of create edit project filter component
	 */
	@ViewChild("goalDropSelector", { read: ElementRef, static: true}) goalDropSelector: ElementRef;
	
	/**
	 * View child of create edit project filter component
	 */
	@ViewChild("dropSelectorBackdrop", { read: ElementRef, static: true}) dropSelectorBackdrop: ElementRef;
	
	/**
	 * Creates an instance of create edit project filter component.
	 * @param injector 
	 * @param alertService 
	 * @param projectService 
	 * @param loadingService 
	 * @param navParams 
	 * @param animationController 
	 * @param localStorageService 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private projectService: ProjectService,
		private loadingService: LoadingService,
		public navParams: NavParams,
		public animationController: AnimationController,
		private localStorageService: LocalStorageService

	) {
		super(injector);
		this._filter = this.navParams.get("data");
		console.log(this._filter);
		this.buildFrom();
		this.loadData();
	}

	/**
	 * on init
	 */
	 ngOnInit() { 
		 //hide drop selector backdrop
		this.dropSelectorBackdrop.nativeElement.hidden = true;
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	// load data
	async loadData() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this._filter.projectId,
			userId: this._filter.userId
		};

		this.projectService
			.getProjectRaw(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						this._projectSprints = baseModel.data.projectSprints.data;
						this._projectUsers = baseModel.data.projectMembers.data;
						this._projectGoals = baseModel.data.projectGoals.data;
					}
				}
			);
	}

	public chooseUser(passedUser: UserModel){
		this._selectedUser = passedUser;
		this.formGroup.controls.assigneeUserId.setValue(this._selectedUser.userId);
		this.formGroup.controls.userFirstName.setValue(this._selectedUser.userFirstName);
		this.formGroup.controls.userLastName.setValue(this._selectedUser.userLastName);
		this.formGroup.controls.userEmail.setValue(this._selectedUser.userEmail);

		this.closeDropSelector();
	}

	public chooseSprint(passedSprint: SprintModel){
		this._selectedSprint = passedSprint;
		this.formGroup.controls.sprintId.setValue(this._selectedSprint.sprintId);
		this.formGroup.controls.sprintName.setValue(this._selectedSprint.sprintName);
		this.closeDropSelector();
	}

	public chooseGoal(passedGoal: GoalModel){
		this._selectedGoal = passedGoal;
		this.formGroup.controls.goalId.setValue(this._selectedGoal.goalId);
		this.formGroup.controls.goalName.setValue(this._selectedGoal.goalName);
		this.closeDropSelector();
	}

	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			sprintId: [
				this._filter.sprintId,
				this.validators().compose([
					this.validators().required,
				]),
			],
			sprintName: [
				this._filter.sprintName,
				this.validators().compose([
					this.validators().required,
				]),
			],
			assigneeUserId: [
				this._filter.assigneeUserId,
				this.validators().compose([
					this.validators().required,
				]),
			],
			userFirstName: [
				this._filter.userFirstName,
				this.validators().compose([
					this.validators().required,
				]),
			],
			userLastName: [
				this._filter.userLastName,
				this.validators().compose([
					this.validators().required,
				]),
			],
			userEmail: [
				this._filter.userEmail,
				this.validators().compose([
					this.validators().required,
				]),
			],
			goalId: [
				this._filter.goalId,
				this.validators().compose([
					this.validators().required,
				]),
			],
			goalName: [
				this._filter.goalName,
				this.validators().compose([
					this.validators().required,
				]),
			],
		});
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

	/**
	 * Finds invalid controls
	 * @returns  
	 */
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
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			this.submitData();
		}
	}

	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: FilterModel = {
			projectId: this._filter.projectId,
			userId: this._filter.userId,
			assigneeUserId:this._selectedUser.userId,
			userFirstName:this._selectedUser.userFirstName,
			userLastName:this._selectedUser.userLastName,
			userEmail:this._selectedUser.userEmail,
			sprintId: this._selectedSprint.sprintId,
			sprintName: this._selectedSprint.sprintName,
			goalId:this._selectedGoal.goalId,
			goalName:this._selectedGoal.goalName,
		};

		return model;
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const _filterModel: FilterModel = this.buildDataModelToPass();
		
		await this.localStorageService
			.setSelectedProjectFilter(_filterModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () => {
				
				//dismiss modal
				this._modalData = {
					cancelled: false,
					operationSubmitted: true
				};
				this.dismissModal();
			});
	}

	/**
	 * Cancels modal
	 */
	cancelModal() {
		this._modalData = {
			cancelled: true,
			operationSubmitted: false
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
		
		switch (dropSelectorType) {
			case ModuleEnum.member:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.member}`;
				this.memberDropSelector.nativeElement.hidden = false;
				this.sprintDropSelector.nativeElement.hidden = true;
				this.goalDropSelector.nativeElement.hidden = true;
				break;
			case ModuleEnum.sprint:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.sprint}`;
				this.memberDropSelector.nativeElement.hidden = true;
				this.sprintDropSelector.nativeElement.hidden = false;
				this.goalDropSelector.nativeElement.hidden = true;
				break;
			case ModuleEnum.goal:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.goal}`;
				this.memberDropSelector.nativeElement.hidden = true;
				this.sprintDropSelector.nativeElement.hidden = true;
				this.goalDropSelector.nativeElement.hidden = false;
				break;
			case ModuleEnum.measurementType:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.measurementType}`;
				this.memberDropSelector.nativeElement.hidden = true;
				this.sprintDropSelector.nativeElement.hidden = true;
				this.goalDropSelector.nativeElement.hidden = true;
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
