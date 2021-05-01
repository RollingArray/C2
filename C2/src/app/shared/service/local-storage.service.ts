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


export class LocalStorageService {
	public currentActiveUser$ = new BehaviorSubject<UserModel>({});
	public currentActiveUserName$ = new BehaviorSubject<string>("");
	public currentActiveUserEmail$ = new BehaviorSubject<string>("");
	public currentActiveUserId$ = new BehaviorSubject<string>("");
	public currentActiveUserToken$ = new BehaviorSubject<string>("");
	public introStatus$ = new BehaviorSubject<string>("");
	public selectedProject$ = new BehaviorSubject<ProjectModel>({});
	public selectedProjectFilter$ = new BehaviorSubject<FilterModel>({});
	
	constructor(
		private encryptionService: EncryptionService
	) {

	}

	// get token
	getToken() {
		return localStorage.getItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`);
	}

	// get active user id
	getActiveUserId(): Observable<string> {
		this.currentActiveUserId$ = new BehaviorSubject<string>(
			localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`)
		);
		return this.currentActiveUserId$.asObservable();
	}

	// get active user email
	getActiveUserEmail(): Observable<string> {
		this.currentActiveUserEmail$ = new BehaviorSubject<string>(
			localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`)
		);
		return this.currentActiveUserEmail$.asObservable();
	}

	getActiveUserName(): Observable<string> {
		var fullName = localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`) + " " + localStorage.getItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`);

		this.currentActiveUserName$ = new BehaviorSubject<string>(fullName);
		return this.currentActiveUserName$.asObservable();
	}

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

	// set active user
	setActiveUser(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`, userModel.token);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`, userModel.userId);

		observable$.next(true);
		return observable$.asObservable();
	}

	updateActiveUserToken(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`, userModel.updatedLoggedInSessionId);

		observable$.next(true);
		return observable$.asObservable();
	}

	// set active user details
	setActiveUserDetails(userModel: UserModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`, userModel.userFirstName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`, userModel.userLastName);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`, userModel.userEmail);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_SECURITY_ANSWER_1}`, userModel.userSecurityAnswer1);
		localStorage.setItem(`${LocalStoreKey.LOGGED_IN_USER_SECURITY_ANSWER_2}`, userModel.userSecurityAnswer2);

		observable$.next(true);
		return observable$.asObservable();
	}

	// remove active user
	removeActiveUser(): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_SESSION_ID}`);
		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_USER_ID}`);
		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_USER_FIRST_NAME}`);
		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_USER_LAST_NAME}`);
		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_USER_EMAIL}`);
		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_USER_SECURITY_ANSWER_1}`);
		localStorage.removeItem(`${LocalStoreKey.LOGGED_IN_USER_SECURITY_ANSWER_2}`);

		observable$.next(true);
		return observable$.asObservable();
	}

	endIntro(): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.SKIP_INTRO}`, 'done');

		observable$.next(true);
		return observable$.asObservable();
	}

	// get intro status
	getIntroStatus(): Observable<string> {
		this.introStatus$ = new BehaviorSubject<string>(
			localStorage.getItem(`${LocalStoreKey.SKIP_INTRO}`)
		);
		return this.introStatus$.asObservable();
	}

	// set active user details
	setSelectProject(projectModel: ProjectModel): Observable<boolean> {
		const observable$ = new BehaviorSubject<boolean>(false);

		localStorage.setItem(`${LocalStoreKey.SELECTED_PROJECT_ID}`, projectModel.projectId);
		localStorage.setItem(`${LocalStoreKey.SELECTED_PROJECT_NAME}`, projectModel.projectName);

		observable$.next(true);
		return observable$.asObservable();
	}

	getSelectedProject(): Observable<ProjectModel> {
		this.selectedProject$ = new BehaviorSubject<ProjectModel>({
			projectId: localStorage.getItem(`${LocalStoreKey.SELECTED_PROJECT_ID}`),
			projectName: localStorage.getItem(`${LocalStoreKey.SELECTED_PROJECT_NAME}`)
		});

		return this.selectedProject$.asObservable();
	}

	// set active user details
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
		console.log(encryptedFilter);
		const decryptedFilter = this.encryptionService.decryptData(encryptedFilter, projectId);
		console.log(decryptedFilter);
		const filterModel: FilterModel = JSON.parse(decryptedFilter);
		
		this.selectedProjectFilter$ = new BehaviorSubject<FilterModel>(filterModel);

		return this.selectedProjectFilter$.asObservable();
	}

}
