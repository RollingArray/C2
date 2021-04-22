import { BaseViewComponent } from 'src/app/component/base/base-view.component';
import { FaqComponent } from './../../component/faq/faq.component';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalData } from 'src/app/shared/model/modal-data.model';
import { FaqModel } from 'src/app/shared/model/faq.model';
import { StringKey } from 'src/app/shared/constant/string.constant';
import { ModalController } from '@ionic/angular';
import { TncComponent } from 'src/app/component/tnc/tnc.component';
import { PpComponent } from 'src/app/component/pp/pp.component';
import { DisableBackService } from 'src/app/shared/service/disable-back.service';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.page.html',
  styleUrls: ['./learn-more.page.scss'],
})
export class LearnMorePage extends BaseViewComponent implements OnInit, OnDestroy {

  private modalData: ModalData;
  public faqs: FaqModel[] = []; 
  readonly stringKey = StringKey;
  
  constructor(
    injector: Injector,
    private disableBackService: DisableBackService
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
  
  get year (){
    var date = new Date();
    return date.getFullYear();
  }

  async faq(){
    const modal = await this.modalController.create({
      component: FaqComponent,
      componentProps: {
        data: {}
      }
    });

    modal.onDidDismiss().then(data => {
      this.modalData = data.data;
      if(this.modalData.cancelled) {
        //do not refresh the page
      } else {
        //
      }
    });

    return await modal.present();
  } 

  async tnc(){
    const modal = await this.modalController.create({
      component: TncComponent,
      componentProps: {
        data: {}
      }
    });

    modal.onDidDismiss().then(data => {
      this.modalData = data.data;
      if(this.modalData.cancelled) {
        //do not refresh the page
      } else {
        //
      }
    });

    return await modal.present();
  } 

  async pp(){
    const modal = await this.modalController.create({
      component: PpComponent,
      componentProps: {
        data: {}
      }
    });

    modal.onDidDismiss().then(data => {
      this.modalData = data.data;
      if(this.modalData.cancelled) {
        //do not refresh the page
      } else {
        //
      }
    });

    return await modal.present();
  } 

	ngOnInit() {}

	ngOnDestroy() {
    super.ngOnDestroy();
  }

}
