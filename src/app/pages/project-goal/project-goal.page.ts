/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Project goal page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-08-09 20:29:05 
 * Last modified  : 2021-08-09 20:29:23
 */


import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { BaseModel } from 'src/app/shared/model/base.model';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { ProjectGoalService } from 'src/app/shared/service/project-goal.service';
import { GoalModel } from 'src/app/shared/model/goal.model';
import { ProjectGoalModel } from 'src/app/shared/model/project-goal.model';
import { CrudComponentEnum } from 'src/app/shared/enum/crud-component.enum';
import { CommonCrudService } from 'src/app/shared/service/common-crud.service';


@Component({
	selector: "project-users",
	templateUrl: "./project-goal.page.html",
	styleUrls: ["./project-goal.page.scss"]
})
export class ProjectGoalPage extends BaseViewComponent implements OnInit, OnDestroy {

	/**
	 * Modal data of project goal page
	 */
	private _modalData: ModalData;

	/**
	 * Logged in user of project goal page
	 */
	private _loggedInUser: string;

	/**
	 * Project id of project goal page
	 */
	private _projectId: string;

	/**
	 * Goals  of project goal page
	 */
	private _goals: GoalModel[];

	/**
	 * Bread crumb of project goal page
	 */
	private _breadCrumb: string[];

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean = false;

	/**
	 * Project goal model of project goal page
	 */
	private _projectGoalModel: ProjectGoalModel;

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
	 * Sets goals
	 */
	public set goals(value: GoalModel[]) {
		this._goals = value;
	}

	/**
	 * Gets goals
	 */
	public get goals(): GoalModel[] {
		return this._goals;
	}

	/**
	 * Sets project goal model
	 */
	public set projectGoalModel(value: ProjectGoalModel) {
		this._projectGoalModel = value;
	}

	/**
	 * Gets project goal model
	 */
	public get projectGoalModel(): ProjectGoalModel {
		return this._projectGoalModel;
	}

	

	// MyProjectPage constructor
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private projectGoalService: ProjectGoalService,
		private loadingService: LoadingService,
		public commonCrudService: CommonCrudService<GoalModel>,
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
		this.errorMessage = this.stringKey.NO_DATA_GOAL;
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

		this.projectGoalService
			.getProjectGoals(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						
						this._projectGoalModel = baseModel.data;
						await this.generateBreadcrumb();

						if(this._projectGoalModel.projectGoals.success){
							this._hasData = true;
						}
						else{
							this.errorMessage = this.stringKey.NO_DATA_GOAL;
						}
					}
					else{
						this.errorMessage = baseModel.error.message;
					}

				}
			);
	}

	/**
	 * Generates breadcrumb
	 */
	 async generateBreadcrumb(){
		let projectName = this._projectGoalModel.projectDetails?.projectName;
		this._breadCrumb = [projectName, this.stringKey.PROJECT_GOAL];
	}

	/**
	 * Adds project
	 * @returns  
	 */
	 async addProjectGoal() {

		// build empty project model
		const passedModel: GoalModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			operationType: `${OperationsEnum.Create}`
		}

		// open modal view
		this.commonCrudService.openModalWithCreateOperation(passedModel, CrudComponentEnum.CRUD_GOAL);

		// work with return object, reload data
		this.commonCrudService.loadDataUponModalClose.subscribe(value => {
			if (value === true) {
				this.loadData();
			}
		});
	}

	/**
	 * Edits project
	 * @param project 
	 * @returns  
	 */
	async editProjectGoal(goalModel: GoalModel)
	{
		goalModel.userId = this._loggedInUser;
		goalModel.projectId = this._projectId;
		goalModel.operationType = `${OperationsEnum.Delete}`;

		// open modal view
		this.commonCrudService.openModalWithEditOperation(goalModel, CrudComponentEnum.CRUD_GOAL);

		// work with return object, reload data
		this.commonCrudService.loadDataUponModalClose.subscribe(success => {
			if (success) {
				this.loadData();
			}
		});
	}

	/**
	 * Deletes project
	 * @param project 
	 */
	 async deleteProjectGoal(goalModel: GoalModel) {

		goalModel.userId = this._loggedInUser;
		goalModel.projectId = this._projectId;
		goalModel.operationType = `${OperationsEnum.Edit}`;
		 
		// initiate delete operation
		this.commonCrudService.deleteOperation(goalModel, this.projectGoalService, CrudComponentEnum.CRUD_GOAL, this.stringKey.ALERT_DELETE_PROJECT_GOAL);
		
		// work with return object, reload data
		this.commonCrudService.loadDataUponObjectDeleted.subscribe(success => {
			if (success) {
				this.loadData();
			}
		});
	 }
	
	/**
	 * Opens goal options
	 * @param selectedGoal 
	 */
	async openGoalOptions(selectedGoal: GoalModel) {
		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.EDIT + ' ' + this.stringKey.DETAILS,
					icon: this.stringKey.ICON_EDIT,
					handler: () => {
						this.editProjectGoal(selectedGoal);
					}
				},
				{
					text: this.stringKey.DELETE + ' ' + this.stringKey.DETAILS,
					icon: this.stringKey.ICON_EDIT,
					handler: () => {
						this.deleteProjectGoal(selectedGoal);
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

