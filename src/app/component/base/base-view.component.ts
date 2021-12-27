import { OnDestroy, Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Injector } from "@angular/core";
import {
	AlertController,
	NavController,
	LoadingController,
	ModalController,
	ActionSheetController,
	ToastController,
	Platform,
	NavParams
} from "@ionic/angular";
import { Subscription } from "rxjs/internal/Subscription";

//constant
import { StringKey } from "src/app/shared/constant/string.constant";
import { Regex } from "src/app/shared/constant/regex.constant";
import { ArrayKey } from 'src/app/shared/constant/array.constant';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { OperationsEnum } from 'src/app/shared/enum/operations.enum';
import { ApiUrls } from "src/app/shared/constant/api-urls.constant";

@Component({
	selector: 'base-view-component',
	template: '<div></div>'
})
export abstract class BaseViewComponent implements OnInit, OnDestroy {
	public router: Router;
	public activatedRoute: ActivatedRoute;
	public navController: NavController;
	public alertController: AlertController;
	public loadingController: LoadingController;
	public modalController: ModalController;
	public actionSheetController: ActionSheetController;
	public toastController: ToastController;
	public platform: Platform;
	public subscription: Subscription = new Subscription();
	public unsubscribe = new Subject<void>();
	public errorMessage: string = StringKey.HOLD_TIGHT;
	public noAccess: boolean = false;

	readonly apiUrls = ApiUrls;
	readonly stringKey = StringKey;
	readonly regex = Regex;
	readonly arrayKey = ArrayKey;
	readonly operations = OperationsEnum;

	constructor(
		injector: Injector,
	) {
		this.router = injector.get(Router);
		this.activatedRoute = injector.get(ActivatedRoute);
		this.navController = injector.get(NavController);
		this.alertController = injector.get(AlertController);
		this.loadingController = injector.get(LoadingController);
		this.modalController = injector.get(ModalController);
		this.actionSheetController = injector.get(ActionSheetController);
		this.toastController = injector.get(ToastController);
		this.platform = injector.get(Platform);
	}

	ngOnInit() { }
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
	dismissModal() {
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalController.dismiss({
			dismissed: true
		});
	}

	//load data
	loadData() {
		//overload this method while loading data from network
	}

	//do refresh
	async doRefresh(event) {
		this.loadData();
		event.target.complete();
	}

	//present toast message
	async presentToast(responseMessage) {
		const toast = await this.toastController.create({
			message: responseMessage,
			duration: 2000
		});
		toast.present();
	}

	//get user full name
	getUserFullName(firstName, lastName) {
		const firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
		const lastNameCapitalized = lastName.charAt(0).toUpperCase() + lastName.slice(1);
		return firstNameCapitalized + " " + lastNameCapitalized;
	}

	getUserNameInitials(firstName, lastName) {
		return firstName[0].toUpperCase() + "" + lastName[0].toUpperCase();
	}
}
