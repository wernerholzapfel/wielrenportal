import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {IParticipant} from '../models/participant.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) {
  }

  getParticipants(): Observable<IParticipant[]> {

    return this.http.get<IParticipant[]>(`${environment.apiBaseUrl}/participants`);
  }

}
