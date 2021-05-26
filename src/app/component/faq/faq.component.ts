/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2020-03-29 15:03:17
 * @modify date 2020-03-29 15:03:17
 * @desc [description]
 */

import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseFormComponent } from '../base/base-form.component';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { FaqModel } from 'src/app/shared/model/faq.model';

@Component({
	selector: "app-faq",
	templateUrl: "./faq.component.html",
	styleUrls: ["./faq.component.scss"],
})
export class FaqComponent extends BaseFormComponent implements OnInit, OnDestroy {
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
