import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { CreateEditProjectSprintComponent } from "src/app/component/create-edit-project-sprint/create-edit-project-sprint.component";
import { StringKey } from "src/app/shared/constant/string.constant";
import { OperationsEnum } from "src/app/shared/enum/operations.enum";
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { BaseModel } from "src/app/shared/model/base.model";
import { CredibilityBase } from "src/app/shared/model/credibility-base.model";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { ProjectModel } from "src/app/shared/model/project.model";
import { SprintModel } from "src/app/shared/model/sprint.model";
import { CredibilityIndexService } from "src/app/shared/service/credibility-index.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";

@Component({
	selector: "project-users",
	templateUrl: "./project-user-credibility.page.html",
	styleUrls: ["./project-user-credibility.page.scss"]
})
export class ProjectUserCredibilityPage extends BaseViewComponent implements OnInit, OnDestroy {
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
	   * Assignee id of project user credibility page
	   */
	  private _assigneeId: string;

	  private _credibilityBase: CredibilityBase;


 
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
	 private _activityReviewers: ActivityReviewerModel[];
 
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
	  * Sets whether has data
	  */
	   public set credibilityBase(value: CredibilityBase) {
		this._credibilityBase = value;
	}

	/**
	 * Gets whether has data
	 */
	public get credibilityBase(): CredibilityBase {
		return this._credibilityBase;
	}
 
	 // MyProjectPage constructor
	 constructor(
		 injector: Injector,
		 public localStorageService: LocalStorageService,
		 private credibilityIndexService: CredibilityIndexService,
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
		 this._assigneeId = this.activatedRoute.snapshot.paramMap.get("assigneeId");
		 this.errorMessage = this.stringKey.NO_DATA_CREDIBILITY;
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
 
		 const passedData: ActivityReviewerModel = {
			 projectId: this._projectId,
			 userId: this._loggedInUser,
			 assigneeUserId: this._assigneeId
		 };
 
		 this.credibilityIndexService
			 .getCredibilityIndexDetails(passedData)
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(
				 async (baseModel: BaseModel) => {
					 this.loadingService.dismiss();
					 if (baseModel.success) {
						this._hasData = true;
						
						 this._credibilityBase = baseModel.data;
						 await this.generateBreadcrumb();

						 this.errorMessage = this.stringKey.NO_DATA_CREDIBILITY;
					 }
					 else{
						 console.log(baseModel);
						 this.errorMessage = baseModel.error.message
					 }
				 }
			 );
	 }
 
	 /**
	  * Generates breadcrumb
	  */
	  async generateBreadcrumb(){
		 let projectName = this._credibilityBase.projectDetails?.projectName;
		 this._breadCrumb = [projectName, this.stringKey.CREDIBILITY_BOARD, this.stringKey.CREDIBILITY_INDEX];
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

