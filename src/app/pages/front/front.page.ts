/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Front page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:14:11 
 * Last modified  : 2021-12-26 11:16:41
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { PlatformHelper } from 'src/app/shared/helper/platform.helper';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { IntroComponent } from 'src/app/component/intro/intro.component';

@Component({
	selector: "app-front",
	templateUrl: "./front.page.html",
	styleUrls: ["./front.page.scss"],
})
export class FrontPage extends BaseViewComponent implements OnInit, OnDestroy {
	/**
	 * Creates an instance of front page.
	 * @param injector 
	 * @param localStorageService 
	 * @param platformHelper 
	 */
	constructor(
		injector: Injector,
		private localStorageService: LocalStorageService,
		private platformHelper: PlatformHelper,
	) {
		super(injector);
	}

	/**
	 * on destroy
	 */
	 ngOnDestroy() {
		super.ngOnDestroy();
	}

	/**
	 * on init
	 */
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
	
	/**
	 * Actives user id
	 * @returns  
	 */
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

	/**
	 * Loads intro
	 * @returns  
	 */
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
