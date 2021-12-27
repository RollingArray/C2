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
import { UserModel } from '../model/user.model';
import { LoadingService } from "./loading.service";
import { StringKey } from "../constant/string.constant";
import { take } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class UserService extends BaseService<BaseModel> {
	/**
	 * @param  {HttpClient} httpClient
	 */
	constructor(
		httpClient: HttpClient,
		localStorageService: LocalStorageService,
		alertController: AlertController,
		dataCommunicationService: DataCommunicationService,
		private loadingService: LoadingService
	)
	{
		super(
			httpClient,
			localStorageService,
			alertController,
			dataCommunicationService,
		);
	}

	signIn(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.SIGN_IN}`, userModel);
	}

	getUser(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_DETAILS}`, userModel);
	}

	signUp(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.SIGN_UP}`, userModel);
	}

	activateUserAccount(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_ACTIVATE}`, userModel);
	}

	resendActivationCode(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_ACTIVATE_CODE_RESEND}`, userModel);
	}

	generatePasswordResetCode(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_PASSWORD_RESET_CODE}`, userModel);
	}

	updatePassword(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_PASSWORD_UPDATE}`, userModel);
	}

	userProfileUpdate(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_PROFILE_UPDATE}`, userModel);
	}

	searchUserDetailsBySearchText(userModel: UserModel): Observable<BaseModel>
	{
		return this.post(`${ApiUrls.USER_SEARCH}`, userModel);
	}

	/**
	   * Logouts menu page
	   */
	async logout()
	{
		await this.loadingService.present(
			`${StringKey.API_REQUEST_MESSAGE_5}`
		);
		await this.localStorageService
			.removeActiveUser()
			.pipe(take(1))
			.subscribe(async (data: boolean) =>
			{
				if (data)
				{
					await this.loadingService
						.dismiss()
						.then(() => window.location.reload());
				} else
				{
					await this.loadingService.dismiss();
				}
			});
	}









	//


}
