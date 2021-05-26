import { Directive, Input, ElementRef, Renderer2, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { DomController } from "@ionic/angular";
import { Subject, Subscription } from 'rxjs';

@Directive({
	selector: "[appScrollTracker]",
})
export class ScrollTrackerDirective implements OnInit, OnDestroy {
	@Input("appScrollTracker") scrollArea;

	private hidden = true;
	private triggerDistance = 40;
	private subscription: Subscription = new Subscription();

	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
		private domCtrl: DomController
	) { }

	ngOnInit() {
		this.initStyles();
		
		
		const subscription = this.scrollArea
			.ionScroll
			.subscribe((scrollEvent) => {
				const delta = scrollEvent.detail.scrollTop;
				if (scrollEvent.detail.currentY === 0 && this.hidden) {
					this.hide();
				} else if (!this.hidden && delta > this.triggerDistance) {
					this.show();
				} else if (this.hidden && delta < this.triggerDistance) {
					this.hide();
				}
			});

		this.subscription.add(subscription);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	initStyles() {
		this.domCtrl.write(() => {
			this.renderer.setStyle(this.element.nativeElement, "transition", "2s linear");
			this.renderer.setStyle(this.element.nativeElement.querySelector('ion-title'), "opacity", "0");
			this.renderer.addClass(this.element.nativeElement, 'ion-no-border');
			this.renderer.setAttribute(this.element.nativeElement.querySelector('ion-toolbar'), 'color', 'primary');
		});
		this.hidden = false;
	}

	show() {
		this.domCtrl.write(() => {
			this.renderer.setStyle(this.element.nativeElement, "transition", "2s linear");
			this.renderer.setStyle(this.element.nativeElement.querySelector('ion-title'), "opacity", "1");
			this.renderer.removeClass(this.element.nativeElement, 'ion-no-border');
			this.renderer.setAttribute(this.element.nativeElement.querySelector('ion-toolbar'), 'color', 'primary');
		});

		this.hidden = true;
	}

	hide() {
		this.domCtrl.write(() => {
			this.renderer.setStyle(this.element.nativeElement, "transition", "2s linear");
			this.renderer.setStyle(this.element.nativeElement.querySelector('ion-title'), "opacity", "0");
			this.renderer.addClass(this.element.nativeElement, 'ion-no-border');
			this.renderer.setAttribute(this.element.nativeElement.querySelector('ion-toolbar'), 'color', 'primary');
		});

		this.hidden = false;
	}
}