import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as team from './team.actions';

import {TeamService} from '../../services/teams.service';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions,
              private teamService: TeamService) {
  }

  @Effect()
  fetchRider$ = this.actions$
    .ofType<team.FetchTeams>(team.FETCH_TEAMS)
    .pipe(switchMap(action => {
      return this.teamService.getTeams()
        .pipe(switchMap(teamResponse =>
            of(new team.FetchTeamsSuccess(teamResponse))
          ),
          catchError(err => of(new team.FetchTeamsFailure(err))));
    }));
}
