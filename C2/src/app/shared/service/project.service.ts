import { DataCommunicationService } from "./data-communication.service";
import { AlertController } from "@ionic/angular";
/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2019-07-11 09:49:17
 * @modify date 2019-07-11 09:49:17
 * @desc [description]
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

@Injectable({
	providedIn: "root"
})
export class ProjectService extends BaseService<ProjectModel> {
	/**
	 * @param  {HttpClient} httpClient
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

	crudProject(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.USER_PROJECT_CRUD}`, projectModel);
	}

	getUserProject(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.USER_PROJECT}`, projectModel);
	}

	getProjectDetails(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_DETAILS}`, projectModel);
	}

	getProjectRaw(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_RAW}`, projectModel);
	}

	searchProject(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.SEARCH_PROJECT}`, projectModel);
	}
}
