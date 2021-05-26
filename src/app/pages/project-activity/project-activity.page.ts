import { AlertService } from 'src/app/shared/service/alert.service';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseModel } from 'src/app/shared/model/base.model';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { ProjectActivityService } from 'src/app/shared/service/project-activity.service';
import { ActivityModel } from 'src/app/shared/model/activity.model';
import { ProjectActivityModel } from 'src/app/shared/model/project-activity.model';
import { CreateEditProjectActivityComponent } from 'src/app/component/create-edit-project-activity/create-edit-project-activity.component';
import { FilterModel } from 'src/app/shared/model/filter.model';
import { CreateEditProjectFilterComponent } from 'src/app/component/create-edit-project-filter/create-edit-project-filter.component';
import { ActivityMeasurementTypeEnum } from 'src/app/shared/enum/activity-measurement-type.enum';


@Component({
	selector: "project-users",
	templateUrl: "./project-activity.page.html",
	styleUrls: ["./project-activity.page.scss"]
})
export class ProjectActivityPage extends BaseViewComponent implements OnInit, OnDestroy {

	/**
	 * Modal data of project activity page
	 */
	private _modalData: ModalData;

	/**
	 * Logged in user of project activity page
	 */
	private _loggedInUser: string;

	/**
	 * Project id of project activity page
	 */
	private _projectId: string;

	/**
	 * Activities  of project activity page
	 */
	private _activities: ActivityModel[];

	/**
	 * Bread crumb of project activity page
	 */
	private _breadCrumb: string[];

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean = false;

	/**
	 * Project activity model of project activity page
	 */
	private _projectActivityModel: ProjectActivityModel;

	/**
	 * Filter model of project activity page
	 */
	private _filterModel: FilterModel;

	/**
	 * Filter exist of project activity page
	 */
	private _filterExist: boolean = false;

	/**
	 * Activity measurement type enum of project activity page
	 */
	activityMeasurementTypeEnum = ActivityMeasurementTypeEnum;
	/**
	 * Sets bread crumb
	 */
	public set breadCrumb(value: string[]) {
		this._breadCrumb = value;
	}

	/**
	 * Gets bread crumb
	 */
	public get breadCrumb(): string[] {
		return this._breadCrumb;
	}

	/**
	 * Sets whether has data
	 */
	public set hasData(value: boolean) {
		this._hasData = value;
	}

	/**
	 * Gets whether has data
	 */
	public get hasData(): boolean {
		return this._hasData;
	}

	/**
	 * Sets activities
	 */
	public set activities(value: ActivityModel[]) {
		this._activities = value;
	}

	/**
	 * Gets activities
	 */
	public get activities(): ActivityModel[] {
		return this._activities;
	}

	/**
	 * Sets project activity model
	 */
	public set projectActivityModel(value: ProjectActivityModel) {
		this._projectActivityModel = value;
	}

	/**
	 * Gets project activity model
	 */
	public get projectActivityModel(): ProjectActivityModel {
		return this._projectActivityModel;
	}

	/**
	 * Sets filter model
	 */
	public set filterModel(value: FilterModel) {
		this._filterModel = value;
	}

	/**
	 * Gets filter model
	 */
	public get filterModel(): FilterModel {
		return this._filterModel;
	}

	/**
	 * Sets filter exist
	 */
	public set filterExist(value: boolean) {
		this._filterExist = value;
	}

	/**
	 * Gets filter exist
	 */
	public get filterExist(): boolean {
		return this._filterExist;
	}

	
	



