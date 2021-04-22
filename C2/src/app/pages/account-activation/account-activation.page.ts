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


@Component({
	selector: "app-account-activation",
	templateUrl: "./account-activation.page.html",
	styleUrls: ["./account-activation.page.scss"],
})
export class AccountActivationPage extends BaseFormComponent
	implements OnInit, OnDestroy {
	modalData: ModalData;
	userModel: UserModel;

	constructor(
		injector: Injector,
		private alertService: AlertService,
		private loadingService: LoadingService,
		private userService: UserService,
		private router: Router
	) {
		super(injector);
		this.buildFrom();
	}

	private buildFrom() {
		this.formGroup = this.formBuilder.group({
			userEmail: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
			userActivationCode: [
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

	setFormData() {
		const form = this.formGroup.value;
		form.userEmail = "";
		form.userActivationCode = "";
	}

	get userEmail() {
		return this.formGroup.get("userEmail");
	}

	get userActivationCode() {
		return this.formGroup.get("userActivationCode");
	}

	// submit login
	async submit() {
		if (this.formGroup.invalid) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.MANDATORY_FIELDS}`
			);
		} else {
			await this.submitData();
		}
	}

	public findInvalidControls() {
		const invalid = [];
		const controls = this.formGroup.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}

	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build data userModel
		const form = this.formGroup.value;
		this.userModel = {
			userEmail: form.userEmail,
			userActivationCode: form.userActivationCode,
		};

		this.userService
			.activateUserAccount(this.userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					await this.loadingService.dismiss();
					// build
					if (baseModel.success) {
						await this.presentToast(baseModel.message);
						// store active user
						this.router.navigateByUrl("/sign-in");
					}
				},
				(error) => {
					this.loadingService.dismiss();
				}
			);
	}

	/**
	 * Resend verification code
	 */
	async resendVerificationCode() {
		if (!this.userEmail.value) {
			await this.alertService.presentBasicAlert(
				`${this.stringKey.RESEND_ACTIVATION_CODE}`
			);
		} else {
			this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

			// build data userModel
			const form = this.formGroup.value;
			this.userModel = {
				userEmail: form.userEmail,
				userActivationCode: form.userActivationCode,
			};

			this.userService
				.resendActivationCode(this.userModel)
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					async (baseModel: BaseModel) => {
						await this.loadingService.dismiss();
						// build
						if (baseModel.success) {
							await this.presentToast(baseModel.message);
						}
					},
					(error) => {
						//console.log(error);
						this.loadingService.dismiss();
					}
				);
		}
	}

	ngOnInit() { }

	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
