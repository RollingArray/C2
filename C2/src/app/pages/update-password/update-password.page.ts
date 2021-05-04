import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { BaseFormComponent } from "src/app/component/base/base-form.component";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { UserService } from "src/app/shared/service/user.service";
import { Router } from "@angular/router";
import { BaseModel } from "src/app/shared/model/base.model";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-update-password",
	templateUrl: "./update-password.page.html",
	styleUrls: ["./update-password.page.scss"],
})
export class UpdatePasswordPage extends BaseFormComponent
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
			userPasswordResetCode: [
				"",
				this.validators().compose([
					this.validators().required,
					this.validators().pattern(
						this.regex.RESET_PASSWORD_CODE_PATTERN
					),
				]),
			],
		});

		this.setFormData();
	}

	setFormData() {
		const form = this.formGroup.value;
		form.userPassword = "";
		form.userEmail = "";
		form.userPasswordResetCode = "";
	}

	//get user email
	get userPassword() {
		return this.formGroup.get("userPassword");
	}

	get userEmail() {
		return this.formGroup.get("userEmail");
	}

	get userPasswordResetCode() {
		return this.formGroup.get("userPasswordResetCode");
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
		this.loadingService.present(`${this.stringKey.API_REQUEST_MESSAGE_2}`);

		// build data userModel
		const form = this.formGroup.value;
		this.userModel = {
			userPassword: form.userPassword,
			userEmail: form.userEmail,
			userPasswordResetCode: form.userPasswordResetCode,
		};

		this.userService
			.updatePassword(this.userModel)
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
					//console.log(error);
					this.loadingService.dismiss();
				}
			);
	}

	ngOnInit() {}

	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
