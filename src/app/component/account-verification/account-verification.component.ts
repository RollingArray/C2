/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Account verification page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 14:25:52 
 * Last modified  : 2021-11-11 17:28:56
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/component/base/base-form.component';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { AlertService } from 'src/app/shared/service/alert.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/model/base.model';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { PlatformHelper } from 'src/app/shared/helper/platform.helper';
import { NavParams } from '@ionic/angular';


@Component({
	selector: "app-account-verification",
	templateUrl: "./account-verification.component.html",
	styleUrls: ["./account-verification.component.scss"],
})
export class AccountVerificationComponent extends BaseFormComponent
	implements OnInit, OnDestroy
{

	/**
	 * Modal data of create edit project activity component
	 */
	private _modalData: ModalData;
	
	/**
	 * Passed user of account verification component
	 */
	private _passedUser: UserModel;

	/**
	 * Gets active user email
	 */
	get activeUserEmail()
	{
		let activeUserEmail = "";
		this.localStorageService
			.getActiveUserEmail()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) =>
			{
				activeUserEmail = data;
			});

		return activeUserEmail;
	}

	/**
	 * Gets user email
	 */
	get userEmail()
	{
		return this.formGroup.get("userEmail");
	}

	/**
	 * Gets user activation code
	 */
	get userVerificationCode()
	{
		return this.formGroup.get("userVerificationCode");
	}

	/**
	 * Creates an instance of account activation page.
	 * @param injector 
	 * @param alertService 
	 * @param loadingService 
	 * @param userService 
	 * @param router 
	 * @param localStorageService 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private loadingService: LoadingService,
		private userService: UserService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private platformHelper: PlatformHelper,
		public navParams: NavParams
	)
	{
		super(injector);
		this._passedUser = this.navParams.get("data");
		this.buildFrom();
	}

	/**
	 * on init
	 */
	ngOnInit() { }

	/**
	 * on destroy
	 */
	ngOnDestroy()
	{
		super.ngOnDestroy();
	}

	/**
	 * Builds from
	 */
	private async buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userEmail: [
				this.activeUserEmail,
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
			userVerificationCode: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(
						this.regex.VERIFICATION_CODE_PATTERN
					),
				]),
			],
		});

		this.setFormData();
	}

	/**
	 * Sets form data
	 */
	private async setFormData()
	{
		const form = this.formGroup.value;
		form.userEmail = this._passedUser.userEmail;
		form.userVerificationCode = "";
	}

	/**
	 * Submits data
	 */
	private async submitData()
	{
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build data userModel
		const form = this.formGroup.value;
		const userModel: UserModel = {
			userEmail: form.userEmail,
			userVerificationCode: form.userVerificationCode,
			userLoginType: "FRESH_LOGIN",
			userPlatform: this.platformHelper.getDevicePlatform(),
		};

		this.userService
			.signIn(userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) =>
				{
					await this.loadingService.dismiss();
					// build
					if (baseModel.success)
					{

						if (baseModel.success)
						{
							const userModel: UserModel = {
								userId: baseModel.data.userId,
								updatedLoggedInSessionId: baseModel.updatedLoggedInSessionId,
								userEmail: baseModel.data.userEmail,
								userFirstName: baseModel.data.userFirstName,
								userLastName: baseModel.data.userLastName
							};
		
							await this.localStorageService
								.setActiveUser(userModel)
								.pipe(takeUntil(this.unsubscribe))
								.subscribe(async () =>
								{
									this.dismissModal();
									this.router.navigate(["/my-project"]);
								});
						}

						//await this.presentToast(baseModel.message);
					}
				},
				(error) =>
				{
					this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Submits account activation page
	 */
	async submit()
	{
		if (this.formGroup.invalid)
		{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else
		{
			await this.submitData();
		}
	}

	/**
	 * Resends verification code
	 */
	public async resendVerificationCode()
	{
		if (!this.userEmail.value)
		{
			await this.alertService.presentBasicAlert(
				`${this.stringKey.RESEND_ACTIVATION_CODE}`
			);
		} else
		{
			this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

			// build data userModel
			const form = this.formGroup.value;
			const userModel: UserModel = {
				userEmail: form.userEmail,
				userVerificationCode: form.userVerificationCode,
				userLoginType: "FRESH_LOGIN",

			};

			this.userService
				.resendActivationCode(userModel)
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					async (baseModel: BaseModel) =>
					{
						await this.loadingService.dismiss();
						// build
						if (baseModel.success)
						{
							await this.presentToast(baseModel.message);
						}
					},
					(error) =>
					{
						this.loadingService.dismiss();
					}
				);
		}
	}

	/**
	 * Dismiss modal
	 */
	 dismissModal() {
		this.modalController.dismiss(this._modalData).then(() => {
			this.formGroup.reset();
		});
	}

	/**
	 * Cancels modal
	 */
	cancelModal() {

		this._modalData = {
			cancelled: true,
			operationSubmitted: false,
		};
		// store active user
		this.dismissModal();
	}
}
