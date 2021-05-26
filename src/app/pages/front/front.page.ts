import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { PlatformHelper } from 'src/app/shared/helper/platform.helper';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { ModalController } from '@ionic/angular';
import { IntroComponent } from 'src/app/component/intro/intro.component';
import { RegisteredUserService } from 'src/app/shared/service/registered-user.service';

@Component({
	selector: "app-front",
	templateUrl: "./front.page.html",
	styleUrls: ["./front.page.scss"],
})
export class FrontPage extends BaseViewComponent implements OnInit, OnDestroy {
	// instance variable
	private introStatus: string;

	// SignInPage constructor
	constructor(
		injector: Injector,
		private localStorageService: LocalStorageService,
		private platformHelper: PlatformHelper,
		private registeredUserService: RegisteredUserService,
	) {
		super(injector);
	}

	async ngOnInit() {
		if (await this.activeUserId()) {
			this.router.navigate(["/my-project"]);
		} else {
			this.localStorageService
				.getIntroStatus()
				.pipe(takeUntil(this.unsubscribe))
				.subscribe(
					(data: string) => {
						if (data !== 'done') {
							this.loadIntro();
						}
					}
				);
		}
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

	ngOnDestroy() {
		super.ngOnDestroy();
	}

	// add Community
	async loadIntro() {
		const modal = await this.modalController.create({
			component: IntroComponent,
			componentProps: {
				data: "none",
			},
		});

		modal.onDidDismiss().then((data) => {
			//if app, initiate push notificaiton
			if (this.platformHelper.isApp()) {

			}
		});

		return await modal.present();

	}
}
