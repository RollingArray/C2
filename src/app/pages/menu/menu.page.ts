/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Menu page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 20:47:46 
 * Last modified  : 2021-11-23 16:15:12
 */


import { takeUntil } from 'rxjs/operators';
import { ArrayKey } from "src/app/shared/constant/array.constant";
import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { UserModel } from "src/app/shared/model/user.model";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { DataCommunicationService } from "src/app/shared/service/data-communication.service";
import { DataCommunicationModel } from "src/app/shared/model/data-communication.model";
import { BaseModel } from "src/app/shared/model/base.model";
import { UserProfileComponent } from "src/app/component/user-profile/user-profile.component";
import { MenuController } from "@ionic/angular";
import { UserService } from 'src/app/shared/service/user.service';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { RouteChildrenModel, RouteModel } from 'src/app/shared/model/route.model';
import { AvatarService } from 'src/app/shared/service/avatar.service';
import { LearnMoreComponent } from 'src/app/component/learn-more/learn-more.component';
import { ProjectService } from 'src/app/shared/service/project.service';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { UpdateCheckerService } from 'src/app/shared/service/update-checker.service';

@Component({
	selector: "app-menu",
	templateUrl: "./menu.page.html",
	styleUrls: ["./menu.page.scss"],
})
export class MenuPage extends BaseViewComponent implements OnInit, OnDestroy
{
	/**
	 * User model of menu page
	 */
	private _userModel: UserModel;

	/**
	 * Selected project of menu page
	 */
	private _selectedProject: string;

	/**
	 * Logged in user of menu page
	 */
	private _loggedInUser: string;

	/**
	 * Logged in user id of menu page
	 */
	private _loggedInUserId: string;

	/**
	 * Modal data of menu page
	 */
	private _modalData: ModalData;

	/**
	 * Project id of menu page
	 */
	private _projectId: string;

	/**
	 * Pages  of menu page
	 */
	private _pages = ArrayKey.APP_PRIMARY_ROUTE_PAGES;

	/**
	 * Project model of my project page
	 */
	private _projectModel: ProjectModel;

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean;

