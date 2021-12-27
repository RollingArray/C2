import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable({
  providedIn: "root"
})
export class UpdateCheckerService {
	constructor(
		private swUpdate: SwUpdate,
	) { }

	/**
	 * Checks if app update available
	 */
	 async checkIfAppUpdateAvailable()
	 {
 
		 if (this.swUpdate.isEnabled)
		 {
			 this.swUpdate.available.subscribe(() =>
			 {
				 let versionUpdateMessage = `New version of C2 is available. Load New Version ?`;
 
				 if (confirm(versionUpdateMessage))
				 {
					 window.location.reload();
				 }
			 });
		 }
	 }
}