	// MyProjectPage constructor
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private projectActivityService: ProjectActivityService,
		private loadingService: LoadingService,
		private alertService: AlertService
	) {
		super(injector);
	}

	/**
	 * Actives user id
	 * @returns  
	 */
	async activeUserId() {
		this.localStorageService
			.getActiveUserId()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				this._loggedInUser = data;
			});
	}

	/**
	 * on init
	 */
	ngOnInit() {
		this.activeUserId();
		this._projectId = this.activatedRoute.snapshot.paramMap.get("projectId");
		this.errorMessage = this.stringKey.NO_DATA_ACTIVITY;
		this.getSelectProjectFilter();
	}

	/**
	 * Ions view did enter
	 */
	ionViewDidEnter() {
		this.loadData();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Loads data
	 */
	async loadData() {
		// show loading
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		// make api call
		this.projectActivityService
			.getProjectActivities(this._filterModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					//stop loading
					await this.loadingService.dismiss();

					// check received data
					if (baseModel.success) {

						// attach data to project active model
						this._projectActivityModel = baseModel.data;

						// generate breadcrumb
						await this.generateBreadcrumb();

						// check if the filter exist if data received
						if(this._projectActivityModel.filter){

							// show in ui
							this._filterExist = true;

							// check if any activities returned
							if (this._projectActivityModel.projectActivities.success) {

								// attach activities to returned data
								this._activities = this._projectActivityModel.projectActivities.data

								// removed no data from ui
								this._hasData = true;
							}

							// keep no data ui
							else{
								
								this._hasData = false;
							}
						}

						// keep no filter ui
						else{
							this._filterExist = false;
						}
					}
					else{
						this.errorMessage = baseModel.error.message;
						this.noAccess = true;
					}
				}
			);
	}

	/**
	 * Generates breadcrumb
	 */
	async generateBreadcrumb() {
		let projectName = this._projectActivityModel.projectDetails?.projectName;
		this._breadCrumb = [projectName, this.stringKey.PROJECT_ACTIVITY];
	}

	/**
	 * Adds project activity
	 * @returns  
	 */
	async addProjectActivity() {
		if(!this._filterModel.sprintId){
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_SELECT}`
			);
		}
		else{
			const passedModel: ActivityModel = {
				userId: this._loggedInUser,
				projectId: this._projectId,
				assigneeUserId: this._filterModel.assigneeUserId,
				sprintId: this._filterModel.sprintId,
				goalId: this._filterModel.goalId,
				operationType: `${OperationsEnum.Create}`
			}
			const modal = await this.modalController.create({
				component: CreateEditProjectActivityComponent,
				componentProps: {
					data: passedModel
				}
			});
	
			modal.onDidDismiss().then(data => {
	
				this._modalData = data.data;
				if (this._modalData.cancelled) {
					//do not refresh the page
				} else {
					//load data from network
					this.loadData();
				}
			});
	
			return await modal.present();
		}
	}

	/**
	 * Edits project activity
	 * @param activityModel 
	 * @returns  
	 */
	async editProjectActivity(activityModel: ActivityModel, operation: string) {
		activityModel.userId = this._loggedInUser;
		activityModel.projectId = this._projectId;
		activityModel.operationType = operation;

		const modal = await this.modalController.create({
			component: CreateEditProjectActivityComponent,
			componentProps: {
				data: activityModel
			}
		});

		modal.onDidDismiss().then(data => {
			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				//load data from network
				this.loadData();
			}
		});

		return await modal.present();
	}

	/**
	 * Opens activity options
	 * @param selectedActivity 
	 */
	async openActivityOptions(selectedActivity: ActivityModel) {
		this.router.navigate([selectedActivity.activityId, 'review'], { relativeTo: this.activatedRoute });
	}

	/**
	 * Gets select project filter
	 */
	async getSelectProjectFilter() {
		this.localStorageService
			.getSelectedProjectFilter(this._projectId)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: FilterModel) => {
				this._filterModel = data;
				if(this._filterModel){
					this.loadData();
				}
			});
	}

	/**
	 * Opens filter
	 * @returns  
	 */
	async openFilter(){
		const passedModel: FilterModel = {
			userId: this._loggedInUser,
			projectId: this._projectId
		}
		const modal = await this.modalController.create({
			component: CreateEditProjectFilterComponent,
			componentProps: {
				data: passedModel
			}
		});

		modal.onDidDismiss().then(async data => {

			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				//load data from network
				await this.getSelectProjectFilter();
				//this.loadData();
			}
		});

		return await modal.present();
	}

	
}

