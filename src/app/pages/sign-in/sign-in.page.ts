import { PlatformHelper } from "../../shared/helper/platform.helper";
import { Component, OnInit, OnDestroy, Injector } from "@angular/core";
import { BaseFormComponent } from "src/app/component/base/base-form.component";
import { ModalData } from "src/app/shared/model/modal-data.model";
import { UserModel } from "src/app/shared/model/user.model";
import { AlertService } from "src/app/shared/service/alert.service";
import { LoadingService } from "src/app/shared/service/loading.service";
import { RegisteredUserService } from "src/app/shared/service/registered-user.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/shared/service/local-storage.service";
import { StringKey } from "src/app/shared/constant/string.constant";
import { BaseModel } from "src/app/shared/model/base.model";
import { ModalController } from "@ionic/angular";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.page.html",
	styleUrls: ["./sign-in.page.scss"],
})
export class SignInPage extends BaseFormComponent implements OnInit, OnDestroy {
	modalData: ModalData;
	userModel: UserModel;

	constructor(
		private injector: Injector,
		private alertService: AlertService,
		private loadingService: LoadingService,
		private registeredUserService: RegisteredUserService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private platformHelper: PlatformHelper,
		public modalController: ModalController,
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
		});

		this.setFormData();
	}

	setFormData() {
		const form = this.formGroup.value;
		form.userPassword = "";
		form.userEmail = "";
	}

	get userPassword() {
		return this.formGroup.get("userPassword");
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

	// submit login
	async submitData() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_3}`);

		// build data userModel
		const form = this.formGroup.value;
		this.userModel = {
			userEmail: form.userEmail,
			userPassword: form.userPassword,
			userLoginType: "FRESH_LOGIN",
			userPlatform: this.platformHelper.getDevicePlatform(),
    };
    
		this.registeredUserService
      .signIn(this.userModel)
      //.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				async (baseModel: BaseModel) => {
					await this.loadingService.dismiss();
					// build
					this.userModel = {
						userId: baseModel.userId,
						token: baseModel.token,
					};

					if (baseModel.success) {

						// store active user
						await this.localStorageService
              .setActiveUser(this.userModel)
              .pipe(takeUntil(this.unsubscribe))
							.subscribe(async () => {

								await this.getSingInUserDetails();
							});
					}
				},
				(error) => {
					this.loadingService.dismiss();
				}
			);
	}

	//activeUserId
	async activeUserId() {
		let activeUserId = "";
		this.localStorageService
      .getActiveUserId()
      .pipe(takeUntil(this.unsubscribe))
			.subscribe((data: string) => {
				activeUserId = data;
			});

		return activeUserId;
	}

	// get sing in user details
	async getSingInUserDetails() {
		this.loadingService.present(`${StringKey.API_REQUEST_MESSAGE_2}`);
		this.userModel = {
			userId: await this.activeUserId(),
		};

		this.registeredUserService
			.getUser(this.userModel)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(async (baseModel: BaseModel) => {
				await this.loadingService.dismiss();

				if (baseModel.success) {
					this.userModel = baseModel.data;

					await this.localStorageService
						.setActiveUserDetails(this.userModel)
						.pipe(takeUntil(this.unsubscribe))
						.subscribe(async () => {
							this.router.navigate(["/my-project"]);
						});
				}
			});
	}

	ngOnInit() {}

	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
