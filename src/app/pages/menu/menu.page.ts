import { takeUntil } from 'rxjs/operators';
/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2020-05-04 12:45:05
 * @modify date 2020-05-04 12:45:05
 * @desc [description]
 */
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
import { AlertService } from 'src/app/shared/service/alert.service';
import { ProjectService } from 'src/app/shared/service/project.service';

@Component({
	selector: "app-menu",
	templateUrl: "./menu.page.html",
	styleUrls: ["./menu.page.scss"],
})
export class MenuPage extends BaseViewComponent implements OnInit, OnDestroy {
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
	 * Gets logged in user
	 */
	public get loggedInUser(): string {
		return this._loggedInUser;
	}

	/**
	 * Gets pages
	 */
	public get pages(): RouteModel[] {
		return this._pages;
	}

	/**
	 * Gets whether has data
	 */
	public get hasData(): boolean {
		return this._hasData;
	}

	/**
	 * Sets logged in user
	 */
	public set loggedInUser(value: string) {
		this._loggedInUser = value;
	}

	/**
	 * Sets pages
	 */
	public set pages(value: RouteModel[]) {
		this._pages = value;
	}

	/**
	 * Sets whether has data
	 */
	public set hasData(value: boolean) {
		this._hasData = value;
	}

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
		private alertService: AlertService,
		private menuController: MenuController,
		private localStorageService: LocalStorageService,
		private loadingService: LoadingService,
		private dataCommunicationService: DataCommunicationService,
		private userService: UserService,
		private projectService: ProjectService
	) {
		super(injector);
	}

	/**
	 * Registers back button
	 */
	async registerBackButton() {
		this.platform.backButton
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async () => {
				await this.logout();
			});
	}

	// Lifecycle hook: ngOnInit
	async ngOnInit() {
		//
	}

	// Lifecycle hook: ionViewDidEnter
	async ionViewDidEnter() {

		await this.passedProjectId();

		await this.getCurrentUser();

		await this.activeUserId();

		await this.ifInvalidSession();

		await this.registerBackButton();

		await this.getSelectProject();
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	ionViewDidLeave(){
		window.location.reload;
	}

	/**
	 * Passed project id
	 */
	async passedProjectId() {
		this.activatedRoute.params
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(params => {
				this._projectId = params.projectId;
			});
	}

	/**
	 * Gets current user
	 */
	async getCurrentUser() {

		this.localStorageService
			.getActiveUserName()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				this._loggedInUser = data;
			});

		await this.activeUserId();
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
				this._loggedInUserId = data;
			});
	}

	/**
	 * Actives user email
	 * @returns  
	 */
	async activeUserEmail() {
		let activeUserEmail = "";
		const observable = this.localStorageService
			.getActiveUserEmail()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				activeUserEmail = data;
			});
		return activeUserEmail;
	}

	/**
	 * Gets select project
	 */
	 async getSelectProject() {
		
		this.localStorageService
			.getSelectedProject()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: ProjectModel) => {
				this._selectedProject = data.projectName;
			});
	}

	/**
	 * invalid session
	 */
	async ifInvalidSession() {
		this.dataCommunicationService
			.getMessage()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((dataCommunicationModel: DataCommunicationModel) => {
				//if the api response comes with invalid session, prompt user to re-sign in
				if (dataCommunicationModel.message === "INVALID_SESSION") {
					this.promptUserToLoginInApp();
				}
			});
	}


	/**
	 * Prompts user to login in app
	 */
	async promptUserToLoginInApp() {
		const alert = await this.alertController.create({
			header: `${StringKey.APP_NAME}`,
			message: `${StringKey.TOKEN_EXPIRE}`,
			inputs: [
				{
					name: "userPassword",
					placeholder: `${StringKey.FORM_PLACE_PASSWORD}`,
				},
			],
			buttons: [
				{
					text: `${StringKey.AUTHORIZE_ME}`,
					handler: async (data) => {
						this._userModel = {
							userEmail: await this.activeUserEmail(),
							userPassword: data.userPassword,
							userLoginType: "IN_APP_LOGIN",
							userPlatform: "iOS",
						};

						await this.inAppLogin();
					},
				},
			],
		});
		await alert.present();
	}

	/**
	 * Determines whether app login in
	 */
	async inAppLogin() {
		await this.loadingService.present(
			`${StringKey.API_REQUEST_MESSAGE_1}`
		);
		this.userService
			.signIn(this._userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					//dismiss loader
					await this.loadingService.dismiss();

					// build ser model
					this._userModel = {
						userId: baseModel.userId,
						token: baseModel.token,
					};

					// if success
					if (baseModel.success) {
						//update token
						await this.localStorageService
							.setActiveUser(this._userModel)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async () => {
								await this.presentInAppLoginAlert();
							});
					}
				},
				(error) => {
					this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Presents in app login alert
	 */
	async presentInAppLoginAlert() {
		const alert = await this.alertController.create({
			header: `${StringKey.APP_NAME}`,
			message: `${StringKey.IN_APP_LOGIN_SUCCESS}`,
			buttons: [
				{
					text: `${StringKey.SURE}`,
					handler: () => {
						// no handler required
					},
				},
			],
		});
		await alert.present();
	}

	/**
	 * Presents logout alert confirm
	 */
	async presentLogoutAlertConfirm() {
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
					handler: async () => {
						//close the side menu and log out
						this.menuController.close();
						await this.logout();
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
	async viewProfile() {
		const modal = await this.modalController.create({
			component: UserProfileComponent,
			componentProps: {
				data: {},
			},
		});

		modal.onDidDismiss().then((data) => {
			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				this._loggedInUser = this.localStorageService.currentActiveUserName$.getValue();
			}
		});

		return await modal.present();
	}

	/**
	 * Logouts menu page
	 */
	async logout() {
		await this.loadingService.present(
			`${StringKey.API_REQUEST_MESSAGE_5}`
		);
		await this.localStorageService
			.removeActiveUser()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (data: boolean) => {
				if (data) {
					await this.loadingService
						.dismiss()
						.then(() => window.location.reload());
				} else {
					await this.loadingService.dismiss();
				}
			});
	}

	/**
	 * Goto my projects
	 */
	async gotoMyProjects() {
		this.router.navigate(["/my-project"]);
	}

	/**
	 * Goto page
	 * @param routeChildrenModel 
	 */
	async gotoPage(routeChildrenModel: RouteChildrenModel) {

		await this.getSelectProject();

		let constructUrl = [];

		constructUrl.push('my-project');
		constructUrl.push(this._projectId);
		constructUrl.push('go');

		for (const url of routeChildrenModel.url) {
			constructUrl.push(url);
		}
		this.router.navigate(constructUrl);
	}
}
