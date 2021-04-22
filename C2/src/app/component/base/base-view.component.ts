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
import { Operations } from 'src/app/shared/enum/operations.enum';

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
	public errorMessage: string;

	readonly stringKey = StringKey;
	readonly regex = Regex;
	readonly arrayKey = ArrayKey;
	readonly operations = Operations;

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
		return firstName + " " + lastName;
	}
}
