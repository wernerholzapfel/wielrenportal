import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IRider} from '../../models/rider.model';
import {ITeam} from '../../models/team.model';

export const FETCH_TEAMS = '[TEAMS] Fetch Teams';
export const FETCH_TEAMS_SUCCESS = '[TEAMS] Fetch Teams Success';
export const FETCH_TEAMS_FAILURE = '[TEAMS] Fetch Teams Failure';

export class FetchTeams implements  Action {
  readonly type = FETCH_TEAMS;

  constructor() {}
}

export class FetchTeamsSuccess implements Action {
  readonly type = FETCH_TEAMS_SUCCESS;

  constructor(public payload: ITeam[]) {}
}

export class FetchTeamsFailure implements Action {
  readonly type = FETCH_TEAMS_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}
