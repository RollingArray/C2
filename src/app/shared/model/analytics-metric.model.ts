/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Analytics metric model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 19:00:53 
 * Last modified  : 2021-12-26 19:01:08
 */



import { EventPageEnum } from '../enum/event-page.enum';

export interface AnalyticsMetricModel {
	loggedInUser: string;
	page: EventPageEnum;
	os: string;
	device ?: string;
	version: string;
	browser: string;
	// tslint:disable:no-any
	properties ?: any;
}