/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Sign up page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:17:44 
 * Last modified  : 2021-12-26 19:40:27
 */


import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/component/base/base-form.component';
import { AlertService } from 'src/app/shared/service/alert.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { BaseModel } from 'src/app/shared/model/base.model';
import { takeUntil } from 'rxjs/operators';
import { PasswordLessComponent } from 'src/app/component/password-less/password-less.component';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { AnalyticsService } from 'src/app/shared/service/analytics.service';
import { EventPageEnum } from 'src/app/shared/enum/event-page.enum';


@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.page.html",
	styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage extends BaseFormComponent implements OnInit, OnDestroy {
	
	
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
	) {
		super(injector);
		this.buildFrom();

		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.SIGN_UP,
			{
				'data': ''
			}
		);
	}

	/**
	 * 
	 */
	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			userFirstName: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
			userLastName: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_NAME_PATTERN),
				]),
			],
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
	setFormData() {
		const form = this.formGroup.value;
		form.userFirstName = "";
		form.userLastName = "";
		form.userEmail = "";
	}

	/**
	 * Gets user first name
	 */
	get userFirstName() {
		return this.formGroup.get("userFirstName");
	}

	/**
	 * Gets user last name
	 */
	get userLastName() {
		return this.formGroup.get("userLastName");
	}

	/**
	 * Gets user email
	 */
	get userEmail() {
		return this.formGroup.get("userEmail");
	}

	/**
	 * Submits sign up page
	 */
	async submit() {
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			await this.submitData();
		}
	}

	/**
	 * Submits data
	 */
	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_5}`);

		// build data userModel
		const form = this.formGroup.value;
		const userModel = {
			userFirstName: form.userFirstName,
			userLastName: form.userLastName,
			userEmail: form.userEmail
		};

		this.userService
			.signUp(userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					await this.loadingService.dismiss();
					// build
					if (baseModel.success)
					{
						await this.presentToast(baseModel.message);
						
						await this.localStorageService
							.setSignUpUserDetails(userModel)
							.pipe(takeUntil(this.unsubscribe))
							.subscribe(async () => {
								// store active user
								this.router.navigateByUrl("/account-verification");
							});
					}
				},
				(error) => {
					this.loadingService.dismiss();
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
	ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * Lernas more password less
	 * @returns  
	 */
	async lernaMorePasswordLess()
	{
		const modal = await this.modalController.create({
			component: PasswordLessComponent,
			componentProps: {
				data: "none",
			},
		});

		modal.onDidDismiss().then((data) => {
			//
		});

		return await modal.present();
	}
}
