/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Next step component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:07:06 
 * Last modified  : 2021-05-18 19:08:26
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Injector } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { CrudComponentEnum } from 'src/app/shared/enum/crud-component.enum';
import { NextStepModel } from 'src/app/shared/model/next-step.model';

@Component({
	selector: "app-next-step",
	templateUrl: "./next-step.component.html",
	styleUrls: ["./next-step.component.scss"],
})
export class NextStepComponent extends BaseViewComponent implements OnInit {
	readonly stringKey = StringKey;

	/**
	 * Pages  of menu page
	 */

	private _nextStepModule: NextStepModel;

	/**
	 * Message  of next step component
	 */
	private _message : string;

	/**
	 * Gets next step module
	 */
	public get nextStepModule(): NextStepModel {
		return this._nextStepModule;
	}

	/**
	 * Sets next step module
	 */
	public set nextStepModule(value: NextStepModel) {
		this._nextStepModule = value;
	}

	/**
	 * Gets message
	 */
	public get message(): string {
		return this._message;
	}

	/**
	 * Sets message
	 */
	public set message(value: string) {
		this._message = value;
	}

	/**
	 * Creates an instance of next step component.
	 * @param injector 
	 * @param navParams 
	 */
	constructor(
		injector: Injector,
		public navParams: NavParams
	) {
		super(injector);
		const componentType: CrudComponentEnum = this.navParams.get("componentType");
		this._nextStepModule = ArrayKey.NEXT_STEP[componentType];
		this._message = this.navParams.get("message");
	}

	/**
	 * Got it
	 */
	gotIt() {
		this.dismissModal();
	}

}
