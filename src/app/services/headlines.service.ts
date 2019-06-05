import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IRider} from '../models/rider.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IHeadline} from '../models/headline.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeadlinesService {

  constructor(private http: HttpClient) { }


  getHeadlines(tourId: string): Observable<IHeadline[]> {

    return this.http.get<IHeadline[]>(`${environment.apiBaseUrl}/headlines/${tourId}`);
  }

  saveHeadline(body: IHeadline): Observable<IHeadline> {
    return this.http.post<IHeadline>(`${environment.apiBaseUrl}/headlines`, body)
      .pipe(map(res => <IHeadline>res));
  }
}
