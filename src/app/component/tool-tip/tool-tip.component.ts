/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Tool Tip component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-08-06 18:55:39 
 * Last modified  : 2021-08-06 18:55:39 
 */

import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ToolTipModel } from '../../shared/model/tool-tip.model';
import { PopoverController } from '@ionic/angular';
import { StringKey } from 'src/app/shared/constant/string.constant';

@Component({
  selector: 'tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],
})
export class ToolTipComponent implements OnInit {
	
	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Input & @Output properties								|
	 * -------------------------------------------------|
	 */

	/**
	 * Description  of tool tip component
	 */
	readonly stringKey = StringKey;
	
	/**
	 * @description Description  of tool tip component
	 */
	private _toolTip!: ToolTipModel;

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Getter & @Setters								|
	 * -------------------------------------------------|
	 */
	/**
	 * @description Gets tool tip
	 */
	get toolTip() {
		return this._toolTip;
	}


	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Lifecycle Hook							|
	 * -------------------------------------------------|
	 */
	/**
	 * Creates an instance of tool tip component.
	 * @param navParams 
	 * @param popoverController 
	 */
	constructor(
		private navParams: NavParams,
		private popoverController: PopoverController
		
	) {
		this._toolTip = this.navParams.get("data");
	}

	/**
	 * @description on init
	 */
	async ngOnInit() {
		//
	}

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public method							|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Got it
	 */
	gotIt(){
		this.popoverController.dismiss();
	}
}