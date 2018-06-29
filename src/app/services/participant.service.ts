import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {IParticipant} from '../models/participant.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) {
  }

  getParticipants(tourId: string): Observable<IParticipant[]> {

    return this.http.get<IParticipant[]>(`${environment.apiBaseUrl}/participants/` + tourId);
  }

  postParticipant(body: IParticipant): Observable<IParticipant> {
    return this.http.post<IParticipant>(`${environment.apiBaseUrl}/participants`, body)
      .map(res => <IParticipant>res);
  }
}
