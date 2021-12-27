import { DataCommunicationService } from "./data-communication.service";
import { AlertController } from "@ionic/angular";
/**
 * @author Ranjoy Sen
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// service
import { LocalStorageService } from "./local-storage.service";
import { BaseService } from "./base.service";

// model
import { BaseModel } from "../model/base.model";
import { ProjectModel } from "../model/project.model";

// constant
import { ApiUrls } from "../constant/api-urls.constant";
import { ActivityModel } from '../model/activity.model';

@Injectable({
	providedIn: "root"
})
export class ProjectActivityService extends BaseService<ActivityModel> {
	/**
	 * 
	 * @param httpClient 
	 * @param localStorageService 
	 * @param alertController 
	 * @param dataCommunicationService 
	 */
	constructor(
		httpClient: HttpClient,
		localStorageService: LocalStorageService,
		alertController: AlertController,
		dataCommunicationService: DataCommunicationService
	) {
		super(
			httpClient,
			localStorageService,
			alertController,
			dataCommunicationService
		);
	}

	/**
	 * Gets project activities
	 * @param projectModel 
	 * @returns project activities 
	 */
	getProjectActivities(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITIES}`, projectModel);
	}

	/**
	 * Gets project my activities
	 * @param projectModel 
	 * @returns project my activities 
	 */
	getProjectMySpace(projectModel: ProjectModel, spaceType: string): Observable<BaseModel> {
		let url = '';
		if(spaceType == 'activity'){
			url = `${ApiUrls.PROJECT_MY_ACTIVITIES}`;
		}
		else if(spaceType == 'review'){
			url = `${ApiUrls.PROJECT_MY_REVIEWS}`;
		}

		return this.post(url, projectModel);
	}

	/**
	 * Projects activity crud
	 * @param activityModel 
	 * @returns activity crud 
	 */
	projectActivityCrud(activityModel: ActivityModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_CRUD}`, activityModel);
	}

	/**
	 * Projects activity comment crud
	 * @param activityModel 
	 * @returns activity comment crud 
	 */
	projectActivityCommentCrud(activityModel: ActivityModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_COMMENT_CRUD}`, activityModel);
	}

	/**
	 * Gets project activity details
	 * @param activityModel 
	 * @returns project activity details 
	 */
	getProjectActivityDetails(activityModel: ActivityModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_DETAILS}`, activityModel);
	}

	/**
	 * Projects activity lock
	 * @param activityModel 
	 * @returns activity lock 
	 */
	projectActivityLock(activityModel: ActivityModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_LOCK}`, activityModel);
	}

	/**
	 * Projects activity unlock
	 * @param activityModel 
	 * @returns activity unlock 
	 */
	projectActivityUnlock(activityModel: ActivityModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_UNLOCK}`, activityModel);
	}
}
