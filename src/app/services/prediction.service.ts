import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {IPartipantRidersFormModel} from '../models/partipantRidersForm.model';
import {IRider} from '../models/rider.model';
import {IEtappe} from '../models/etappe.model';
import {IPrediction} from '../models/participant.model';

@Injectable()
export class PredictionService {

  constructor(private http: HttpClient) { }
  submitPrediction(body: IPartipantRidersFormModel): Observable<IRider[]> {
    return this.http.post<IRider[]>(`${environment.apiBaseUrl}/predictions`, body)
      .map(res => <IRider[]>res);
  }

  getPredictionsForUser(tourId: string): Observable<IPrediction[]> {
    return this.http.get<IPrediction[]>(`${environment.apiBaseUrl}/predictions/user/` + tourId);
  }
}
