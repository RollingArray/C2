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
import { SprintModel } from '../model/sprint.model';

@Injectable({
	providedIn: "root"
})
export class ProjectSprintService extends BaseService<SprintModel> {
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

	getProjectSprints(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_SPRINTS}`, projectModel);
	}

	projectSprintCrud(sprintModel: SprintModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_SPRINT_CRUD}`, sprintModel);
	}
}
