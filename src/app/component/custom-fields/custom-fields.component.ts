/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Custom fields component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:23:05 
 * Last modified  : 2021-11-15 21:23:44
 */


import { BaseViewComponent } from "src/app/component/base/base-view.component";
import { Component, OnInit, Input, Injector } from "@angular/core";

@Component({
    selector: "app-custom-fields",
    templateUrl: "./custom-fields.component.html",
    styleUrls: ["./custom-fields.component.css"],
})
export class CustomFieldsComponent extends BaseViewComponent implements OnInit
{
	/**
	 * Input  of custom fields component
	 */
	@Input() description: string;

	/**
	 * Input  of custom fields component
	 */
	@Input() sprintStartDate: string;

	/**
	 * Input  of custom fields component
	 */
	@Input() sprintEndDate: string;

	/**
	 * Input  of custom fields component
	 */
	@Input() weight: string;

	/**
	 * Input  of custom fields component
	 */
	@Input() data: string;

	/**
	 * Input  of custom fields component
	 */
	@Input() email: string;

	/**
	 * Input  of custom fields component
	 */
	@Input() noData: boolean = false;

	/**
	 * Creates an instance of custom fields component.
	 * @param injector 
	 */
	constructor(injector: Injector) {
        super(injector);
    }
}
