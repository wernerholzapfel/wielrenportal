import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ITeam} from '../models/team.model';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${environment.apiBaseUrl}/teams`);
  }
}
