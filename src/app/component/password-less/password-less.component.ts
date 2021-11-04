/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Password less component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:07:06 
 * Last modified  : 2021-05-18 19:08:26
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Injector } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";

@Component({
	selector: "app-password-less",
	templateUrl: "./password-less.component.html",
	styleUrls: ["./password-less.component.scss"],
})
export class PasswordLessComponent extends BaseViewComponent implements OnInit {
	/**
	 * String key of password less component
	 */
	readonly stringKey = StringKey;

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
	}

	/**
	 * Got it
	 */
	gotIt() {
		this.dismissModal();
	}

}
