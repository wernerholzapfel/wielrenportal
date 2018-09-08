import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IStageClassification, ITourClassification} from '../models/etappe.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class ClassificationsService {

  constructor(private http: HttpClient) {
  }

  saveStageclassifications(body: IStageClassification[]): Observable<any> {
    return this.http.post<IStageClassification[]>(`${environment.apiBaseUrl}/stageclassifications`, body)
      .pipe(map(res => <IStageClassification[]>res));
  }

  getStageClassifications(etappeId: string): Observable<IStageClassification[]> {
    return this.http.get<IStageClassification[]>(`${environment.apiBaseUrl}/stageclassifications/${etappeId}`);
  }

  saveTourclassifications(body: ITourClassification[]): Observable<any> {
    return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/tourclassifications`, body)
      .pipe(map(res => <ITourClassification[]>res));
  }

  getTourClassifications(tourId: string): Observable<ITourClassification[]> {
    return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/tourclassifications/${tourId}`);
  }

  saveYouthclassifications(body: ITourClassification[]): Observable<any> {
    return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/youthclassifications`, body)
      .pipe(map(res => <ITourClassification[]>res));
  }

  getYouthClassifications(tourId: string): Observable<ITourClassification[]> {
    return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/youthclassifications/${tourId}`);
  }

  saveMountainclassifications(body: ITourClassification[]): Observable<any> {
    return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/mountainclassifications`, body)
      .pipe(map(res => <ITourClassification[]>res));
  }

  getMountainClassifications(tourId: string): Observable<ITourClassification[]> {
    return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/mountainclassifications/${tourId}`);
  }

  savePointsclassifications(body: ITourClassification[]): Observable<any> {
    return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/pointsclassifications`, body)
      .pipe(map(res => <ITourClassification[]>res));
  }

  getPointsClassifications(tourId: string): Observable<ITourClassification[]> {
    return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/pointsclassifications/${tourId}`);
  }
}
