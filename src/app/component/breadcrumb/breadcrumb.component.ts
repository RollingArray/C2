/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Breadcrumb component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-23 11:16:09 
 * Last modified  : 2021-11-23 11:16:09 
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent extends BaseViewComponent implements OnInit {

	@Input() crumbs;

	constructor(
		injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() { }

}
