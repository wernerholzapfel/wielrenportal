import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AddTeamsRequest, ITour} from '../models/tour.model';
import {map} from 'rxjs/operators';

@Injectable()
export class TourService {

  constructor(private http: HttpClient) {
  }

  getTour(): Observable<ITour> {
    return this.http.get<ITour>(`${environment.apiBaseUrl}/tourriders`);
  }

  updateStand(tourId): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/participants/table/${tourId}`);
  }

  getEtappeStand(tourId: string, etappeId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/participants/table/${tourId}/etappe/${etappeId}`);
  }

  getTourById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`${environment.apiBaseUrl}/tours/${id}`);
  }

  getTourlist(): Observable<ITour[]> {
    return this.http.get<ITour[]>(`${environment.apiBaseUrl}/tours`);
  }

  addTeams(body: AddTeamsRequest): Observable<ITour> {
    return this.http.post<ITour>(`${environment.apiBaseUrl}/tours/setteams`, body)
      .pipe(map(res => <ITour>res));
  }

  addRidertoTeam(body: any): Observable<ITour> {
    return this.http.post<any>(`${environment.apiBaseUrl}/tourriders`, body)
      .pipe(map(res => <any>res));
  }


}
