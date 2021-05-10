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
import { ProjectSprintService } from 'src/app/shared/service/project-sprint.service';
import { CreateEditProjectSprintComponent } from 'src/app/component/create-edit-project-sprint/create-edit-project-sprint.component';
import { SprintModel } from 'src/app/shared/model/sprint.model';
import { ProjectSprintModel } from 'src/app/shared/model/project-sprint.model';


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
						else{
							this.errorMessage = this.stringKey.NO_DATA_SPRINT;
							
						}
					}
					else{
						console.log(baseModel.error.message);
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
	 * @returns  
	 */
	async addProjectSprint() {
		const passedModel: SprintModel = {
			userId: this._loggedInUser,
			projectId: this._projectId,
			operationType: `${OperationsEnum.Create}`
		}
		const modal = await this.modalController.create({
			component: CreateEditProjectSprintComponent,
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

	/**
	 * Edits project sprint
	 * @param sprintModel 
	 * @returns  
	 */
	async editProjectSprint(sprintModel: SprintModel, operation: string) {
		sprintModel.userId = this._loggedInUser;
		sprintModel.projectId = this._projectId;
		sprintModel.operationType = operation;

		const modal = await this.modalController.create({
			component: CreateEditProjectSprintComponent,
			componentProps: {
				data: sprintModel
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
	 * Opens sprint options
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
						this.editProjectSprint(selectedSprint, `${OperationsEnum.Edit}`);
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

