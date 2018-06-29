import {createFeatureSelector, createSelector, State} from '@ngrx/store';
import * as team from './team.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {ITeam} from '../../models/team.model';

export interface TeamState {
  teams: ITeam[];
  inProgress: boolean;
  error: HttpErrorResponse;
}

const initalTeamState: TeamState = {
  teams: [],
  error: undefined,
  inProgress: false,
};

export function teamReducer(state = initalTeamState, action): TeamState {
  switch (action.type) {
    case team.FETCH_TEAMS:
      return {
        ...state,
        inProgress: true,
      };
    case team.FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
        inProgress: false,
        error: undefined
      };
    case team.FETCH_TEAMS_FAILURE:
      return {
        ...state,
        teams: undefined,
        inProgress: false,
        error: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}

export const getTeamState = createFeatureSelector<TeamState>('team');
export const getTeams = createSelector(getTeamState, (state: TeamState) => state.teams);
