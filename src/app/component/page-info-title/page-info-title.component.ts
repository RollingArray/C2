/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Page info title component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-12-26 11:22:36 
 * Last modified  : 2021-12-26 11:24:30
 */


import { Component, OnInit, Input, Injector } from '@angular/core';
import { BaseViewComponent } from '../base/base-view.component';

@Component({
	selector: 'app-page-info-title',
	templateUrl: './page-info-title.component.html',
	styleUrls: ['./page-info-title.component.css']
})
export class PageInfoTitleComponent extends BaseViewComponent implements OnInit
{

	/**
	 * Input  of page info title component
	 */
	@Input() title;

	/**
	 * Input  of page info title component
	 */
	@Input() info;

	/**
	 * Input  of page info title component
	 */
	@Input() helpArticle = this.apiUrls.HELP;

	/**
	 * Creates an instance of page info title component.
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
	}

}
