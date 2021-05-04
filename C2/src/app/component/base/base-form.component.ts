import { OnDestroy, Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Injector } from "@angular/core";
import {
	AlertController,
	NavController,
	LoadingController,
	ModalController,
	NavParams,
	ToastController,
	ActionSheetController,
} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/internal/Subscription";

//fontawasom


//constant
import { StringKey } from "src/app/shared/constant/string.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { Subject } from 'rxjs';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { ModalData } from "src/app/shared/model/modal-data.model";

@Component({
	selector: 'base-form-component',
	template: '<div></div>'
})

export abstract class BaseFormComponent implements OnInit, OnDestroy {
	public formGroup: FormGroup;
	public formBuilder: FormBuilder;
	public navController: NavController;
	public alertController: AlertController;
	public loadingController: LoadingController;
	public modalController: ModalController;
	public toastController: ToastController;
	public actionSheetController: ActionSheetController;
	public subscription: Subscription = new Subscription();
	public unsubscribe = new Subject<void>();

	readonly stringKey = StringKey;
	readonly regex = Regex;
	readonly arrayKey = ArrayKey;
	readonly operations = OperationsEnum;
	

	/**
	 * Creates an instance of base form component.
	 * @param injector 
	 */
	constructor(injector: Injector) {
		this.navController = injector.get(NavController);
		this.alertController = injector.get(AlertController);
		this.loadingController = injector.get(LoadingController);
		this.formBuilder = injector.get(FormBuilder);
		this.modalController = injector.get(ModalController);
		this.toastController = injector.get(ToastController);
		this.actionSheetController = injector.get(ActionSheetController);
	}


	/**
	 * Finds invalid controls
	 * @returns  
	 */
	 public findInvalidControls() {
		const invalid = [];
		const controls = this.formGroup.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	
	/**
	 * Validators base form component
	 * @returns  
	 */
	validators() {
		return Validators;
	}


	/**
	 * on init
	 */
	ngOnInit() { }

	/**
	 * on destroy
	 */
	ngOnDestroy(): void {
		// unsubscribe to all the subscriptions
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	/**
	 * Presents toast
	 * @param responseMessage 
	 */
	async presentToast(responseMessage) {

		if (this.toastController) {
			this.toastController.dismiss();
		}

		const toast = await this.toastController.create({
			message: responseMessage,
			duration: 3000
		});
		await toast.present();
	}

	/**
	 * Go back
	 */
	async goBack() {
		await this.navController.back();
	}

	/**
	 * Gets user full name
	 * @param firstName 
	 * @param lastName 
	 * @returns  
	 */
	getUserFullName(firstName, lastName) {
		return firstName + " " + lastName;
	}
}
