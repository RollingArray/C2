/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Loading controller service
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-17 12:21:36 
 * Last modified  : 2021-12-28 08:40:13
 */


import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
	providedIn: "root"
})
export class LoadingService {
	/**
	 * Determines whether loading is
	 */
	private _isLoading = false;

	/**
	 * Creates an instance of loading service.
	 * @param loadingController 
	 */
	constructor(public loadingController: LoadingController) { }

	/**
	 * Presents loading service
	 * @param message 
	 * @returns  
	 */
	async present(message: string) {
		this._isLoading = true;
		this.loadingController
			.create({
				message,
				duration: 5000
			})
			.then(response => {
				response
					.present()
					.then(() => {
						if (!this._isLoading) {
							response
								.dismiss()
								.then(() => {
									// loading present
								});
						}
					});
			});
	}

	/**
	 * Dismiss loading service
	 */
	async dismiss() {

		this.loadingController.getTop().then(() => {
			this._isLoading = false;
			this.loadingController
				.dismiss()
				.then(() => {
					// loading dismiss
				});
		});
	}
}
