import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AddTeamsRequest, ITour} from '../models/tour.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class TourService {

  constructor(private http: HttpClient) {
  }

  getTour(): Observable<ITour> {
    return this.http.get<ITour>(`${environment.apiBaseUrl}/tourriders`);
  }

  getTourById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`${environment.apiBaseUrl}/tours/${id}`);
  }

  getTourlist(): Observable<ITour[]> {
    return this.http.get<ITour[]>(`${environment.apiBaseUrl}/tours`);
  }

  addTeams(body: AddTeamsRequest): Observable<ITour> {
    return this.http.post<ITour>(`${environment.apiBaseUrl}/tours/setteams`, body)
      .map(res => <ITour>res);
  }

}
