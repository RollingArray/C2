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
	selector: "app-sign-up",
	templateUrl: "./sign-up.page.html",
	styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage extends BaseFormComponent implements OnInit, OnDestroy {
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
			userPassword: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.PASSWORD_PATTERN),
				]),
			],
			userEmail: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.EMAIL_PATTERN),
				]),
			],
			userSecurityAnswer1: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_PATTERN),
				]),
			],
			userSecurityAnswer2: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(this.regex.USER_PATTERN),
				]),
			],
		});

		this.setFormData();
	}

	setFormData() {
		const form = this.formGroup.value;
		form.userFirstName = "";
		form.userLastName = "";
		form.userPassword = "";
		form.userEmail = "";
		form.userSecurityAnswer1 = "";
		form.userSecurityAnswer2 = "";
	}

	//get user email
	get userFirstName() {
		return this.formGroup.get("userFirstName");
	}

	get userLastName() {
		return this.formGroup.get("userLastName");
	}

	get userPassword() {
		return this.formGroup.get("userPassword");
	}

	get userEmail() {
		return this.formGroup.get("userEmail");
	}

	get userSecurityAnswer1() {
		return this.formGroup.get("userSecurityAnswer1");
	}

	get userSecurityAnswer2() {
		return this.formGroup.get("userSecurityAnswer2");
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

	async submitData() {
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_5}`);

		// build data userModel
		const form = this.formGroup.value;
		this.userModel = {
			userFirstName: form.userFirstName,
			userLastName: form.userLastName,
			userPassword: form.userPassword,
			userEmail: form.userEmail,
			userSecurityAnswer1: form.userSecurityAnswer1,
			userSecurityAnswer2: form.userSecurityAnswer2,
		};

		this.userService
			.signUp(this.userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					await this.loadingService.dismiss();
					// build
					if (baseModel.success) {
						await this.presentToast(baseModel.message);
						// store active user
						this.router.navigateByUrl("/account-activation");
					}
				},
				(error) => {
					//console.log(error);
					this.loadingService.dismiss();
				}
			);
	}

	ngOnInit() { }

	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
