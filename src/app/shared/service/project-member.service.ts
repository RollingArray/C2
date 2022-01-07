/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Project member service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2022-01-07 19:27:57 
 * Last modified  : 2022-01-07 19:28:16
 */


import { DataCommunicationService } from "./data-communication.service";
import { AlertController } from "@ionic/angular";
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
import { UserModel } from "../model/user.model";

@Injectable({
	providedIn: "root"
})
export class ProjectMemberService extends BaseService<ProjectModel> {
	/**
	 * Creates an instance of project member service.
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
	 * Gets project members
	 * @param projectModel 
	 * @returns project members 
	 */
	getProjectMembers(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_MEMBERS}`, projectModel);
	}

	/**
	 * Projects member crud
	 * @param projectModel 
	 * @returns member crud 
	 */
	projectMemberCrud(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_MEMBER_CRUD}`, projectModel);
	}

	/**
	 * News member invite
	 * @param projectModel 
	 * @returns member invite 
	 */
	newMemberInvite(projectModel: UserModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.NEW_MEMBER_INVITE}`, projectModel);
	}

	
}