	/**
	 * Load route of menu page
	 */
	private _loadRoute: boolean = false;

	
	/**
	 * Gets logged in user
	 */
	public get loggedInUser(): string
	{
		let loggedInUserName = '';
		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				loggedInUserName = data;
			});

		return loggedInUserName;
	}

	/**
	 * Gets pages
	 */
	public get pages(): RouteModel[]
	{
		this._pages.map(eachPage =>
		{
			eachPage.children.map(eachPageChildren =>
			{
				const allowMenuAccess = eachPageChildren.allowAccess.includes(this._projectModel.userTypeId as UserTypeEnum);
				eachPageChildren.allowMenuAccess = allowMenuAccess;
			})
		});
		return this._pages;
	}

	/**
	 * Gets whether has data
	 */
	public get hasData(): boolean
	{
		return this._hasData;
	}

	/**
	 * Sets logged in user
	 */
	public set loggedInUser(value: string)
	{
		this._loggedInUser = value;
	}

	/**
	 * Sets pages
	 */
	public set pages(value: RouteModel[])
	{
		this._pages = value;
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
	 * Gets load route
	 */
	get loadRoute()
	{
		return this._loadRoute;
	}

	get projectModel()
	{
		return this._projectModel;
	}

	/**
	 * User type enum of menu page
	 */
	readonly userTypeEnum =  UserTypeEnum;
	/**
	 * Creates an instance of menu page.
	 * @param injector 
	 * @param alertService 
	 * @param menuController 
	 * @param localStorageService 
	 * @param loadingService 
	 * @param dataCommunicationService 
	 * @param userService 
	 */
	constructor(
		injector: Injector,
		private menuController: MenuController,
		private localStorageService: LocalStorageService,
		private loadingService: LoadingService,
		private dataCommunicationService: DataCommunicationService,
		private userService: UserService,
		private avatarService: AvatarService,
		private projectService: ProjectService,
		private updateCheckerService: UpdateCheckerService
	)
	{
		super(injector);

	}
	
	/**
	 * Registers back button
	 */
	async registerBackButton()
	{
		this.platform.backButton
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () =>
			{
				await this.userService.logout();
			});
	}

	// Lifecycle hook: ngOnInit
	async ngOnInit()
	{
		//
	}

	// Lifecycle hook: ionViewDidEnter
	async ionViewDidEnter()
	{
		this.updateCheckerService.checkIfAppUpdateAvailable();

		await this.passedProjectId();

		await this.getCurrentUser();

		await this.activeUserId();

		await this.ifInvalidSession();

		await this.registerBackButton();

		await this.getSelectProject();

		this.loadData();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	ionViewDidLeave()
	{
		window.location.reload;
	}

	/**
	 * Loads data
	 */
	 async loadData() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this._projectId,
			userId: this._loggedInUserId,
			rawDataKeys: ['projectDetails', 'userType']
		};

		this.projectService
			.getProjectRaw(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						this._projectModel = {
							projectDescription: baseModel.data.projectDetails.data.projectDescription,
							projectId: baseModel.data.projectDetails.data.projectId,
							projectName: baseModel.data.projectDetails.data.projectName,
							userTypeId: baseModel.data.userType.userTypeId,
							userTypeName: baseModel.data.userType.userTypeName
						};

						this._loadRoute = true;
					}
				}
			);
	 }
	
	/**
	 * Passed project id
	 */
	async passedProjectId()
	{
		this.activatedRoute.params
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(params =>
			{
				this._projectId = params.projectId;
			});
	}

	/**
	 * Gets current user
	 */
	async getCurrentUser()
	{

		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				this._loggedInUser = data;
			});

		await this.activeUserId();
	}

	/**
	 * Actives user id
	 * @returns  
	 */
	async activeUserId()
	{
		this.localStorageService
			.getActiveUserId()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				this._loggedInUserId = data;

			});
	}

	/**
	 * Actives user email
	 * @returns  
	 */
	async activeUserEmail()
	{
		let activeUserEmail = "";
		const observable = this.localStorageService
			.getActiveUserEmail()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				activeUserEmail = data;
			});
		return activeUserEmail;
	}

	/**
	 * Gets select project
	 */
	async getSelectProject()
	{

		this.localStorageService
			.getSelectedProject()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: ProjectModel) =>
			{
				this._selectedProject = data.projectName;
			});
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
	 * Presents logout alert confirm
	 */
	async presentLogoutAlertConfirm()
	{
		const alert = await this.alertController.create({
			header: `${StringKey.CONFIRM_ACTION}`,
			message: `${StringKey.CONFIRM_LOG_OUT}`,
			buttons: [
				{
					text: `${StringKey.NO}`,
					cssClass: "primary",
					handler: () => { },
				},
				{
					text: `${StringKey.YES}`,
					handler: async () =>
					{
						//close the side menu and log out
						this.menuController.close();
						await this.userService.logout();
					},
				},
			],
		});
		await alert.present();
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
			this._modalData = data.data;
			if (this._modalData.cancelled)
			{
				//do not refresh the page
			} else
			{
				this._loggedInUser = this.localStorageService.currentActiveUserName$.getValue();
			}
		});

		return await modal.present();
	}

	/**
	 * Goto my projects
	 */
	async gotoMyProjects()
	{
		this.router.navigate(["/my-project"]);
	}

	/**
	 * Goto page
	 * @param routeChildrenModel 
	 */
	async gotoPage(routeChildrenModel: RouteChildrenModel)
	{

		await this.getSelectProject();

		let constructUrl = [];

		constructUrl.push('my-project');
		constructUrl.push(this._projectId);
		constructUrl.push('go');

		for (const url of routeChildrenModel.url)
		{
			constructUrl.push(url);
		}
		this.router.navigate(constructUrl);
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
