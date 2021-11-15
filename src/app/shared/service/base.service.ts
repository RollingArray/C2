/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Base api service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 10:15:11 
 * Last modified  : 2021-11-12 17:11:20
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Subscription, Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { StringKey } from "../constant/string.constant";
import { BaseModel } from "../model/base.model";
import { UserModel } from "../model/user.model";
import { DataCommunicationService } from "./data-communication.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root",
})
export abstract class BaseService<T extends BaseModel> {
	/**
	 * String key of base service
	 */
	readonly stringKey = StringKey;

	/**
	 * User model of base service
	 */
	private userModel: UserModel;

	/**
	 * Subscription  of base service
	 */
	private subscription: Subscription = new Subscription();

	/**
	 * Creates an instance of base service.
	 * @param httpClient 
	 * @param localStorageService 
	 * @param alertController 
	 * @param dataCommunicationService 
	 */
	constructor(
		private httpClient: HttpClient,
		private localStorageService: LocalStorageService,
		public alertController: AlertController,
		private dataCommunicationService: DataCommunicationService
	) { }

	/**
	 * Determines whether init on
	 */
	onInit() { }

	/**
	 * Determines whether destroy on
	 */
	onDestroy()
	{
		this.subscription.unsubscribe();
	}

	/**
	 * Gets local storage service
	 * @returns local storage service 
	 */
	getLocalStorageService(): LocalStorageService
	{
		return this.localStorageService;
	}

	/**
	 * Gets base service
	 * @param url 
	 * @returns get 
	 */
	public get(url: string): Observable<T>
	{
		const apiData = this.httpClient.get(url).pipe(
			map((response: any) => response as T),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Posts base service
	 * @param url 
	 * @param data 
	 * @returns post 
	 */
	public post(url: string, data: T): Observable<T>
	{
		const apiData = this.httpClient.post<T>(url, data).pipe(
			map((response: BaseModel) =>
			{

				//if response has success true
				if (response.success)
				{
					//success block
					//if api token has updated, update in local service
					if (response.tokenUpdated)
					{
						this.userModel = {
							updatedLoggedInSessionId: response.updatedLoggedInSessionId,
						};
						const subscribe = this.localStorageService
							.updateActiveUserToken(this.userModel)
							.subscribe();

						this.subscription.add(subscribe);
					}
				} else
				{
					if (response.error.errorCode === "INVALID_SESSION")
					{
						this.dataCommunicationService.sendMessage(
							response.error.errorCode
						);
					} else
					{
						this.errorAlert(response.error.message);
					}
				}

				return response as T;
			}),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Updates token for current user
	 * @param response 
	 */
	async updateTokenForCurrentUser(response: BaseModel)
	{
		// build
		this.userModel = {
			userId: response.userId,
			token: response.token,
		};

		const subscribe = await this.localStorageService
			.setActiveUser(this.userModel)
			.subscribe();
		this.subscription.add(subscribe);
	}

	/**
	 * Puts base service
	 * @param url 
	 * @param data 
	 * @returns put 
	 */
	public put(url: string, data: T): Observable<T>
	{
		const apiData = this.httpClient.put<T>(url, data).pipe(
			map((response: any) => response as T),
			catchError((error) => of(null))
		);
		return apiData;
	}

	/**
	 * Errors alert
	 * @param message 
	 * @returns  
	 */
	errorAlert(message: string)
	{
		//this.dataComunicaitonService.currentMessage("message").;

		return this.alertController
			.create({
				header: this.stringKey.APP_NAME,
				message,
				buttons: [
					{
						text: "Okay",
						handler: (data) => { },
					},
				],
			})
			.then((response) =>
			{
				response.present();
			});
	}
}
