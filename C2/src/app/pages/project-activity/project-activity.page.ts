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
import { CreateEditProjectActivityComponent } from 'src/app/component/create-edit-project-activity-criteria/create-edit-project-activity.component';


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
	 * Activitys  of project activity page
	 */
	private _activitys: ActivityModel[];

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
	 * Sets activitys
	 */
	public set activitys(value: ActivityModel[]) {
		this._activitys = value;
	}

	/**
	 * Gets activitys
	 */
	public get activitys(): ActivityModel[] {
		return this._activitys;
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



	// MyProjectPage constructor
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private projectActivityService: ProjectActivityService,
		private loadingService: LoadingService,
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
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this._projectId,
			userId: this._loggedInUser
		};

		this.projectActivityService
			.getProjectActivities(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {

						this._projectActivityModel = baseModel.data;
						await this.generateBreadcrumb();

						if (this._projectActivityModel.projectActivities.success) {
							this._hasData = true;
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
		this._breadCrumb = [projectName, this.stringKey.PROJECT_GOAL];
	}

	/**
	 * Adds project activity
	 * @returns  
	 */
	async addProjectActivity() {
		const passedModel: ActivityModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
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
		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.EDIT + ' ' + this.stringKey.DETAILS,
					icon: this.stringKey.ICON_EDIT,
					handler: () => {
						this.editProjectActivity(selectedActivity, `${OperationsEnum.Edit}`);
					}
				},
				{
					text: this.stringKey.CANCEL,
					icon: this.stringKey.ICON_CANCEL,
					handler: () => {
						//
					}
				}
			]
		});
		await actionSheet.present();
	}
}

