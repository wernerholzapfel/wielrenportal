import {createFeatureSelector, createSelector, State} from '@ngrx/store';
import * as cyclist from './cyclist.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {ICyclist} from '../../models/cyclist.model';

export interface CyclistState {
  cyclists: ICyclist[];
  inProgress: Boolean;
  error: HttpErrorResponse;
}

const initalCyclistState: CyclistState = {
  cyclists: undefined,
  error: undefined,
  inProgress: false,
};

export function cyclistReducer(state = initalCyclistState, action): CyclistState {
  switch (action.type) {
    case cyclist.FETCH_CYCLISTS:
      return {
        ...state,
        inProgress: true,
      };
    case cyclist.FETCH_CYCLISTS_SUCCESS:
      return {
        ...state,
        cyclists: action.payload,
        inProgress: false,
        error: undefined
      };
    case cyclist.FETCH_CYCLISTS_FAILURE:
      return {
        ...state,
        cyclists: undefined,
        inProgress: false,
        error: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}

export const getCyclistState = createFeatureSelector<CyclistState>('cyclists');
export const getCyclists = createSelector(getCyclistState, (state: CyclistState) => state.cyclists);
