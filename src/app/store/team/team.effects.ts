import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as team from './team.actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {TeamService} from '../../services/teams.service';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions,
              private teamService: TeamService) {
  }

  @Effect()
  fetchRider$ = this.actions$
    .ofType<team.FetchTeams>(team.FETCH_TEAMS)
    .switchMap(action => {
      return this.teamService.getTeams()
        .switchMap(teamResponse =>
          Observable.of(new team.FetchTeamsSuccess(teamResponse))
        )
        .catch(err => Observable.of(new team.FetchTeamsFailure(err)));
    });
}
