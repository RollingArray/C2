/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Credibility index service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-08 16:51:14 
 * Last modified  : 2021-05-08 18:14:03
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { ApiUrls } from "../constant/api-urls.constant";
import { ActivityModel } from "../model/activity.model";
import { BaseModel } from "../model/base.model";
import { ProjectModel } from "../model/project.model";
import { UserModel } from "../model/user.model";
import { BaseService } from "./base.service";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
	providedIn: "root"
})
export class CredibilityIndexService extends BaseService<ProjectModel> {
	
	/**
	 * Creates an instance of credibility index service.
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
	 * Gets credibility board
	 * @param projectModel 
	 * @returns credibility board 
	 */
	getCredibilityBoard(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.CREDIBILITY_INDEX}`, projectModel);
	}

	getCredibilityIndexDetails(activityModel: ActivityModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.CREDIBILITY_INDEX_DETAILS}`, activityModel);
	}

	
}
