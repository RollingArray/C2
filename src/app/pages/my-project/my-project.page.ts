/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary My project page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-17 12:29:14 
 * Last modified  : 2021-11-23 16:12:30
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
import { CrudComponentEnum } from 'src/app/shared/enum/crud-component.enum';
import { ToolTipService } from 'src/app/shared/service/tool-tip.service';
import { ProjectUserTypeModel } from 'src/app/shared/model/project-user-type.model';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { UserProfileComponent } from 'src/app/component/user-profile/user-profile.component';
import { AvatarService } from 'src/app/shared/service/avatar.service';
import { UserModel } from 'src/app/shared/model/user.model';
import { LearnMoreComponent } from 'src/app/component/learn-more/learn-more.component';
import { DataCommunicationService } from 'src/app/shared/service/data-communication.service';
import { DataCommunicationModel } from 'src/app/shared/model/data-communication.model';
import { UserService } from 'src/app/shared/service/user.service';
import { UpdateCheckerService } from 'src/app/shared/service/update-checker.service';

@Component({
	selector: "app-my-project",
	templateUrl: "./my-project.page.html",
	styleUrls: ["./my-project.page.scss"]
})
export class MyProjectPage extends BaseViewComponent
{

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
	 * User type enum of my project page
	 */
	readonly userTypeEnum = UserTypeEnum;

	/**
	 * Getter projects
	 * @return {ProjectModel[]}
	 */
	public get projects(): ProjectModel[]
	{
		return this._projects;
	}

	/**
	 * Getter hasData
	 * @return {boolean}
	 */
	public get hasData(): boolean
	{
		return this._hasData;
	}

