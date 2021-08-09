/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Tool tip service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-08-06 18:48:55 
 * Last modified  : 2021-08-06 19:05:05
 */



import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToolTipComponent } from 'src/app/component/tool-tip/tool-tip.component';
import { ToolTipModel } from '../model/tool-tip.model';


@Injectable({
	providedIn: 'root'
})
export class ToolTipService {

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Instance variable								|
	 * -------------------------------------------------|
	 */

	 /**
	 * -------------------------------------------------|
	 * @description										|
	 * @Lifecycle hooks							|
	 * -------------------------------------------------|
	 */

	/**
	 * Creates an instance of tool tip service.
	 * @param popoverController 
	 */
	constructor(
		private popoverController: PopoverController
	) { }

	/**
	 * -------------------------------------------------|
	 * @description										|
	 * @Public methods							|
	 * -------------------------------------------------|
	 */

	/**
	 * @description Descriptions tool tip service
	 * @param toolTipModel 
	 * @param event 
	 */
	async presentToolTipToast(title: string, subTitle: string, event: any) {

		const toolTipModel: ToolTipModel = {
			title: title,
			subTitle: subTitle,
		}
			
		const popover = await this.popoverController.create({
			component: ToolTipComponent,
			cssClass: 'tooltip-view',
			componentProps: {
				data: toolTipModel
			},
			event: event,
			mode: 'ios',
			translucent: true
		});
		await popover.present();
	}
}
