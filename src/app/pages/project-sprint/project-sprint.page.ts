/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Project sprint page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-25 15:11:50 
 * Last modified  : 2021-12-27 18:05:48
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
import { ProjectSprintService } from 'src/app/shared/service/project-sprint.service';
import { SprintModel } from 'src/app/shared/model/sprint.model';
import { ProjectSprintModel } from 'src/app/shared/model/project-sprint.model';
import { CommonCrudService } from 'src/app/shared/service/common-crud.service';
import { CrudComponentEnum } from 'src/app/shared/enum/crud-component.enum';
import { SprintStatusEnum } from 'src/app/shared/enum/sprint-status.enum';


@Component({
	selector: "project-users",
	templateUrl: "./project-sprint.page.html",
	styleUrls: ["./project-sprint.page.scss"]
})
export class ProjectSprintPage extends BaseViewComponent implements OnInit, OnDestroy {

	/**
	 * Modal data of project sprint page
	 */
	private _modalData: ModalData;

	/**
	 * Logged in user of project sprint page
	 */
	private _loggedInUser: string;

	/**
	 * Project id of project sprint page
	 */
	private _projectId: string;

	/**
	 * Sprints  of project sprint page
	 */
	private _sprints: SprintModel[];

	/**
	 * Bread crumb of project sprint page
	 */
	private _breadCrumb: string[];

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean = false;

	/**
	 * Project sprint model of project sprint page
	 */
	private _projectSprintModel: ProjectSprintModel;

	/**
	 * Sprint status enum of project sprint page
	 */
	readonly sprintStatusEnum = SprintStatusEnum;

	/**
	 * Operations enum of project sprint page
	 */
	readonly operationsEnum = OperationsEnum;

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
	 * Sets sprints
	 */
	public set sprints(value: SprintModel[]) {
		this._sprints = value;
	}

	/**
	 * Gets sprints
	 */
	public get sprints(): SprintModel[] {
		return this._sprints;
	}

	/**
	 * Sets project sprint model
	 */
	public set projectSprintModel(value: ProjectSprintModel) {
		this._projectSprintModel = value;
	}

	/**
	 * Gets project sprint model
	 */
	public get projectSprintModel(): ProjectSprintModel {
		return this._projectSprintModel;
	}

	// MyProjectPage constructor
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private projectSprintService: ProjectSprintService,
		private loadingService: LoadingService,
		public commonCrudService: CommonCrudService<SprintModel>,
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
		this.errorMessage = this.stringKey.HOLD_TIGHT;
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

		this.projectSprintService
			.getProjectSprints(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						
						this._projectSprintModel = baseModel.data;
						await this.generateBreadcrumb();

						if(this._projectSprintModel.projectSprints.success){
							this._hasData = true;
						}
						else
						{
							this._hasData = false;
							this.errorMessage = this.stringKey.NO_DATA_SPRINT;
							
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
		let projectName = this._projectSprintModel.projectDetails?.projectName;
		this._breadCrumb = [projectName, this.stringKey.PROJECT_SPRINT];
	}

	/**
	 * Adds project sprint
	 */
	async addProjectSprint() {

		// build empty project model
		const passedModel: SprintModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			sprintStatus: SprintStatusEnum.Future,
			operationType: `${OperationsEnum.Create}`
		}

		// open modal view
		this.commonCrudService.openModalWithCreateOperation(passedModel, CrudComponentEnum.CRUD_SPRINT);

		// work with return object, reload data
		this.commonCrudService.loadDataUponModalClose.subscribe(value => {
			if (value === true) {
				this.loadData();
			}
		});
	}

	/**
	 * Edits project sprint
	 * @param sprintModel 
	 */
	async editProjectSprint(sprintModel: SprintModel)
	{
		const updatedSprint: SprintModel = {
			...sprintModel,
			userId: this._loggedInUser,
			projectId: this._projectId,
			operationType: `${OperationsEnum.Delete}`
		};

		// open modal view
		this.commonCrudService.openModalWithEditOperation(updatedSprint, CrudComponentEnum.CRUD_SPRINT);

		// work with return object, reload data
		this.commonCrudService.loadDataUponModalClose.subscribe(success => {
			if (success) {
				this.loadData();
			}
		});
	}

	/**
	 * Unders the hood edit project sprint
	 * @param sprintModel 
	 * @param sprintStatus 
	 */
	async underTheHoodEditProjectSprint(sprintModel: SprintModel, sprintStatus: SprintStatusEnum, operation: OperationsEnum) {

		const updatedSprint: SprintModel = {
			...sprintModel,
			userId: this._loggedInUser,
			sprintStatus: sprintStatus,
			projectId: this._projectId,
			operationType: operation
		};
		 
		// initiate delete operation
		this.commonCrudService.underTheHoodEditOperation(updatedSprint, this.projectSprintService, CrudComponentEnum.CRUD_SPRINT, this.stringKey.CHANGE_SPRINT_STATUS, operation);
		
		// work with return object, reload data
		this.commonCrudService.loadDataUponObjectDeleted.subscribe(success => {
			if (success) {
				this.loadData();
			}
		});
	 }
	
	/**
	 * Deletes project sprint
	 * @param sprintModel 
	 */
	async deleteProjectSprint(sprintModel: SprintModel) {

		const updatedSprint: SprintModel = {
			...sprintModel,
			userId: this._loggedInUser,
			projectId: this._projectId,
			operationType: `${OperationsEnum.Delete}`
		};
		 
		// initiate delete operation
		this.commonCrudService.deleteOperation(sprintModel, this.projectSprintService, CrudComponentEnum.CRUD_SPRINT, this.stringKey.ALERT_DELETE_PROJECT_SPRINT);
		
		// work with return object, reload data
		this.commonCrudService.loadDataUponObjectDeleted.subscribe(success => {
			if (success) {
				this.loadData();
			}
		});
	}
	
	/**
	 * Opens goal options
	 * @param selectedSprint 
	 */
	async openSprintOptions(selectedSprint: SprintModel) {
		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.EDIT + ' ' + this.stringKey.DETAILS,
					icon: this.stringKey.ICON_EDIT,
					handler: () => {
						this.editProjectSprint(selectedSprint);
					}
				},
				{
					text: this.stringKey.DELETE + ' ' + this.stringKey.DETAILS,
					icon: this.stringKey.ICON_DELETE,
					handler: () => {
						this.deleteProjectSprint(selectedSprint);
					}
				},
				{
					text: this.stringKey.NEXT,
					icon: this.stringKey.ICON_HELP,
					handler: () => {
						this.commonCrudService.openNextStep(CrudComponentEnum.CRUD_SPRINT, selectedSprint.sprintName);
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

