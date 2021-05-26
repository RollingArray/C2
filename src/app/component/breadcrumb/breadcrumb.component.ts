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
