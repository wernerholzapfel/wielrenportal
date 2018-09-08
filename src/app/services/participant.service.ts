import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IParticipant} from '../models/participant.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) {
  }

  getParticipant(): Observable<IParticipant> {
    return this.http.get<IParticipant>(`${environment.apiBaseUrl}/participants/loggedIn`);
  }

  getParticipants(tourId: string): Observable<IParticipant[]> {

    return this.http.get<IParticipant[]>(`${environment.apiBaseUrl}/participants/` + tourId);
  }

  postParticipant(body: IParticipant): Observable<IParticipant> {
    return this.http.post<IParticipant>(`${environment.apiBaseUrl}/participants`, body)
      .pipe(map(res => <IParticipant>res));
  }
}
