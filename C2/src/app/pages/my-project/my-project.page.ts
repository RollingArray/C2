/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary My project page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-17 12:29:14 
 * Last modified  : 2021-05-17 15:31:13
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, Injector } from '@angular/core';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { BaseModel } from 'src/app/shared/model/base.model';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { ProjectService } from 'src/app/shared/service/project.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { CreateEditProjectComponent } from 'src/app/component/create-edit-project/create-edit-project.component';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: "app-my-project",
	templateUrl: "./my-project.page.html",
	styleUrls: ["./my-project.page.scss"]
})
export class MyProjectPage extends BaseViewComponent {

	/**
	 * Project model of my project page
	 */
	private _projectModel: ProjectModel;

	/**
	 * Projects  of my project page
	 */
	private _projects: ProjectModel[];

	/**
	 * Modal data of my project page
	 */
	private _modalData: ModalData;

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
		public localStorageService: LocalStorageService
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
		this._projectModel = {
			userId: this._loggedInUser
		};

		//send api response
		this.projectService
			.getUserProject(this._projectModel)
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
				else{
					this.errorMessage = this.stringKey.NO_DATA_MY_PROJECT;
				}
			});
	}

	/**
	 * Adds project
	 * @returns  
	 */
	async addProject() {
		this.buildDataModelToPass();
		const modal = await this.modalController.create({
			component: CreateEditProjectComponent,
			componentProps: {
				data: this._projectModel
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
	 * Edits project
	 * @param project 
	 * @returns  
	 */
	async editProject(project: ProjectModel) {
		project.userId = this._loggedInUser;
		project.operationType = `${OperationsEnum.Edit}`;

		const modal = await this.modalController.create({
			component: CreateEditProjectComponent,
			componentProps: {
				data: project
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
	 * Builds data model to pass
	 */
	private buildDataModelToPass() {
		this._projectModel.userId = this._loggedInUser;
		this._projectModel.projectName = '';
		this._projectModel.projectDescription = '';
		this._projectModel.operationType = `${OperationsEnum.Create}`;
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
	 * Deletes project
	 * @param project 
	 */
	async deleteProject(project: ProjectModel) {
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.ALERT_DELETE_PROJECT,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {

						//loading start
						this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

						//build data
						const crudProject: ProjectModel = {
							userId: this._loggedInUser,
							projectId: project.projectId,
							projectName: project.projectName,
							projectDescription: project.projectDescription,
							operationType: `${OperationsEnum.Delete}`,
						}

						//send api
						this.projectService
							.crudProject(crudProject)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(
								async (baseModel: BaseModel) => {

									// dismiss loader
									await this.loadingService.dismiss();

									// check is model return success
									if (baseModel.success) {

										// show toast
										await this.presentToast(baseModel.message);

										// load data to ui
										await this.loadData();
									}
								},

								// if error
								async (error) => {
									// dismiss loader
									await this.loadingService.dismiss();
								}
							);
					}
				}
			]
		});

		// present alert
		await alertController.present();
	}

	/**
	 * Logouts my project page
	 */
	async logout() {

		// open alert
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.CONFIRM_LOG_OUT,
			buttons: [
				
				// if user cancel
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, 

				// if user want to proceed
				{
					text: this.stringKey.YES,
					handler: async () => {

						// start loader
						await this.loadingService.present(
							`${this.stringKey.API_REQUEST_MESSAGE_5}`
						);

						// remove any user data from local storage
						await this.localStorageService
							.removeActiveUser()
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async (data: boolean) => {

								// on success
								if (data) {

									// dismiss loader
									await this.loadingService
										.dismiss()
										.then(() => {

											// reload window to reset any in memory cached data reflected over UI
											window.location.reload();
									});

								} else {
									// dismiss loader
									await this.loadingService.dismiss();
								}
							});
					}
				}
			]
		});

		// present alert
		await alertController.present();
	}
}
