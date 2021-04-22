import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { StringKey } from "src/app/shared/constant/string.constant";
import { SlideModel } from "src/app/shared/model/slide.model";
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';

@Component({
	selector: "app-intro",
	templateUrl: "./intro.component.html",
	styleUrls: ["./intro.component.scss"],
})
export class IntroComponent extends BaseViewComponent implements OnInit  {
	@ViewChild('slides', {static: false}) slides: IonSlides;
	private currentIndex: number;
	public showNext: boolean;
	public showPrevious: boolean;
	private sliderLength: number;
	readonly stringKey = StringKey;
	public slideArray: SlideModel[];

	slideOpts = {
		initialSlide: 1,
		speed: 400,
	};

	endIntro() {
    this.localStorageService
      .endIntro()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (data : boolean) =>{
          if(data){
            this.modalController.dismiss().then(() => {});
          }
        }
      )
		
	}

	constructor(
    injector: Injector,
    private localStorageService: LocalStorageService,
  ) {
    super(injector);
  }

	next() {
		this.slides.slideNext();
	}

	prev() {
		this.slides.slidePrev();
	}

	slideChanged(slides: IonSlides) {
		slides.getActiveIndex().then((index: number) => {
			if (index === 0) {
				this.showNext = true;
				this.showPrevious = false;
			} else if (index === this.sliderLength - 1) {
				this.showNext = false;
				this.showPrevious = true;
			} else {
				this.showNext = true;
				this.showPrevious = true;
			}
		});
	}

	reachedBegining(event) {
		this.showNext = true;
		this.showPrevious = false;
	}

	reachedEnd(event) {
		this.showNext = false;
		this.showPrevious = true;
	}

	ngOnInit() {
		this.slideArray = [
			{
				title: this.stringKey.INTRO_SLIDE_1_TITLE,
				info: this.stringKey.INTRO_SLIDE_1_INFO,
				imageName: "intro_slide_1",
				buttonText: this.stringKey.SKIP_INTRO,
			},
			{
				title: this.stringKey.INTRO_SLIDE_2_TITLE,
				info: this.stringKey.INTRO_SLIDE_2_INFO,
				imageName: "intro_slide_2",
				buttonText: this.stringKey.SKIP_INTRO,
			},
			{
				title: this.stringKey.INTRO_SLIDE_3_TITLE,
				info: this.stringKey.INTRO_SLIDE_3_INFO,
				imageName: "intro_slide_3",
				buttonText: this.stringKey.SKIP_INTRO,
			},
			{
				title: this.stringKey.INTRO_SLIDE_4_TITLE,
				info: this.stringKey.INTRO_SLIDE_4_INFO,
				imageName: "intro_slide_4",
				buttonText: this.stringKey.SKIP_INTRO,
			},
			{
				title: this.stringKey.INTRO_SLIDE_5_TITLE,
				info: this.stringKey.INTRO_SLIDE_5_INFO,
				imageName: "intro_slide_5",
				buttonText: this.stringKey.SKIP_INTRO,
			},
			{
				title: this.stringKey.INTRO_SLIDE_6_TITLE,
				info: this.stringKey.INTRO_SLIDE_6_INFO,
				imageName: "intro_slide_6",
				buttonText: this.stringKey.GOT_IT_CONTINUE,
			},
		];

		this.showNext = true;
		this.showPrevious = false;
		this.sliderLength = 6;
	}
}
