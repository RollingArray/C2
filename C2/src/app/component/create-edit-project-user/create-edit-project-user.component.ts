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
	private userModel: UserModel;
  private projectModel: ProjectModel;
	private modalData: ModalData;
	private loggedInUser: string;

  public search: string;
	public users: UserModel[];
	public hasData: boolean;
	
	// constructor
	constructor(
		injector: Injector,
		private projectMemberService: ProjectMemberService,
		private userService: UserService,
		public loadingService: LoadingService,
		private localStorageService: LocalStorageService,
		public navParams: NavParams
	) {
		super(injector);
		this.projectModel = this.navParams.get("data");
		console.log(JSON.stringify(this.projectModel));
		this.loggedInUser = this.localStorageService.currentActiveUserId$.getValue();
	}

	// Lifecycle hook: ngOnInit
	ngOnInit() {}

	async searchUser() {
		//start load
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_1}`);

		//build model
		this.userModel = {
			userId: this.loggedInUser,
			searchKey: this.search,
		};

		//send response
		this.userService
			.searchUserDetailsBySearchText(this.userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (baseModel: BaseModel) => {
				await this.loadingService.dismiss();
				if (baseModel.data.success) {
					//assign data to model
					this.hasData = true;
					this.users = baseModel.data.data;
				} else {
					this.hasData = false;
					this.users = [];
				}
			});
	}

	// Lifecycle hook: ionViewDidEnter
	ionViewDidEnter() {
		//
	}

  //joinUserToProject
  async joinUserToProject(user: UserModel, userTypeEnum: UserTypeEnum) {
    this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build data userModel
    const passedData : ProjectModel  = {
      userId : this.loggedInUser,
      addedUserId : user.userId,
      projectId: this.projectModel.projectId,
      userTypeId : userTypeEnum,
      operationType : OperationsEnum.Create
    };

		this.projectMemberService
      .projectMemberCrud(passedData)
      .pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {

					await this.loadingService.dismiss();

					//check if success response case back
					if (baseModel.success) {
						//toast api response
						await this.presentToast(baseModel.message);

						//dismis modal
						this.modalData = {
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
				{
					text:
						this.stringKey.ADD_USER_AS_ADMIN,
					icon: this.stringKey.ICON_ADD,
					handler: async () => {
						await this.joinUserToProject(user, UserTypeEnum.Administrator);
					},
				},
				{
					text:
						this.stringKey.ADD_USER_AS_MEMBER,
					icon: this.stringKey.ICON_ADD,
					handler: async () => {
						await this.joinUserToProject(user, UserTypeEnum.Member);
					},
				},
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
		this.modalData = {
			cancelled: true,
			operationSubmitted: false,
		};

		// store active user
		this.dismissModal();
	}

	dismissModal() {
		this.modalController.dismiss(this.modalData).then(() => {});
	}
	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
