/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Common crud service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:05:59 
 * Last modified  : 2021-08-10 17:55:23
 */


import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreateEditProjectGoalComponent } from 'src/app/component/create-edit-project-goal/create-edit-project-goal.component';
import { CreateEditProjectSprintComponent } from 'src/app/component/create-edit-project-sprint/create-edit-project-sprint.component';
import { CreateEditProjectComponent } from 'src/app/component/create-edit-project/create-edit-project.component';
import { NextStepComponent } from 'src/app/component/next-step/next-step.component';
import { StringKey } from '../constant/string.constant';
import { CrudComponentEnum } from '../enum/crud-component.enum';
import { OperationsEnum } from '../enum/operations.enum';
import { BaseModel } from '../model/base.model';
import { ModalData } from '../model/modal-data.model';
import { BaseService } from './base.service';
import { LoadingService } from './loading.service';
import { LocalStorageService } from './local-storage.service';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root',
})
export class CommonCrudService<T extends BaseModel> {
	/**
	 * Logged in user of crud service
	 */
	private _loggedInUser: string;

	/**
	 * Load data upon modal close of crud service
	 */
	public loadDataUponModalClose: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);

	/**
	 * Load data upon object deleted of crud service
	 */
	public loadDataUponObjectDeleted: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);

	/**
	 * Modal data of my project page
	 */
	private _modalData: ModalData;

	/**
	 * String key of base service
	 */
	readonly stringKey = StringKey;

	constructor(
		private localStorageService: LocalStorageService,
		private modalController: ModalController,
		private alertController: AlertController,
		private loadingService: LoadingService,
		private toastService: ToastService
	) {
		this.getCurrentUserId();
	}

	/**
	 * Gets current user
	 */
	async getCurrentUserId() {
		this.localStorageService
			.getActiveUserId()
			.pipe(take(1))
			.subscribe((data: string) => {
				this._loggedInUser = data;
			});
	}

	/**
	 * Gets crud component
	 * @param componentType
	 * @returns
	 */
	getCrudComponent(componentType: CrudComponentEnum) {
		switch (componentType) {
			case CrudComponentEnum.CRUD_PROJECT:
				return CreateEditProjectComponent;
			case CrudComponentEnum.CRUD_GOAL:
				return CreateEditProjectGoalComponent;
			case CrudComponentEnum.CRUD_SPRINT:
				return CreateEditProjectSprintComponent;
			default:
				break;
		}
	}

	/**
	 * Operating user
	 * @param data 
	 * @param operation 
	 * @returns  
	 */
	operatingUser(data: T, operation: OperationsEnum) {

		//bind user id and operation type to the existing object
		return {
			...data,
			userId: this._loggedInUser,
			operationType: operation
		}
	}

	/**
	 * Opens modal with create operation
	 * @param data 
	 * @param componentType 
	 * @returns  
	 */
	async openModalWithCreateOperation(data: T, componentType: CrudComponentEnum) {
		const modal = await this.modalController.create({
			component: this.getCrudComponent(componentType),
			componentProps: {
				data: this.operatingUser(data, OperationsEnum.Create),
			},
			backdropDismiss:false
		});

		modal.onDidDismiss().then((data) => {
			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				// open whats next
				this.openNextStep(componentType, this._modalData.returnMessage);
			}
		});

		return await modal.present();
	}

	/**
	 * Opens modal with edit operation
	 * @param data
	 * @param componentType
	 * @returns
	 */
	async openModalWithEditOperation(data: T, componentType: CrudComponentEnum) {
		const modal = await this.modalController.create({
			component: this.getCrudComponent(componentType),
			componentProps: {
				data: this.operatingUser(data, OperationsEnum.Edit),
			},
			backdropDismiss: false
		});

		modal.onDidDismiss().then((data) => {
			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				//load data from network
				this.loadDataUponModalClose.next(true);
			}
		});

		return await modal.present();
	}

	/**
	 * Deletes operation
	 * @param data 
	 * @param service 
	 * @param apiMethodName 
	 */
	async deleteOperation(data: T, service: BaseService<T>, apiMethodName: string, deleteMessage: string) {
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: deleteMessage,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {

						//loading start
						this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

						//send api
						service
						[apiMethodName](this.operatingUser(data, OperationsEnum.Delete))
							.pipe(take(1))
							.subscribe(
								async (baseModel: BaseModel) => {

									// dismiss loader
									await this.loadingService.dismiss();

									// check is model return success
									if (baseModel.success) {

										// show toast
										await this.toastService.presentToast(baseModel.message);

										// load data to ui
										//load data from network
										this.loadDataUponObjectDeleted.next(true);
									}
								},

								// if error
								async (error) => {
									// dismiss loader
									await this.loadingService.dismiss();
								}
							);
					}
				}
			]
		});

		// present alert
		await alertController.present();
	}

	/**
	 * Unders the hood edit operation
	 * @param data 
	 * @param service 
	 * @param apiMethodName 
	 * @param deleteMessage 
	 */
	async underTheHoodEditOperation(data: T, service: BaseService<T>, apiMethodName: string, message: string, operation: OperationsEnum) {
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: message,
			buttons: [
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				}, {
					text: this.stringKey.YES,
					handler: async () => {

						//loading start
						this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

						//send api
						service
						[apiMethodName](this.operatingUser(data, operation))
							.pipe(take(1))
							.subscribe(
								async (baseModel: BaseModel) => {

									// dismiss loader
									await this.loadingService.dismiss();

									// check is model return success
									if (baseModel.success) {

										// show toast
										await this.toastService.presentToast(baseModel.message);

										// load data to ui
										//load data from network
										this.loadDataUponObjectDeleted.next(true);
									}
								},

								// if error
								async (error) => {
									// dismiss loader
									await this.loadingService.dismiss();
								}
							);
					}
				}
			]
		});

		// present alert
		await alertController.present();
	}

	/**
	 * Opens next step
	 * @param componentType 
	 * @returns  
	 */
	async openNextStep(componentType: CrudComponentEnum, message: string) {

		const modal = await this.modalController.create({
			component: NextStepComponent,
			componentProps: {
				componentType: componentType,
				message: message
			},
			backdropDismiss: false
		});

		modal.onDidDismiss().then((data) => {
			this._modalData = data.data;
			if (this._modalData.cancelled) {
				//do not refresh the page
			} else {
				//load data from network
				this.loadDataUponModalClose.next(true);
			}
		});

		return await modal.present();
	}

	/**
	 * Logouts user
	 */
	async logoutUser() {

		// open alert
		const alertController = await this.alertController.create({
			header: this.stringKey.CONFIRM_ACTION,
			message: this.stringKey.CONFIRM_LOG_OUT,
			buttons: [

				// if user cancel
				{
					text: this.stringKey.CANCEL,
					handler: () => {
						//
					}
				},

				// if user want to proceed
				{
					text: this.stringKey.YES,
					handler: async () => {

						// start loader
						await this.loadingService.present(
							`${this.stringKey.API_REQUEST_MESSAGE_5}`
						);

						// remove any user data from local storage
						await this.localStorageService
							.removeActiveUser()
							.pipe(take(1))
							.subscribe(async (data: boolean) => {

								// on success
								if (data) {

									// dismiss loader
									await this.loadingService
										.dismiss()
										.then(() => {

											// reload window to reset any in memory cached data reflected over UI
											window.location.reload();
										});

								} else {
									// dismiss loader
									await this.loadingService.dismiss();
								}
							});
					}
				}
			]
		});

		// present alert
		await alertController.present();
	}
}
