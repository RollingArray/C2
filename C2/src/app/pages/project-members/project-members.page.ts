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
import { ProjectUserTypeModel } from 'src/app/shared/model/project-user-type.model';
import { ProjectService } from 'src/app/shared/service/project.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { takeUntil } from 'rxjs/operators';
import { PlatformHelper } from 'src/app/shared/helper/platform.helper';
import { CreateEditProjectUserComponent } from 'src/app/component/create-edit-project-user/create-edit-project-user.component';
import { ProjectMemberService } from 'src/app/shared/service/project-member.service';
import { UserModel } from 'src/app/shared/model/user.model';
import { ProjectMemberModel } from 'src/app/shared/model/project-member.model';


@Component({
	selector: "project-users",
	templateUrl: "./project-members.page.html",
	styleUrls: ["./project-members.page.scss"]
})
export class ProjectMembersPage extends BaseViewComponent implements OnInit, OnDestroy {

	/**
	 * Modal data of project members page
	 */
	private _modalData: ModalData;

	/**
	 * Logged in user of project members page
	 */
	private _loggedInUser: string;

	/**
	 * Project id of project members page
	 */
	private _projectId: string;

	/**
	 * Project model of project members page
	 */
	private _projectMemberModel: ProjectMemberModel;

	/**
	 * Project model of project members page
	 */
	 userTypeEnum =  UserTypeEnum;

	/**
	 * Bread crumb of project members page
	 */
	private _breadCrumb : string[];

	/**
	 * Determines whether app is
	 */
	private _isApp = true;
	/**
	 * Gets project member model
	 */
	public get projectMemberModel(): ProjectMemberModel {
		return this._projectMemberModel;
	}

	/**
	 * Sets project member model
	 */
	public set projectMemberModel(value: ProjectMemberModel) {
		this._projectMemberModel = value;
	}

	/**
	 * Gets bread crumb
	 */
	public get breadCrumb(): string[] {
		return this._breadCrumb;
	}

	/**
	 * Sets bread crumb
	 */
	public set breadCrumb(value: string[]) {
		this._breadCrumb = value;
	}
	

	/**
	 * Creates an instance of project members page.
	 * @param injector 
	 * @param localStorageService 
	 * @param projectMemberService 
	 * @param loadingService 
	 * @param platformHelper 
	 * @param alertService 
	 */
	constructor(
		injector: Injector,
		public localStorageService: LocalStorageService,
		private projectMemberService: ProjectMemberService,
		private loadingService: LoadingService,
		private platformHelper: PlatformHelper,
		private alertService: AlertService
	) {
		super(injector);
	}

	// Lifecycle hook: ngOnInit
	async ngOnInit() {
		await this.activeUserId();
		this._projectId = this.activatedRoute.snapshot.paramMap.get("projectId");
		this._isApp = await this.platformHelper.isApp();
		

	}

	// Lifecycle hook: ionViewDidEnter
	async ionViewDidEnter() {
		
		await this.loadData();
	}

	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Generates breadcrumb
	 */
	async generateBreadcrumb(){
		let projectName = this._projectMemberModel.projectDetails?.projectName;
		this._breadCrumb = [projectName, this.stringKey.PROJECT_MEMBER];
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

	// load data
	async loadData() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		const passedData: ProjectModel = {
			projectId: this._projectId,
			userId: this._loggedInUser
		};

		console.log(passedData);

		this.projectMemberService
			.getProjectMembers(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success) {
						this._projectMemberModel = baseModel.data;
						await this.generateBreadcrumb();
					}
					else{
						this.errorMessage = baseModel.error.message;
					}
				}
			);
	}

	async changeUserRole(projectUserType: ProjectUserTypeModel, userType: string) {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build data userModel
		const passedData: ProjectModel = {
			userId: this._loggedInUser,
			addedUserId: projectUserType.userId,
			projectId: projectUserType.projectId,
			userTypeId: userType,
			operationType: `${OperationsEnum.Edit}`
		};

		this.projectMemberService
			.projectMemberCrud(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {

					await this.loadingService.dismiss();

					// build
					if (baseModel.success) {
						await this.presentToast(baseModel.message);
						await this.loadData();
						// store active user
					}
				},
				error => {
					this.loadingService.dismiss();
				}
			);
	}

	async addProjectUser() {
		const passedModel: ProjectModel = {
			projectId: this.activatedRoute.snapshot.paramMap.get("projectId"),
		}
		const modal = await this.modalController.create({
			component: CreateEditProjectUserComponent,
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

	
	//openProjectMembersOptions
	async openProjectMembersOptions(projectMember: UserModel, userTypeEnum: UserTypeEnum) {

		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.ALERT_DELETE,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {
						// show loader
						this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

						// build data model
						const passedData: ProjectModel = {
							userId: this._loggedInUser,
							addedUserId: projectMember.userId,
							projectId: projectMember.projectId,
							userTypeId: userTypeEnum,
							operationType: OperationsEnum.Delete
						};

						// send api
						this.projectMemberService
							.projectMemberCrud(passedData)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(
								async (baseModel: BaseModel) => {

									// stop loader
									await this.loadingService.dismiss();

									//check if success response case back
									if (baseModel.success) {
										//toast api response
										await this.presentToast(baseModel.message);
										// load data
										this.loadData();
									}
								},
								error => {
									this.loadingService.dismiss();
								}
							);
					}
				}
			]
		});

		await alertController.present();
	}
}
