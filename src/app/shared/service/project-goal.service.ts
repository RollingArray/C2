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
import { GoalModel } from '../model/goal.model';

@Injectable({
	providedIn: "root"
})
export class ProjectGoalService extends BaseService<GoalModel> {
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
	getProjectGoals(projectModel: ProjectModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_GOALS}`, projectModel);
	}

	/**
	 * Projects goal crud
	 * @param goalModel 
	 * @returns goal crud 
	 */
	projectGoalCrud(goalModel: GoalModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.PROJECT_GOAL_CRUD}`, goalModel);
	}
}
