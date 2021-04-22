import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataCommunicationModel } from '../model/data-communication.model';

@Injectable({
  providedIn: 'root'
})
export class DataCommunicationService {
    dataCommunicationModel = new DataCommunicationModel();
    private subject = new BehaviorSubject<any>(this.dataCommunicationModel);

    sendMessage(message: string) {
        this.dataCommunicationModel.message = message;
        this.subject.next(this.dataCommunicationModel);
    }

    clearMessage() {
        
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
