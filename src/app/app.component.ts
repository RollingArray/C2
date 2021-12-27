/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary App component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 19:30:02 
 * Last modified  : 2021-12-26 19:30:41
 */


import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { EventPageEnum } from './shared/enum/event-page.enum';
import { AnalyticsService } from './shared/service/analytics.service';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent
{
	/**
	 * Creates an instance of app component.
	 * @param platform 
	 * @param analyticsService 
	 */
	constructor(
		private platform: Platform,
		private analyticsService: AnalyticsService
	)
	{
		/*
		Log event
		*/
		this.analyticsService.log('', EventPageEnum.APP,
			{
				'data': ''
			}
		);
		this.initializeApp();
	}

	/**
	 * Initializes app
	 */
	initializeApp()
	{
		this.platform.ready().then(() =>
		{
			this.platform.backButton.subscribeWithPriority(9999, () =>
			{
				document.addEventListener('backbutton', function (event)
				{
					event.preventDefault();
					event.stopPropagation();
				}, false);
			});
		});
	}
}
