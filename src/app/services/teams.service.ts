import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ITeam} from '../models/team.model';
import {map} from 'rxjs/operators';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${environment.apiBaseUrl}/teams`)
      .pipe(map(response => {
        return response.sort((a, b) => {
          if (a.teamName > b.teamName) {
            return 1;
          }
          if (a.teamName < b.teamName) {
            return -1;
          }
          return 0;
        });
      }));
  }
}
