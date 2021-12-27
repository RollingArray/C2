/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Analytics service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 18:51:09 
 * Last modified  : 2021-12-26 22:12:00
 */


import { AngularFireAnalytics } from '@angular/fire/analytics';
import { Injectable } from "@angular/core";
import * as browserPlatform from 'platform';
import { AnalyticsMetricModel } from '../model/analytics-metric.model';
import { environment } from 'src/environments/environment';
import { EventPageEnum } from '../enum/event-page.enum';

@Injectable({
	providedIn: "root"
})
export class AnalyticsService
{
	/**
	 * Creates an instance of analytics service.
	 * @param analytics 
	 */
	constructor(
		private analytics: AngularFireAnalytics,
	) {
		
	}

	/**
	 * Logs analytics service
	 * @param page 
	 * @param data 
	 */
	async log(loggedInUser: string, page: EventPageEnum, data: any)
	{
		// log if production
		if (environment.level === '') 
		{
			const getOs = await this.getOs();
			const getDevice = await this.getBrowserPlatformProduct();
			const getBrowser = await this.getBrowser();

			// build app insights metric
			const analyticsMetricModel: AnalyticsMetricModel = {
				loggedInUser: loggedInUser,
				page: page,
				os: getOs,
				device: getDevice,
				version: environment.version,
				browser: JSON.stringify(getBrowser),
				properties: data
			};

			this.analytics.logEvent(page,analyticsMetricModel);	
		}
	}
	
	/**
	 * @description Gets browser
	 * @returns  
	 */
	 private async getBrowser() {
		return `${await this.getBrowserPlatformName()} ${await this.getBrowserPlatformVersion()}`;
	}

	/**
	 * @description Gets os
	 * @returns  
	 */
	private async getOs() {
		return `${await this.getBrowserPlatformOsFamily()} ${await this.getBrowserPlatformOsVersion()}`;
	}

	/**
	 * @description Gets browser platform os version
	 * @returns  
	 */
	private async getBrowserPlatformOsVersion() {
		/* istanbul ignore next */
		return browserPlatform.os && browserPlatform.os.version ? browserPlatform.os.version : '';
	}

	/**
	 * @description Gets browser platform os family
	 * @returns  
	 */
	private async getBrowserPlatformOsFamily() {
		/* istanbul ignore next */
		return browserPlatform.os && browserPlatform.os.family ? browserPlatform.os.family : '';
	}

	/**
	 * @description Gets browser platform version
	 * @returns  
	 */
	private async getBrowserPlatformVersion() {
		return browserPlatform.version;
	}

	/**
	 * @description Gets browser platform name
	 * @returns  
	 */
	private async getBrowserPlatformName() {
		return browserPlatform.name;
	}

	/**
	 * @description Gets browser platform product
	 * @returns  
	 */
	private async getBrowserPlatformProduct() {
		return browserPlatform.product;
	}

}
