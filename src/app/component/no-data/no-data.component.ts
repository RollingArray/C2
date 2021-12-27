/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary No data component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-23 19:33:50 
 * Last modified  : 2021-11-23 19:35:48
 */


import { Component, OnInit, Input, Injector } from '@angular/core';
import { BaseViewComponent } from '../base/base-view.component';

@Component({
	selector: 'app-no-data',
	templateUrl: './no-data.component.html',
	styleUrls: ['./no-data.component.css']
})
export class NoDataComponent extends BaseViewComponent implements OnInit
{
	/**
	 * Input  of no data component
	 */
	@Input() text;

	/**
	 * Input  of no data component
	 */
	@Input() user = false;

	/**
	 * Input  of no data component
	 */
	@Input() project = false;

	/**
	 * Input  of no data component
	 */
	@Input() comment = false;
	
	/**
	 * Input  of no data component
	 */
	@Input() filter = false;

	/**
	 * Input  of no data component
	 */
	@Input() activity = false;

	/**
	 * Input  of no data component
	 */
	@Input() goal = false;

	/**
	 * Input  of no data component
	 */
	@Input() sprint = false;

	/**
	 * Input  of no data component
	 */
	@Input() member = false;

	/**
	 * Input  of no data component
	 */
	@Input() reviewer = false;

	/**
	 * Input  of no data component
	 */
	@Input() diversity = false;

	/**
	 * Input  of no data component
	 */
	@Input() credibility = false;
	
	/**
	 * Creates an instance of no data component.
	 * @param injector 
	 */
	constructor(
		injector: Injector,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		//
	}
}
