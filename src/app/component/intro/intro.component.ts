/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Intro component
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-11 16:33:48 
 * Last modified  : 2021-11-11 16:41:27
 */


import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { SlideModel } from "src/app/shared/model/slide.model";
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { ArrayKey } from 'src/app/shared/constant/array.constant';

@Component({
	selector: "app-intro",
	templateUrl: "./intro.component.html",
	styleUrls: ["./intro.component.scss"],
})
export class IntroComponent extends BaseViewComponent implements OnInit
{
	/**
	 * View child of intro component
	 */
	@ViewChild('slides', { static: false }) slides: IonSlides;

	/**
	 * Show next of intro component
	 */
	private _showNext: boolean;

	/**
	 * Show previous of intro component
	 */
	private _showPrevious: boolean;

	/**
	 * Slider length of intro component
	 */
	private _sliderLength: number;

	/**
	 * String key of intro component
	 */
	readonly stringKey = StringKey;

	/**
	 * Slide array of intro component
	 */
	readonly slideArray = ArrayKey.INTRO_SLIDE_ARRAY;

	/**
	 * Slide opts of intro component
	 */
	readonly slideOpts = {
		initialSlide: 1,
		speed: 400,
	};

	/**
	 * Gets show next
	 */
	get showNext()
	{
		return this._showNext;
	}

	/**
	 * Gets show previous
	 */
	get showPrevious()
	{
		return this._showPrevious;
	}

	/**
	 * Creates an instance of intro component.
	 * @param injector 
	 * @param localStorageService 
	 */
	constructor(
		injector: Injector,
		private localStorageService: LocalStorageService,
	)
	{
		super(injector);
	}

	/**
	 * on init
	 */
	ngOnInit()
	{
		this._showNext = true;
		this._showPrevious = false;
		this._sliderLength = this.slideArray.length;
	}


	/**
	 * Next intro component
	 */
	next()
	{
		this.slides.slideNext();
	}

	/**
	 * Prev intro component
	 */
	prev()
	{
		this.slides.slidePrev();
	}

	/**
	 * Slides changed
	 * @param slides 
	 */
	slideChanged(slides: IonSlides)
	{
		slides.getActiveIndex().then((index: number) =>
		{
			if (index === 0)
			{
				this._showNext = true;
				this._showPrevious = false;
			} else if (index === this._sliderLength - 1)
			{
				this._showNext = false;
				this._showPrevious = true;
			} else
			{
				this._showNext = true;
				this._showPrevious = true;
			}
		});
	}

	/**
	 * Reached begining
	 * @param event 
	 */
	reachedBegining(event)
	{
		this._showNext = true;
		this._showPrevious = false;
	}

	/**
	 * Reached end
	 * @param event 
	 */
	reachedEnd(event)
	{
		this._showNext = false;
		this._showPrevious = true;
	}

	/**
	 * Ends intro
	 */
	endIntro()
	{
		this.localStorageService
			.endIntro()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(
				(data: boolean) =>
				{
					if (data)
					{
						this.modalController.dismiss().then(() => { });
					}
				}
			)

	}
}
