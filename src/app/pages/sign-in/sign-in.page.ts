/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Sign in page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-10-31 17:23:00 
 * Last modified  : 2021-12-26 19:39:40
 */

import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { AccountVerificationComponent } from "src/app/component/account-verification/account-verification.component";
import { BaseFormComponent } from "src/app/component/base/base-form.component";
import { EventPageEnum } from "src/app/shared/enum/event-page.enum";
import { BaseModel } from "src/app/shared/model/base.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { AnalyticsService } from "src/app/shared/service/analytics.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { UserService } from "src/app/shared/service/user.service";

@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.page.html",
	styleUrls: ["./sign-in.page.scss"],
})
export class SignInPage extends BaseFormComponent implements OnInit, OnDestroy
{
	/**
	 * Creates an instance of sign up page.
	 * @param injector 
	 * @param alertService 
	 * @param loadingService 
	 * @param userService 
	 * @param router 
	 */
	constructor(
		injector: Injector,
		private alertService: AlertService,
		private loadingService: LoadingService,
		private userService: UserService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private analyticsService: AnalyticsService
	)
	{
		super(injector);
		this.buildFrom();

		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.SIGN_IN,
			{
				'data': ''
			}
		);
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
	 * 
	 */
	private buildFrom()
	{
		this.formGroup = this.formBuilder.group({
			userEmail: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			]
		});

		this.setFormData();
	}

	/**
	 * 
	 */
	private setFormData()
	{
		const form = this.formGroup.value;
		form.userEmail = "";
	}

	/**
	 * Gets user email
	 */
	get userEmail()
	{
		return this.formGroup.get("userEmail");
	}

	/**
	 * Submits data
	 */
	private async submitData()
	{
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_3}`);

		// build data userModel
		const form = this.formGroup.value;
		const userModel: UserModel = {
			userEmail: form.userEmail
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

						await this.localStorageService
							.setSignUpUserDetails(userModel)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async () =>
							{
								// store active user
								//this.router.navigateByUrl("/account-verification");
								this.loadAccountVerification(userModel);
							});
					}
				},
				(error) =>
				{
					this.loadingService.dismiss();
				}
			);
	}

	// add Community
	async loadAccountVerification(userModel: UserModel) {
		const modal = await this.modalController.create({
			component: AccountVerificationComponent,
			componentProps: {
				data: userModel,
			},
		});

		modal.onDidDismiss().then((data) => {
			//if app, initiate push notificaiton
			
		});

		return await modal.present();

	}

	/**
	 * Submits sign up page
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
}
