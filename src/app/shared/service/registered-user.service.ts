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

// constant
import { ApiUrls } from "../constant/api-urls.constant";
import { UserModel } from "../model/user.model";

@Injectable({
	providedIn: "root",
})
export class RegisteredUserService extends BaseService<UserModel> {
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
  
	signIn(userModel: UserModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.SIGN_IN}`, userModel);
	}

	getUser(userModel: UserModel): Observable<BaseModel> {
		return this.post(`${ApiUrls.USER_DETAILS}`, userModel);
	}

	//
}
