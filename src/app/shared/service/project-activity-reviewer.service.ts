/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Project activity reviewer service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-06 11:49:59 
 * Last modified  : 2021-11-13 13:15:17
 */


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

// constant
import { ApiUrls } from "../constant/api-urls.constant";
import { ActivityReviewerModel } from "../model/activity-reviewer.model";

@Injectable({
	providedIn: "root"
})
export class ProjectActivityReviewerService extends BaseService<ActivityReviewerModel> {
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
	 * Projects activity crud
	 * @param activityModel 
	 * @returns activity crud 
	 */
	projectActivityReviewerCrud(activityReviewerModel: ActivityReviewerModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_REVIEWER_CRUD}`, activityReviewerModel);
	}

	/**
	 * Projects activity review update
	 * @param activityReviewerModel 
	 * @returns activity review update 
	 */
	projectActivityReviewUpdate(activityReviewerModel: ActivityReviewerModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_REVIEW_UPDATE}`, activityReviewerModel);
	}

	/**
	 * Projects activity review lock
	 * @param activityReviewerModel 
	 * @returns activity review lock 
	 */
	projectActivityReviewLock(activityReviewerModel: ActivityReviewerModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_REVIEW_LOCK}`, activityReviewerModel);
	}

	/**
	 * Projects activity review unlock
	 * @param activityReviewerModel 
	 * @returns activity review unlock 
	 */
	projectActivityReviewUnlock(activityReviewerModel: ActivityReviewerModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_ACTIVITY_REVIEW_UNLOCK}`, activityReviewerModel);
	}
}
