import { Component, OnInit, OnDestroy, Input, Injector, ElementRef, ViewChild } from "@angular/core";
import { BaseFormComponent } from "../base/base-form.component";
@Component({
	selector: "app-project-filter",
	templateUrl: "./project-filter.component.html",
	styleUrls: ["./project-filter.component.scss"],
})
export class ProjectFilterComponent extends BaseFormComponent
	implements OnInit, OnDestroy {
	
	/**
	 * Input  of project filter component
	 */
	@Input() filter;

	/**
	 * Input  of project filter component
	 */
	@Input() filterExist;
	
	/**
	 * Creates an instance of project filter component.
	 * @param injector 
	 */
	constructor(
		injector: Injector
	) {
		super(injector);
		
	}

	/**
	 * on init
	 */
	 ngOnInit() { 
		//
	}

	/**
	 * on destroy
	 */
	ngOnDestroy() {
		super.ngOnDestroy();
	}
}
