/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2020-03-29 15:03:17
 * @modify date 2020-03-29 15:03:17
 * @desc [description]
 */

import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { FaqModel } from 'src/app/shared/model/faq.model';
import { BaseViewComponent } from '../base/base-view.component';

@Component({
	selector: "app-faq",
	templateUrl: "./tnc.component.html",
	styleUrls: ["./tnc.component.scss"],
})
export class TncComponent extends BaseViewComponent implements OnInit, OnDestroy {
  private modalData: ModalData;
  public faqs: FaqModel[] = []; 
  constructor(
		injector: Injector
	) {
    super(injector);
    for (let index = 2; index <= 15; index++) {
      const eachFaq: FaqModel = {
        question : this.stringKey["FAQ_Q_"+index],
        answer : this.stringKey["FAQ_A_"+index]
      };

      this.faqs.push(eachFaq);
    }
  }

	closeModal() {
		this.modalData = {
			cancelled: true,
			operationSubmitted: false,
		};

		// store active user
		this.dismissModal();
	}

	dismissModal() {
    this.modalController.dismiss(this.modalData).then(() => {});
	}

	ngOnInit() {}

	ngOnDestroy(): void {}
}
