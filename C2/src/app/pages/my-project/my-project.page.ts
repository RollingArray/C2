/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary My project page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-17 12:29:14 
 * Last modified  : 2021-05-18 09:55:27
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, Injector } from '@angular/core';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { BaseModel } from 'src/app/shared/model/base.model';
import { ProjectService } from 'src/app/shared/service/project.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { CommonCrudService } from 'src/app/shared/service/common-crud.service';
import { CredComponentEnum } from 'src/app/shared/enum/crud-component.enum';

@Component({
	selector: "app-my-project",
	templateUrl: "./my-project.page.html",
	styleUrls: ["./my-project.page.scss"]
})
export class MyProjectPage extends BaseViewComponent {

	/**
	 * Projects  of my project page
	 */
	private _projects: ProjectModel[];

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean = false;

	/**
	 * Logged in user of my project page
	 */
	private _loggedInUser: string;

	/**
	 * Logged in user name of my project page
	 */
	private _loggedInUserName: string;

	/**
	 * Getter projects
	 * @return {ProjectModel[]}
	 */
	public get projects(): ProjectModel[] {
		return this._projects;
	}

	/**
	 * Getter hasData
	 * @return {boolean}
	 */
	public get hasData(): boolean {
		return this._hasData;
	}

	/**
	 * Getter loggedInUserName
	 * @return {string}
	 */
	public get loggedInUserName(): string {
		return `${this.stringKey.WELCOME}, ${this._loggedInUserName}`;
	}

	/**
	 * Sets projects
	 */
	public set projects(value: ProjectModel[]) {
		this._projects = value;
	}

	/**
	 * Sets whether has data
	 */
	public set hasData(value: boolean) {
		this._hasData = value;
	}

	/**
	 * Creates an instance of my project page.
	 * @param injector 
	 * @param projectService 
	 * @param loadingService 
	 * @param localStorageService 
	 */
	constructor(
		injector: Injector,
		private projectService: ProjectService,
		public loadingService: LoadingService,
		public localStorageService: LocalStorageService,
		public commonCrudService: CommonCrudService<ProjectModel>,
	) {
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit() {
		this.getCurrentUserId();
		this.getCurrentUserName();
		this.loadData();
	}

	/**
	 * Ions view will enter
	 */
	ionViewWillEnter() {
		//
	}

	/**
	 * Ions view did leave
	 */
	ionViewDidLeave() {
		//
	}

	/**
	 * Ions view will leave
	 */
	ionViewWillLeave() {
		//
	}

	/**
	 * Ions view did enter
	 */
	ionViewDidEnter() {
		//
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Gets current user
	 */
	async getCurrentUserId() {

		this.localStorageService
			.getActiveUserId()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				this._loggedInUser = data;
			});
	}

	/**
	 * Gets current user
	 */
	async getCurrentUserName() {

		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				this._loggedInUserName = data;
			});
	}

	/**
	 * Loads data
	 */
	async loadData() {
		//loading start
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_1}`);

		//build pass post data
		const projectModel: ProjectModel = {
			userId: this._loggedInUser
		};

		//send api response
		this.projectService
			.getUserProject(projectModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (baseModel: BaseModel) => {

				//stop loading
				await this.loadingService.dismiss();

				//check if success response case back
				if (baseModel.data.success) {

					//assign data to model
					this._hasData = true;
					this._projects = baseModel.data.data;
				}
				else {
					this.errorMessage = this.stringKey.NO_DATA_MY_PROJECT;
				}
			});
	}

	/**
	 * Adds project
	 * @returns  
	 */
	async addProject() {

		// build empty project model
		const projectModel: ProjectModel = {
			projectName : '',
			projectDescription : '',
		}

		// open modal view
		this.commonCrudService.openModalWithCreateOperation(projectModel, CredComponentEnum.CRUD_PROJECT);

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
	async editProject(projectModel: ProjectModel) {
		// open modal view
		this.commonCrudService.openModalWithEditOperation(projectModel, CredComponentEnum.CRUD_PROJECT);

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
	 async deleteProject(projectModel: ProjectModel) {

		// initiate delete operation
		this.commonCrudService.deleteOperation(projectModel, this.projectService, "crudProject", this.stringKey.ALERT_DELETE_PROJECT);
		
		// work with return object, reload data
		this.commonCrudService.loadDataUponObjectDeleted.subscribe(success => {
			if (success) {
				this.loadData();
			}
		});
	}

	/**
	 * Opens project options
	 * @param selectedProject 
	 */
	async openProjectOptions(selectedProject: ProjectModel) {

		await this.localStorageService
			.setSelectProject(selectedProject)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () => {

			});

		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.VIEW + ' ' + this.stringKey.PROJECT_DETAILS,
					icon: this.stringKey.ICON_VIEW,
					handler: () => {
						this.router.navigate([selectedProject.projectId, 'go'], { relativeTo: this.activatedRoute });
					}
				},
				{
					text: this.stringKey.EDIT + ' ' + this.stringKey.PROJECT_DETAIL,
					icon: this.stringKey.ICON_EDIT,
					handler: () => {
						this.editProject(selectedProject);
					}
				},
				{
					text: this.stringKey.DELETE + ' ' + this.stringKey.PROJECT_DETAIL,
					icon: this.stringKey.ICON_DELETE,
					handler: () => {
						this.deleteProject(selectedProject);
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

	

	/**
	 * Logouts my project page
	 */
	async logout() {
		this.commonCrudService.logoutUser();
	}
}
