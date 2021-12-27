/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Next step component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:07:06 
 * Last modified  : 2021-11-06 21:45:36
 */


import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, Injector } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { CrudComponentEnum } from 'src/app/shared/enum/crud-component.enum';
import { NextStepModel } from 'src/app/shared/model/next-step.model';
import { RouteChildrenModel } from 'src/app/shared/model/route.model';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { ProjectModel } from 'src/app/shared/model/project.model';

@Component({
	selector: "app-next-step",
	templateUrl: "./next-step.component.html",
	styleUrls: ["./next-step.component.scss"],
})
export class NextStepComponent extends BaseViewComponent implements OnInit {
	readonly stringKey = StringKey;

	/**
	 * Selected project of menu page
	 */
	private _selectedProject: string;
	
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
		public navParams: NavParams,
		private localStorageService: LocalStorageService
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

	/**
	 * Goto page
	 * @param routeChildrenModel 
	 */
	 async gotoPage(urlParts: string[])
	 {
 
		 
		 await this.getSelectProject();
 
		 let constructUrl = [];
 
		 constructUrl.push('my-project');
		 constructUrl.push(this._selectedProject);
		 constructUrl.push('go');
		 
		 for (const url of urlParts)
		 {
			 constructUrl.push(url);
		 }
		 this.router.navigate(constructUrl);

		 this.dismissModal();
	 }
	
	/**
	 * Gets select project
	 */
	 async getSelectProject()
	 {
 
		 this.localStorageService
			 .getSelectedProject()
			 .pipe(takeUntil(this.unsubscribe))
			 .subscribe(async (data: ProjectModel) =>
			 {
				 this._selectedProject = data.projectId;
			 });
	 }
}
