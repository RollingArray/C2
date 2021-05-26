import { Component, OnInit, OnDestroy, Injector, ElementRef, ViewChild } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { SprintModel } from "src/app/shared/model/sprint.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { AnimationController, NavParams } from "@ionic/angular";
import { takeUntil } from "rxjs/operators";
import { BaseModel } from "src/app/shared/model/base.model";
import { StringKey } from 'src/app/shared/constant/string.constant';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { ProjectService } from 'src/app/shared/service/project.service';
import { FilterModel } from 'src/app/shared/model/filter.model';
import { UserModel } from "src/app/shared/model/user.model";
import { GoalModel } from "src/app/shared/model/goal.model";
import { ModuleEnum } from "src/app/shared/enum/module.enum";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { ActivityModel } from "src/app/shared/model/activity.model";
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { ProjectActivityReviewerService } from "src/app/shared/service/project-activity-reviewer.service";

@Component({
	selector: "app-create-edit-project-activity-reviewer",
	templateUrl: "./create-edit-project-activity-reviewer.component.html",
	styleUrls: ["./create-edit-project-activity-reviewer.component.scss"],
})
export class CreateEditProjectActivityReviewerComponent extends BaseFormComponent
	implements OnInit, OnDestroy {
	
	/**
	 * Filter  of create edit project filter component
	 */
	private _activityReviewer: ActivityReviewerModel;

	/**
	 * Project users of create edit project filter component
	 */
	private _projectReviewers: UserModel[];

	/**
	 * Selected user of create edit project filter component
	 */
	private _selectedUser: UserModel = null;

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
     * Getter projectReviewers
     * @return {UserModel[]}
     */
	public get projectReviewers(): UserModel[] {
		return this._projectReviewers;
	}

    /**
     * Getter selectedUser
     * @return {UserModel }
     */
	public get selectedUser(): UserModel  {
		return this._selectedUser;
	}

    /**
     * Setter projectReviewers
     * @param {UserModel[]} value
     */
	public set projectReviewers(value: UserModel[]) {
		this._projectReviewers = value;
	}

    /**
     * Setter selectedUser
     * @param {UserModel } value
     */
	public set selectedUser(value: UserModel ) {
		this._selectedUser = value;
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
	@ViewChild("reviewerDropSelector", { read: ElementRef, static: true}) reviewerDropSelector: ElementRef;
	
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
		private projectActivityReviewerService: ProjectActivityReviewerService,
		private loadingService: LoadingService,
		public navParams: NavParams,
		public animationController: AnimationController,
		private localStorageService: LocalStorageService

	) {
		super(injector);
		this._activityReviewer = this.navParams.get("data");
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
			projectId: this._activityReviewer.projectId,
			userId: this._activityReviewer.userId,
			rawDataKeys: ['projectReviewers']
		};

		this.projectService
			.getProjectRaw(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						this._projectReviewers = baseModel.data.projectReviewers.data;
					}
				}
			);
	}

	/**
	 * Chooses user
	 * @param passedUser 
	 */
	public chooseUser(passedUser: UserModel){
		this._selectedUser = passedUser;
		this.formGroup.controls.reviewerUserId.setValue(this._selectedUser.userId);
		
		this.closeDropSelector();
	}

	/**
	 * Builds from
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			reviewerUserId: [
				this._activityReviewer.reviewerUserId,
				this.validators().compose([
					this.validators().required,
				]),
			],
		});
	}
	
	/**
	 * Gets user id
	 */
	get userId() {
		return this.formGroup.get("userId");
	}

	/**
	 * Submits create edit project activity reviewer component
	 */
	async submit() {
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			this.submitData();
		}
	}

	/**
	 * Builds data model to pass
	 * @returns  
	 */
	private buildDataModelToPass() {
		// build data userModel
		const form = this.formGroup.value;
		const model: FilterModel = {
			projectId: this._activityReviewer.projectId,
			userId: this._activityReviewer.userId,
			activityId: this._activityReviewer.activityId,
			reviewerUserId:this._selectedUser.userId,
			operationType: this._activityReviewer.operationType,
		};

		return model;
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		const passedData: ActivityReviewerModel = this.buildDataModelToPass();

		this.projectActivityReviewerService
			.projectActivityReviewerCrud(passedData)
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
			case ModuleEnum.reviewer:
				this._dropSelectorTitle = `${this.stringKey.SELECT} ${ModuleEnum.reviewer}`;
				this.reviewerDropSelector.nativeElement.hidden = false;
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
