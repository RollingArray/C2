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
	selector: "app-reset-password-code",
	templateUrl: "./reset-password-code.page.html",
	styleUrls: ["./reset-password-code.page.scss"],
})
export class ResetPasswordCodePage extends BaseFormComponent
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
		});

		this.setFormData();
	}

	setFormData() {
		const form = this.formGroup.value;
		form.userEmail = "";
	}

	get userEmail() {
		return this.formGroup.get("userEmail");
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
			userEmail: form.userEmail,
		};

		this.userService
			.generatePasswordResetCode(this.userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
          await this.loadingService.dismiss();
					// build
					if (baseModel.success) {
						await this.presentToast(baseModel.message);
						// store active user
						this.router.navigateByUrl("/update-password");
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
