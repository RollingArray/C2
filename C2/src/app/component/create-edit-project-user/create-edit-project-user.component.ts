/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Create Edit Project User Component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-05 08:18:02 
 * Last modified  : 2021-05-05 08:26:30
 */


import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { ProjectUserTypeModel } from 'src/app/shared/model/project-user-type.model';
import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
import { UserModel } from "src/app/shared/model/user.model";
import { ProjectModel } from "src/app/shared/model/project.model";
import { BaseModel } from "src/app/shared/model/base.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { ProjectService } from "src/app/shared/service/project.service";
import { UserService } from "src/app/shared/service/user.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { NavParams } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { takeUntil } from "rxjs/operators";
import { UserTypeEnum } from "src/app/shared/enum/user-type.enum";
import { ProjectMemberService } from 'src/app/shared/service/project-member.service';

@Component({
	selector: "app-create-edit-project-user",
	templateUrl: "./create-edit-project-user.component.html",
	styleUrls: ["./create-edit-project-user.component.scss"],
})
export class CreateEditProjectUserComponent extends BaseFormComponent
	implements OnInit, OnDestroy {
	/**
	 * User model of create edit project user component
	 */
	private _userModel: UserModel;

	/**
	 * Project model of create edit project user component
	 */
	private _projectModel: ProjectModel;

	/**
	 * Modal data of create edit project user component
	 */
	private _modalData: ModalData;

	/**
	 * Logged in user of create edit project user component
	 */
	private _loggedInUser: string;

	/**
	 * Search  of create edit project user component
	 */
	private _search: string;

	/**
	 * Users  of create edit project user component
	 */
	private _users: UserModel[];

	/**
	 * Determines whether data has
	 */
	private _hasData: boolean = false;

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
	 * Sets users
	 */
	public set users(value: UserModel[]) {
		this._users = value;
	}

	/**
	 * Gets users
	 */
	public get users(): UserModel[] {
		return this._users;
	}

	/**
	 * Sets search
	 */
	public set search(value: string) {
		this._search = value;
	}

	/**
	 * Gets search
	 */
	public get search(): string {
		return this._search;
	}

	/**
	 * Creates an instance of create edit project user component.
	 * @param injector 
	 * @param projectMemberService 
	 * @param userService 
	 * @param loadingService 
	 * @param localStorageService 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		private projectMemberService: ProjectMemberService,
		private userService: UserService,
		public loadingService: LoadingService,
		private localStorageService: LocalStorageService,
		public navParams: NavParams
	) {
		super(injector);
		this._projectModel = this.navParams.get("data");
		console.log(JSON.stringify(this._projectModel));
		this._loggedInUser = this.localStorageService.currentActiveUserId$.getValue();
	}

	/**
	 * on init
	 */
	ngOnInit() {
		//
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Ions view did enter
	 */
	ionViewDidEnter() {
		//
	}

	/**
	 * Searches user
	 */
	async searchUser() {
		//start load
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		//build model
		this._userModel = {
			userId: this._loggedInUser,
			searchKey: this._search,
		};

		//send response
		this.userService
			.searchUserDetailsBySearchText(this._userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (baseModel: BaseModel) => {

				// stop loader
				await this.loadingService.dismiss();

				// check response data exist
				if (baseModel.data.success) {

					// remove no data ui
					this._hasData = true;

					//assign data to model
					this._users = baseModel.data.data;
				}
				// if data does not exist
				else {
					// keep no data ui
					this._hasData = false;

					// empty users array
					this._users = [];
				}
			});
	}

	/**
	 * Joins user to project
	 * @param user 
	 * @param userTypeEnum 
	 */
	async joinUserToProject(user: UserModel, userTypeEnum: UserTypeEnum) {

		// show loader
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build data model
		const passedData: ProjectModel = {
			userId: this._loggedInUser,
			addedUserId: user.userId,
			projectId: this._projectModel.projectId,
			userTypeId: userTypeEnum,
			operationType: OperationsEnum.Create
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

						//dismiss modal
						this._modalData = {
							cancelled: false,
							operationSubmitted: true,
						};

						// store active user
						this.dismissModal();
					}
				},
				error => {
					this.loadingService.dismiss();
				}
			);
	}

	//openUserOptions
	async openUserOptions(user: UserModel) {
		const actionSheet = await this.actionSheetController.create({
			header: this.stringKey.CHOOSE_YOUR_ACTION,
			buttons: [
				// add user as admin
				{
					text:
						this.stringKey.ADD_USER_AS_ADMIN,
					icon: this.stringKey.ICON_ADD,
					handler: async () => {
						await this.joinUserToProject(user, UserTypeEnum.Administrator);
					},
				},

				// add user as assignee
				{
					text:
						this.stringKey.ADD_USER_AS_ASSIGNEE,
					icon: this.stringKey.ICON_ADD,
					handler: async () => {
						await this.joinUserToProject(user, UserTypeEnum.Assignee);
					},
				},

				// ass user as reviewer
				{
					text:
						this.stringKey.ADD_USER_AS_REVIEWER,
					icon: this.stringKey.ICON_ADD,
					handler: async () => {
						await this.joinUserToProject(user, UserTypeEnum.Reviewer);
					},
				},

				// cancel alert sheet
				{
					text: this.stringKey.CANCEL,
					icon: this.stringKey.ICON_CANCEL,
					handler: () => {
						//
					},
				},
			],
		});
		await actionSheet.present();
	}

	cancelModal() {
		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};

		// store active user
		this.dismissModal();
	}

	dismissModal() {
		this.modalController.dismiss(this._modalData).then(() => { });
	}

}
