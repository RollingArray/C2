/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Front page
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:14:11 
 * Last modified  : 2021-12-26 19:57:08
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { PlatformHelper } from 'src/app/shared/helper/platform.helper';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { IntroComponent } from 'src/app/component/intro/intro.component';
import { AnalyticsService } from 'src/app/shared/service/analytics.service';
import { EventPageEnum } from 'src/app/shared/enum/event-page.enum';
import { ApiUrls } from 'src/app/shared/constant/api-urls.constant';

@Component({
	selector: "app-front",
	templateUrl: "./front.page.html",
	styleUrls: ["./front.page.scss"],
})
export class FrontPage extends BaseViewComponent implements OnInit, OnDestroy {
	
	/**
	 * Year  of front page
	 */
	readonly year = new Date().getFullYear();

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
		private analyticsService: AnalyticsService
	) {
		super(injector);

		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.FRONT,
			{
				'data': ''
			}
		);
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