	/**
	 * Getter loggedInUserName
	 * @return {string}
	 */
	public get loggedInUserName(): string
	{
		let loggedInUserName = '';
		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				loggedInUserName = data;
			});
		return `${this.stringKey.WELCOME}, ${loggedInUserName}`;
	}

	/**
	 * Sets projects
	 */
	public set projects(value: ProjectModel[])
	{
		this._projects = value;
	}

	/**
	 * Sets whether has data
	 */
	public set hasData(value: boolean)
	{
		this._hasData = value;
	}

	/**
	 * Gets avatar
	 */
	get avatar()
	{
		let avatar = '';
		this.localStorageService
			.getActiveUser()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: UserModel) =>
			{
				avatar = this.avatarService.avatar(data.userFirstName);
			});

		return avatar;
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
		public toolTipService: ToolTipService,
		private avatarService: AvatarService,
		private dataCommunicationService: DataCommunicationService,
		private userService: UserService,
		private updateCheckerService: UpdateCheckerService
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this.getCurrentUserId();
		this.loadData();
	}

	/**
	 * Ions view will enter
	 */
	ionViewWillEnter()
	{
		//
	}

	/**
	 * Ions view did leave
	 */
	ionViewDidLeave()
	{
		//
	}

	/**
	 * Ions view will leave
	 */
	ionViewWillLeave()
	{
		//
	}

	/**
	 * Ions view did enter
	 */
	ionViewDidEnter()
	{
		this.updateCheckerService.checkIfAppUpdateAvailable();
		this.ifInvalidSession();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	/**
	 * invalid session
	 */
	 async ifInvalidSession()
	 {
		 this.dataCommunicationService
			 .getMessage()
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe((dataCommunicationModel: DataCommunicationModel) =>
			 {
				 //if the api response comes with invalid session, prompt user to re-sign in
				if (dataCommunicationModel.message === "INVALID_SESSION")
				{
					this.userService.logout();
				}
			 });
	 }
	
	/**
	 * Gets current user
	 */
	async getCurrentUserId()
	{

		this.localStorageService
			.getActiveUserId()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				this._loggedInUser = data;
			});
	}

	/**
	 * Loads data
	 */
	async loadData()
	{
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
			.subscribe(async (baseModel: BaseModel) =>
			{

				//stop loading
				await this.loadingService.dismiss();

				//check if success response case back
				if (baseModel.data.success)
				{

					//assign data to model
					this._hasData = true;
					this._projects = baseModel.data.data;
				}
				else
				{
					this.errorMessage = this.stringKey.NO_DATA_MY_PROJECT;
				}
			});
	}

	/**
	 * Next step
	 * @param projectModel 
	 */
	async nextStep(projectModel: ProjectModel)
	{
		await this.localStorageService
			.setSelectProject(projectModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () =>
			{
				switch (projectModel.projectUserTypeId)
				{
					case UserTypeEnum.Administrator:
						this.commonCrudService.openNextStep(CrudComponentEnum.CRUD_PROJECT, projectModel.projectName);
						break;
					
					case UserTypeEnum.Reviewer:
						this.commonCrudService.openNextStep(CrudComponentEnum.CRUD_PROJECT_REVIEWER, projectModel.projectName);
						break;
					
					case UserTypeEnum.Assignee:
						this.commonCrudService.openNextStep(CrudComponentEnum.CRUD_PROJECT_ASSIGNMENT, projectModel.projectName);
						break;

					default:
						break;
				}
			});
		
	}



	/**
	 * Adds project
	 * @returns  
	 */
	async addProject()
	{

		// build empty project model
		const projectModel: ProjectModel = {
			projectName: '',
			projectDescription: '',
		}

		// open modal view
		this.commonCrudService.openModalWithCreateOperation(projectModel, CrudComponentEnum.CRUD_PROJECT);

		// work with return object, reload data
		this.commonCrudService.loadDataUponModalClose.subscribe(value =>
		{
			if (value === true)
			{
				this.loadData();
			}
		});
	}

	/**
	 * Edits project
	 * @param project 
	 * @returns  
	 */
	async editProject(projectModel: ProjectModel)
	{
		// open modal view
		this.commonCrudService.openModalWithEditOperation(projectModel, CrudComponentEnum.CRUD_PROJECT);

		// work with return object, reload data
		this.commonCrudService.loadDataUponModalClose.subscribe(success =>
		{
			if (success)
			{
				this.loadData();
			}
		});
	}

	/**
	 * Deletes project
	 * @param project 
	 */
	async deleteProject(projectModel: ProjectModel)
	{

		// initiate delete operation
		this.commonCrudService.deleteOperation(projectModel, this.projectService, "crudProject", this.stringKey.ALERT_DELETE_PROJECT);

		// work with return object, reload data
		this.commonCrudService.loadDataUponObjectDeleted.subscribe(success =>
		{
			if (success)
			{
				this.loadData();
			}
		});
	}

	/**
	 * Opens project options
	 * @param selectedProject 
	 */
	async openProjectOptions(selectedProject: ProjectModel)
	{
		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.VIEW + ' ' + this.stringKey.PROJECT_DETAILS,
					icon: this.stringKey.ICON_VIEW,
					handler: () =>
					{
						this.goProjectDetails(selectedProject);
					}
				},
				{
					text: this.stringKey.EDIT + ' ' + this.stringKey.PROJECT_DETAIL,
					icon: this.stringKey.ICON_EDIT,
					handler: () =>
					{
						this.editProject(selectedProject);
					}
				},
				{
					text: this.stringKey.DELETE + ' ' + this.stringKey.PROJECT_DETAIL,
					icon: this.stringKey.ICON_DELETE,
					handler: () =>
					{
						this.deleteProject(selectedProject);
					}
				},
				{
					text: this.stringKey.CANCEL,
					icon: this.stringKey.ICON_CANCEL,
					handler: () =>
					{
						//
					}
				}
			]
		});
		await actionSheet.present();
	}

	/**
	 * Go project details
	 * @param selectedProject 
	 */
	async goProjectDetails(selectedProject: ProjectModel)
	{
		await this.localStorageService
			.setSelectProject(selectedProject)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () =>
			{
				this.router.navigate([selectedProject.projectId, 'go'], { relativeTo: this.activatedRoute });
			});
	}

	/**
	 * Logouts my project page
	 */
	async logout()
	{
		this.commonCrudService.logoutUser();
	}

	/**
	 * Avatars tool tip
	 * @param userTypeEnum 
	 * @param projectName 
	 * @param projectUserTypeModel 
	 * @param event 
	 */
	avatarToolTip(userTypeEnum: UserTypeEnum, projectName: string, projectUserTypeModel: ProjectUserTypeModel, event: any)
	{
		let title = `${projectUserTypeModel.userFirstName} ${projectUserTypeModel.userLastName}`;
		let subTitle = '';

		switch (userTypeEnum)
		{
			case UserTypeEnum.Reviewer:
				subTitle = `
							<b>${projectUserTypeModel.userFirstName} ${projectUserTypeModel.userLastName}</b> 
							${this.stringKey.TOOL_TIP_IS_A} 
							<b>${this.stringKey.TOOL_TIP_IS_REVIEWER}</b>
							${this.stringKey.TOOL_TIP_IN} 
							<b>${projectName}</b> 
							${this.stringKey.TOOL_TIP_PROJECT}`;

				break;
			case UserTypeEnum.Administrator:
				subTitle = `
							<b>${projectUserTypeModel.userFirstName} ${projectUserTypeModel.userLastName}</b> 
							${this.stringKey.TOOL_TIP_IS_AN} 
							<b>${this.stringKey.TOOL_TIP_IS_ADMIN}</b>
							${this.stringKey.TOOL_TIP_IN} 
							<b>${projectName}</b> 
							${this.stringKey.TOOL_TIP_PROJECT}`;

				break;
			case UserTypeEnum.Assignee:
				subTitle = `
							<b>${projectUserTypeModel.userFirstName} ${projectUserTypeModel.userLastName}</b> 
							${this.stringKey.TOOL_TIP_IS_AN} 
							<b>${this.stringKey.TOOL_TIP_IS_ASSIGNEE}</b>
							${this.stringKey.TOOL_TIP_IN} 
							<b>${projectName}</b> 
							${this.stringKey.TOOL_TIP_PROJECT}`;
				break;

			default:
				break;
		}
		this.toolTipService.presentToolTipToast(title, subTitle, event);
	}

	/**
	 * Views profile
	 * @returns  
	 */
	async viewProfile()
	{
		const modal = await this.modalController.create({
			component: UserProfileComponent,
			componentProps: {
				data: {},
			},
		});

		modal.onDidDismiss().then((data) =>
		{
			//
		});

		return await modal.present();
	}

	/**
	 * Opens project options
	 * @param selectedProject 
	 */
	async openLoggedInUserOptions()
	{

		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				{
					text: this.stringKey.MY_PROFILE,
					icon: this.stringKey.ICON_USER,
					handler: () =>
					{
						this.viewProfile();
					}
				},
				{
					text: this.stringKey.LOGOUT,
					icon: this.stringKey.ICON_LOGOUT,
					handler: () =>
					{
						this.logout();
					}
				}
			]
		});
		await actionSheet.present();
	}

	/**
	 * Learns more
	 * @returns  
	 */
	public async learnMore()
	{
		const modal = await this.modalController.create({
			component: LearnMoreComponent,
			componentProps: {
				data: {}
			}
		});

		modal.onDidDismiss().then(data =>
		{
			//
		});

		return await modal.present();
	}
}
