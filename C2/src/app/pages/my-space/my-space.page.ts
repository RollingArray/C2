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
import { ProjectModel } from 'src/app/shared/model/project.model';


@Component({
	selector: "project-my-space",
	templateUrl: "./my-space.page.html",
	styleUrls: ["./my-space.page.scss"]
})
export class MySpacePage extends BaseViewComponent implements OnInit, OnDestroy {

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
	 * My space type of my space page
	 */
	private _mySpaceType : string;

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
	 * Gets page title
	 */
	 get pageTitle() {
		let title: string;
		
		switch (this._mySpaceType) {
			case 'activity':
				title = this.stringKey.MY_ACTIVITY;
				break;
			case 'review':
				title = this.stringKey.MY_REVIEW;
				break;

			default:
				break;
		}

		return title;
	}

	/**
	 * Gets page info
	 */
	get pageInfo() {
		let title: string;
		
		switch (this._mySpaceType) {
			case 'activity':
				title = this.stringKey.ACTIVITY_INFO;
				break;
			case 'review':
				title = this.stringKey.ACTIVITY_REVIEW_INFO;
				break;

			default:
				break;
		}

		return title;
	}

	/**
	 * Gets no data activity
	 */
	get noDataActivity() {
		if(this._mySpaceType == 'activity'){
			return true;
		}
		else{
			return false;
		}
	}

	/**
	 * Gets no data review
	 */
	get noDataReview() {
		if(this._mySpaceType == 'review'){
			return true;
		}
		else{
			return false;
		}
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
		this._mySpaceType = this.activatedRoute.snapshot.paramMap.get("spaceType");
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
	 * Generates breadcrumb
	 */
	 async generateBreadcrumb() {
		let projectName = this._projectActivityModel.projectDetails?.projectName;
		switch (this._mySpaceType) {
			case 'activity':
				this._breadCrumb = [projectName, this.stringKey.MY_ACTIVITY];
				break;
			case 'review':
				this._breadCrumb = [projectName, this.stringKey.MY_REVIEW];
				break;

			default:
				break;
		}
	}

	/**
	 * Loads data
	 */
	async loadData() {
		// show loading
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this._projectId,
			userId: this._loggedInUser,
			assigneeUserId: this._loggedInUser,
			reviewerUserId: this._loggedInUser,
		};
		
		// make api call
		this.projectActivityService
			.getProjectMySpace(passedData, this._mySpaceType)
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

						// check if any activities returned
						if (this._projectActivityModel.projectActivities.success) {

							// attach activities to returned data
							this._activities = this._projectActivityModel.projectActivities.data;
							console.log(this._activities);

							// removed no data from ui
							this._hasData = true;
						}

						// keep no data ui
						else{
							
							this._hasData = false;
						}
					}
				}
			);
	}

	/**
	 * Opens activity options
	 * @param selectedActivity 
	 */
	async openActivityOptions(selectedActivity: ActivityModel) {
		console.log("a");
		this.router.navigate([selectedActivity.activityId, 'review'], { relativeTo: this.activatedRoute });
	}
}

