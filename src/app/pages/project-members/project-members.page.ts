/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Project members page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:34:14 
 * Last modified  : 2021-11-22 20:18:15
 */


import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ProjectModel } from 'src/app/shared/model/project.model';
import { BaseModel } from 'src/app/shared/model/base.model';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { ProjectUserTypeModel } from 'src/app/shared/model/project-user-type.model';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { UserTypeEnum } from 'src/app/shared/enum/user-type.enum';
import { takeUntil } from 'rxjs/operators';
import { PlatformHelper } from 'src/app/shared/helper/platform.helper';
import { CreateEditProjectUserComponent } from 'src/app/component/create-edit-project-user/create-edit-project-user.component';
import { ProjectMemberService } from 'src/app/shared/service/project-member.service';
import { UserModel } from 'src/app/shared/model/user.model';
import { ProjectMemberModel } from 'src/app/shared/model/project-member.model';
import { CommonCrudService } from 'src/app/shared/service/common-crud.service';
import { CrudComponentEnum } from 'src/app/shared/enum/crud-component.enum';


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
	 * User type of project activity review page
	 */
	 private _userType: ProjectModel;

	/**
	 * Project model of project members page
	 */
	private _projectMemberModel: ProjectMemberModel;

	/**
	 * Project name of project members page
	 */
	private _projectName = '';

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
	 * Determines whether data has
	 */
	private _hasData: boolean = false;
	
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
	 * Gets user type
	 */
	 public get userType()
	 {
		 return this._userType;
	 }
 
	 /**
	  * Gets whether is administrator
	  */
	  get isAdministrator()
	  {
		  return this._userType.userTypeId === UserTypeEnum.Administrator ? true : false;
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
	 * Crud component enum of project members page
	 */
	readonly crudComponentEnum = CrudComponentEnum;
	
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
		private commonCrudService: CommonCrudService<ProjectModel>
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
		this._projectName = this._projectMemberModel.projectDetails?.projectName;
		this._breadCrumb = [this._projectName, this.stringKey.PROJECT_MEMBER];
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

		this.projectMemberService
			.getProjectMembers(passedData)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					this.loadingService.dismiss();
					if (baseModel.success)
					{
						this._projectMemberModel = baseModel.data;

						// removed no data from ui
						this._hasData = true;
						
						// get user type for the project
						this._userType = this._projectMemberModel.userType;
						
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

	/**
	 * Next step
	 * @param crudComponentEnum 
	 */
	async nextStep(crudComponentEnum: CrudComponentEnum)
	 {
		switch (crudComponentEnum) {
			case CrudComponentEnum.OPEN_ACTIVITY_ASSIGNEE:
				this.commonCrudService.openNextStep(CrudComponentEnum.OPEN_ACTIVITY_ASSIGNEE, this._projectName);
				break;
			case CrudComponentEnum.OPEN_ACTIVITY_REVIEWER:
				this.commonCrudService.openNextStep(CrudComponentEnum.OPEN_ACTIVITY_REVIEWER, this._projectName);
				break;
			default:
				break;
		}
		
	 }
}
