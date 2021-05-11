import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
	isLoading = false;

	constructor(public loadingController: LoadingController) {}

	// present loading controller
	async present(message: string) {
		this.isLoading = true;
		return await this.loadingController
			.create({
				message,
				duration: 5000
			})
			.then(response => {
				response
					.present()
					.then(() => {
						if (!this.isLoading) {
							response
								.dismiss()
								.then(() => console.log("abort presenting"));
						}
					});
			});
	}

	//dismiss loading controller
	async dismiss() {
		this.isLoading = false;
		return await this.loadingController
			.dismiss()
			.then(() => {
				//
      });
	}
}
