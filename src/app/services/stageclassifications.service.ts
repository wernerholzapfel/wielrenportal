import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IEtappe, IStageClassification} from '../models/etappe.model';
import {environment} from '../../environments/environment';

@Injectable()
export class StageclassificationsService {

  constructor(private http: HttpClient) { }

  saveStageclassifications(body: IStageClassification[]): Observable<any> {
    return this.http.post<IStageClassification[]>(`${environment.apiBaseUrl}/stageclassifications`, body)
      .map(res => <IStageClassification[]>res);
  }

  getStageClassifications(etappeId: string): Observable<IStageClassification[]> {
    return this.http.get<IStageClassification[]>(`${environment.apiBaseUrl}/stageclassifications/${etappeId}`);
  }
}
