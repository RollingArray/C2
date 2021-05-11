import { AlertService } from 'src/app/shared/service/alert.service';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { BaseModel } from 'src/app/shared/model/base.model';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { Subscription } from 'rxjs';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { ProjectActivityService } from 'src/app/shared/service/project-activity.service';
import { ActivityModel } from 'src/app/shared/model/activity.model';
import { ProjectActivityModel } from 'src/app/shared/model/project-activity.model';
import { CreateEditProjectActivityReviewerComponent } from 'src/app/component/create-edit-project-activity-reviewer/create-edit-project-activity-reviewer.component';
import { FilterModel } from 'src/app/shared/model/filter.model';
import { CreateEditProjectFilterComponent } from 'src/app/component/create-edit-project-filter/create-edit-project-filter.component';
import { ActivityMeasurementTypeEnum } from 'src/app/shared/enum/activity-measurement-type.enum';
import { ActivityReviewerModel } from 'src/app/shared/model/activity-reviewer.model';
import { ProjectActivityReviewerService } from 'src/app/shared/service/project-activity-reviewer.service';
import { CreateEditProjectActivityComponent } from 'src/app/component/create-edit-project-activity/create-edit-project-activity.component';

@Component({
	selector: "project-users",
	templateUrl: "./project-activity-review.page.html",
	styleUrls: ["./project-activity-review.page.scss"]
})
export class ProjectActivityReviewPage extends BaseViewComponent implements OnInit, OnDestroy {

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
	 * Activity id of project activity review page
	 */
	private _activityId: string;

	/**
	 * Activity  of project activity review page
	 */
	private _activity: ActivityModel;

	/**
	 * Activity reviews of project activity review page
	 */
	private _activityReviews: ActivityReviewerModel[];

	/**
	 * Bread crumb of project activity page
	 */
	private _breadCrumb: string[];

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean = false;

	/**
	 * Determines whether reviews data has
	 */
	private _hasReviewsData: boolean = false;

	/**
	 * Project activity model of project activity page
	 */
	private _projectActivityModel: ProjectActivityModel;

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
	 * Sets activity
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Gets activity
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Sets activity reviews
	 */
	public set activityReviews(value: ActivityReviewerModel[]) {
		this._activityReviews = value;
	}

	/**
	 * Gets activity reviews
	 */
	public get activityReviews(): ActivityReviewerModel[] {
		return this._activityReviews;
	}

	/**
	 * Sets activity reviews
	 */
	 public set hasReviewsData(value: boolean) {
		this._hasReviewsData = value;
	}

	/**
	 * Gets activity reviews
	 */
	public get hasReviewsData(): boolean {
		return this._hasReviewsData;
	}

	/**
	 * Creates an instance of project activity review page.
	 * @param injector 
	 * @param localStorageService 
	 * @param projectActivityService 
	 * @param loadingService 
	 * @param alertService 
	 */
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private projectActivityService: ProjectActivityService,
		private loadingService: LoadingService
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
		this._activityId = this.activatedRoute.snapshot.paramMap.get("activityId");
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

		const passedData: ActivityModel = {
			projectId: this._projectId,
			userId: this._loggedInUser,
			activityId: this._activityId
		};

		// make api call
		this.projectActivityService
			.getProjectActivityDetails(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					//stop loading
					await this.loadingService.dismiss();

					// check received data
					if (baseModel.success) {

						// attach data to project active model
						this._projectActivityModel = baseModel.data;

						// removed no data from ui
						this._hasData = true;

						// generate breadcrumb
						await this.generateBreadcrumb();

						// attach activities to returned data
						this._activity = this._projectActivityModel.activityDetails;

						if(this._projectActivityModel.reviewDetails.success){
							this._activityReviews = this._projectActivityModel.reviewDetails.data;

							this._hasReviewsData = true
						}
						else{
							// removed no data from ui
							this._hasReviewsData = false;
						}
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
	 * Edits project activity
	 * @param activityModel 
	 * @returns  
	 */
	 async editProjectActivity(activityModel: ActivityModel) {
		activityModel.userId = this._loggedInUser;
		activityModel.projectId = this._projectId;
		activityModel.operationType = OperationsEnum.Edit;

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
	 * Adds reviewer
	 * @returns  
	 */
	async addReviewer() {
		const passedModel: ActivityModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			activityId: this._activityId,
			operationType: `${OperationsEnum.Create}`
		}
		const modal = await this.modalController.create({
			component: CreateEditProjectActivityReviewerComponent,
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

