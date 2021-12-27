/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Local storage service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 10:16:05 
 * Last modified  : 2021-11-01 10:17:58
 */


import { UserModel } from './../model/user.model';
import { Injectable } from '@angular/core';
import { LocalStoreKey } from '../constant/local-store-key.constant';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectModel } from '../model/project.model';
import { FilterModel } from '../model/filter.model';
import { EncryptionService } from './encryption.service';

@Injectable({
	providedIn: 'root'
})


export class LocalStorageService
{
	/**
	 * Current active user$ of local storage service
	 */
	public currentActiveUser$ = new BehaviorSubject<UserModel>({});

	/**
	 * Current active user name$ of local storage service
	 */
	public currentActiveUserName$ = new BehaviorSubject<string>("");

	/**
	 * Current active user email$ of local storage service
	 */
	public currentActiveUserEmail$ = new BehaviorSubject<string>("");

	/**
	 * Current active user id$ of local storage service
	 */
	public currentActiveUserId$ = new BehaviorSubject<string>("");

	/**
	 * Current active user token$ of local storage service
	 */
	public currentActiveUserToken$ = new BehaviorSubject<string>("");

	/**
	 * Intro status$ of local storage service
	 */
	public introStatus$ = new BehaviorSubject<string>("");

	/**
	 * Selected project$ of local storage service
	 */
	public selectedProject$ = new BehaviorSubject<ProjectModel>({});

	/**
	 * Selected project filter$ of local storage service
	 */
	public selectedProjectFilter$ = new BehaviorSubject<FilterModel>({});
	
	/**
	 * Creates an instance of local storage service.
	 * @param encryptionService 
	 */
	constructor(
		private encryptionService: EncryptionService
	) {

	}

	/**
	 * Gets token
	 * @returns  
	 */
	getToken() {
		return localStorage.getItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`);
	}

	/**
	 * Gets active user id
	 * @returns active user id 
	 */
	getActiveUserId(): Observable<string> {
		this.currentActiveUserId$ = new BehaviorSubject<string>(
			localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`)
		);
		return this.currentActiveUserId$.asObservable();
	}

	/**
	 * Gets active user email
	 * @returns active user email 
	 */
	getActiveUserEmail(): Observable<string> {
		this.currentActiveUserEmail$ = new BehaviorSubject<string>(
			localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`)
		);
		return this.currentActiveUserEmail$.asObservable();
	}

	/**
	 * Gets active user name
	 * @returns active user name 
	 */
	getActiveUserName(): Observable<string>
	{
		const firstName = localStorage.getItem(LocalStoreKey.LOGGED_IN_USER_FIRST_NAME);
		const lastName = localStorage.getItem(LocalStoreKey.LOGGED_IN_USER_LAST_NAME);
		const firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
		const lastNameCapitalized = lastName.charAt(0).toUpperCase() + lastName.slice(1);

		var fullName = firstNameCapitalized + " " + lastNameCapitalized;

		this.currentActiveUserName$ = new BehaviorSubject<string>(fullName);
		return this.currentActiveUserName$.asObservable();
	}

	/**
	 * Gets active user
	 * @returns active user 
	 */
	getActiveUser(): Observable<UserModel> {
		this.currentActiveUser$ = new BehaviorSubject<UserModel>({
			userId: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`),
			userFirstName: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`),
			userLastName: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`),
			userEmail: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`),
			userSecurityAnswer1: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_SECURITY_ANSWER_1}`),
			userSecurityAnswer2: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_SECURITY_ANSWER_2}`),
		});

		return this.currentActiveUser$.asObservable();
	}

	/**
	 * Sets active user
	 * @param userModel 
	 * @returns active user 
	 */
	setActiveUser(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`, userModel.updatedLoggedInSessionId);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`, userModel.userId);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`, userModel.userFirstName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`, userModel.userLastName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`, userModel.userEmail);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Updates active user details
	 * @param userModel 
	 * @returns active user details 
	 */
	updateActiveUserDetails(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`, userModel.userFirstName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`, userModel.userLastName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`, userModel.userEmail);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Updates active user token
	 * @param userModel 
	 * @returns active user token 
	 */
	updateActiveUserToken(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`, userModel.updatedLoggedInSessionId);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Sets sign up user details
	 * @param userModel 
	 * @returns sign up user details 
	 */
	setSignUpUserDetails(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`, userModel.userFirstName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`, userModel.userLastName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`, userModel.userEmail);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Removes active user
	 * @returns active user 
	 */
	removeActiveUser(): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.clear();

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Ends intro
	 * @returns intro 
	 */
	endIntro(): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.SKIP_INTRO}`, 'done');

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Gets intro status
	 * @returns intro status 
	 */
	getIntroStatus(): Observable<string> {
		this.introStatus$ = new BehaviorSubject<string>(
			localStorage.getItem(`${LocalStoreKey.SKIP_INTRO}`)
		);
		return this.introStatus$.asObservable();
	}

	/**
	 * Sets select project
	 * @param projectModel 
	 * @returns select project 
	 */
	setSelectProject(projectModel: ProjectModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.SELECTED_PROJECT_ID}`, projectModel.projectId);
		localStorage.setItem(`${LocalStoreKey.SELECTED_PROJECT_NAME}`, projectModel.projectName);

		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Gets selected project
	 * @returns selected project 
	 */
	getSelectedProject(): Observable<ProjectModel> {
		this.selectedProject$ = new BehaviorSubject<ProjectModel>({
			projectId: localStorage.getItem(`${LocalStoreKey.SELECTED_PROJECT_ID}`),
			projectName: localStorage.getItem(`${LocalStoreKey.SELECTED_PROJECT_NAME}`)
		});

		return this.selectedProject$.asObservable();
	}

	/**
	 * Sets selected project filter
	 * @param filterModel 
	 * @returns selected project filter 
	 */
	setSelectedProjectFilter(filterModel: FilterModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);
		const encryptedFilter = this.encryptionService.encryptData(JSON.stringify(filterModel), filterModel.projectId);
		localStorage.setItem(`${LocalStoreKey.FILTER}`, encryptedFilter);
		
		observable$.next(true);
		return observable$.asObservable();
	}

	/**
	 * Gets selected project filter
	 * @param projectId 
	 * @returns selected project filter 
	 */
	getSelectedProjectFilter(projectId: string): Observable<FilterModel> {
		const encryptedFilter = localStorage.getItem(`${LocalStoreKey.FILTER}`);
		if(encryptedFilter){
			const decryptedFilter = this.encryptionService.decryptData(encryptedFilter, projectId);
			const filterModel: FilterModel = JSON.parse(decryptedFilter);
			this.selectedProjectFilter$ = new BehaviorSubject<FilterModel>(filterModel);
			return this.selectedProjectFilter$.asObservable();
		}
		else{
			const filterModel: FilterModel = {
				userId: localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`),
				projectId: localStorage.getItem(`${LocalStoreKey.SELECTED_PROJECT_ID}`),
			}
			this.selectedProjectFilter$ = new BehaviorSubject<FilterModel>(filterModel);
			return this.selectedProjectFilter$.asObservable();
		}
	}

}
